// pages/api/contact.js
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    // Use the emailUser and emailPass to send an email
    // For example, using nodemailer
    const nodemailer = require("nodemailer");

    let transporter = nodemailer.createTransport({
      service: "gmail", // Change this to your email service
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    let mailOptions = {
      from: emailUser,
      to: "recipient@example.com",
      subject: `Message from ${name}`,
      text: message,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Message sent successfully" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Failed to send message", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
