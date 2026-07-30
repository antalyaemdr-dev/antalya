import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { type, data } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'antalyaemdr@gmail.com',
        pass: 'zpeu qizs lhli zure'
      }
    });

    let subject = '';
    let htmlContent = '';

    if (type === 'appointment') {
      subject = `📅 Yeni Randevu Talebi: ${data.full_name}`;
      htmlContent = `
        <div style="font-family: sans-serif; padding: 20px; color: #031321;">
          <h2 style="color: #006699;">Yeni Bir Randevu Talebi Geldi!</h2>
          <p><strong>Danışan:</strong> ${data.full_name}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <p><strong>E-Posta:</strong> ${data.email || 'Belirtilmedi'}</p>
          <p><strong>İlgilendiği Hizmet:</strong> ${data.service_type || 'Belirtilmedi'}</p>
          <p><strong>Tercih Ettiği Tarih:</strong> ${data.preferred_date || 'Belirtilmedi'}</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #e6c15c; margin-top: 20px;">
            <p><strong>Mesaj/Not:</strong><br/> ${data.message || 'Mesaj bırakılmadı.'}</p>
          </div>
        </div>
      `;
    } else if (type === 'contact') {
      subject = `✉️ Yeni İletişim Mesajı: ${data.name}`;
      htmlContent = `
        <div style="font-family: sans-serif; padding: 20px; color: #031321;">
          <h2 style="color: #006699;">Web Sitesinden Yeni Mesaj!</h2>
          <p><strong>Gönderen:</strong> ${data.name}</p>
          <p><strong>E-Posta:</strong> ${data.email}</p>
          <p><strong>Konu:</strong> ${data.subject}</p>
          <div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #e6c15c; margin-top: 20px;">
            <p><strong>Mesaj:</strong><br/> ${data.message}</p>
          </div>
        </div>
      `;
    }

    await transporter.sendMail({
      from: '"Antalya EMDR Web" <antalyaemdr@gmail.com>',
      to: 'antalyaemdr@gmail.com',
      subject: subject,
      html: htmlContent
    });

    return NextResponse.json({ success: true, message: 'Mail başarıyla gönderildi.' });
  } catch (error: any) {
    console.error('Mail Gönderme Hatası:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}