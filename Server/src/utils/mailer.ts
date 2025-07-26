import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
console.log("✅ EMAIL_USER:", process.env.EMAIL_USER);
console.log("✅ EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: true, // ensures certificate is verified
  },
});

export const sendOrderConfirmationEmail = async (to: string, orderId: string) => {
  const mailOptions = {
    from: `"Quality Woods" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your Order Has Been Received!',
    html: `
      <h2>Thank you for your order!</h2>
      <p>Your order ID is <strong>${orderId}</strong>.</p>
      <p>We’ll notify you as it moves through production.</p>
      <br/>
      <p>– The Quality Woods Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent');
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
  }
};
