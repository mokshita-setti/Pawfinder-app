import { NextRequest, NextResponse } from 'next/server';
import { createBrowserClient } from '@supabase/ssr';
import { Resend } from 'resend';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  const { petId, finderName, finderPhone, location, message, ownerEmail, petName } =
    await req.json();

  if (!petId || !finderName) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { error: dbError } = await supabase.from('reports').insert({
    pet_id: petId,
    finder_name: finderName,
    finder_phone: finderPhone || null,
    location: location || null,
    message: message || null,
  });

  if (dbError) {
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (process.env.RESEND_API_KEY && ownerEmail) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'PawFinder <noreply@pawfinder-app.vercel.app>',
      to: ownerEmail,
      subject: `🐾 Someone found ${petName}!`,
      html: `
        <div style="font-family:Inter,sans-serif;max-width:480px;margin:0 auto;padding:32px 24px;background:#F8FAFC;border-radius:16px;">
          <div style="text-align:center;margin-bottom:24px;">
            <span style="font-size:24px;font-weight:900;color:#8B5CF6;">🐾 PawFinder</span>
          </div>
          <div style="background:#fff;border-radius:16px;padding:28px;box-shadow:0 4px 20px rgba(0,0,0,.07);">
            <h1 style="font-size:22px;font-weight:800;color:#1E293B;margin-bottom:8px;">Someone found ${petName}!</h1>
            <p style="color:#64748B;font-size:15px;margin-bottom:24px;">A finder scanned ${petName}'s QR tag and submitted a report.</p>
            <div style="border-top:1px solid #F1F5F9;padding-top:16px;">
              <p style="margin:8px 0;font-size:14px;"><strong>Finder:</strong> ${finderName}</p>
              ${finderPhone ? `<p style="margin:8px 0;font-size:14px;"><strong>Phone:</strong> ${finderPhone}</p>` : ''}
              ${location ? `<p style="margin:8px 0;font-size:14px;"><strong>Location:</strong> ${location}</p>` : ''}
              ${message ? `<p style="margin:8px 0;font-size:14px;"><strong>Message:</strong> ${message}</p>` : ''}
            </div>
          </div>
          <p style="text-align:center;font-size:12px;color:#94A3B8;margin-top:20px;">Powered by PawFinder · Keeping pets safe</p>
        </div>
      `,
    });
  }

  return NextResponse.json({ ok: true });
}
