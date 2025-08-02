import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMailer = async (name, total, cart, email) => {
  try {
    console.log("Sending email to", email);
    const transponder = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // e.g. yourname@gmail.com
        pass: process.env.EMAIL_PASS, // App password if Gmail (not your main password!)
      },
    });
    const itemCart = cart
      .map(
        (item) =>
          `<li>${item.productId.name} -  ₹${item.price} x ₹${item.quantity}</li>`
      )
      .join("");

    const mailOption = {
      from: `"Skatchel - " <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Order Confirmation",
      html: `
       <h2>Hi ${name}, your order was successful!</h2>
        <p>Here are the details of your order:</p>
        <ul>${itemCart}</ul>
        <h3>Total: ₹${total}</h3>
        <p>Thank you for shopping with us!</p>
      `,
    };

    await transponder.sendMail(mailOption);
    console.log("✅ Email sent successfully!");
  } catch (err) {
    console.log(err.message);
    console.error("❌ Failed to send email:", err);
    throw err;
  }
};
//emzk umtx ywcj ylps
