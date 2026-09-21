import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

async function testEmail() {
  try {
    console.log('Testing SMTP connection...');
    const result = await transporter.verify();
    console.log('✅ SMTP Connection successful:', result);

    // Send test email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.CONSULTATION_RECEIVER,
      subject: 'Test Email from MRG Website',
      text: 'This is a test email to verify SMTP is working correctly.',
      html: '<p>This is a test email to verify SMTP is working correctly.</p>',
    });

    console.log('✅ Test email sent successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ SMTP Error:', err.message);
    process.exit(1);
  }
}

testEmail();