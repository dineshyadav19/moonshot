import nodemailer from "nodemailer";

export async function sendLoginEmail({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.E_MAIL,
      pass: process.env.E_MAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: '"Dinesh" <ydino2108@gmail.com>',
    to: email,
    subject: "Moonshot OTP to verify your email",
    html: `Here is your OTP ${otp} to verify your email, head back to the website and enter this OTP`,
  });
}
