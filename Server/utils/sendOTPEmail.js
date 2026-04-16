const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS   // Gmail App Password (not your real password)
  }
});

const sendOTPEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"Admin App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 400px; margin: auto; padding: 32px; border-radius: 12px; background: #f8fafc; border: 1px solid #e2e8f0;">
        <h2 style="color: #4f46e5; margin-bottom: 8px;">Verify Your Login</h2>
        <p style="color: #475569; margin-bottom: 24px;">Use the OTP below to complete your sign-in. It expires in <strong>5 minutes</strong>.</p>
        <div style="font-size: 36px; font-weight: 800; letter-spacing: 10px; color: #0f172a; text-align: center; padding: 20px; background: #fff; border-radius: 8px; border: 1px solid #e2e8f0;">
          ${otp}
        </div>
        <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">If you did not request this, please ignore this email.</p>
      </div>
    `
  });
};

module.exports = sendOTPEmail;
