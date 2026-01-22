const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP
// For production, you should use environment variables for credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "your-email@gmail.com",
    pass: process.env.EMAIL_PASS || "your-app-password",
  },
});

// Send recovery email confirmation
const sendRecoveryEmailConfirmation = async (recipientEmail, username) => {
  const mailOptions = {
    from: `"CryptoScope" <${process.env.EMAIL_USER || "noreply@cryptoscope.com"}>`,
    to: recipientEmail,
    subject: "Recovery Email Confirmed - CryptoScope",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #1a1a2e;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); border-radius: 16px; padding: 40px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);">

            <!-- Header -->
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #60a5fa; font-size: 28px; margin: 0; font-weight: 700;">CryptoScope</h1>
              <p style="color: #94a3b8; font-size: 14px; margin-top: 5px;">Secure. Track. Trade.</p>
            </div>

            <!-- Main Content -->
            <div style="background-color: rgba(71, 85, 105, 0.3); border-radius: 12px; padding: 30px; margin-bottom: 25px;">
              <h2 style="color: #f1f5f9; font-size: 20px; margin: 0 0 15px 0;">Recovery Email Confirmed</h2>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 0;">
                Hello <strong style="color: #60a5fa;">${username}</strong>,
              </p>
              <p style="color: #cbd5e1; font-size: 15px; line-height: 1.6; margin: 15px 0 0 0;">
                This email address has been successfully set as the recovery email for your CryptoScope account.
              </p>
            </div>

            <!-- Info Box -->
            <div style="background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <p style="color: #93c5fd; font-size: 14px; margin: 0; line-height: 1.5;">
                <strong>What does this mean?</strong><br>
                If you ever forget your password or get locked out of your account, we'll use this email to help you regain access to your CryptoScope account.
              </p>
            </div>

            <!-- Warning -->
            <div style="background-color: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 8px; padding: 20px; margin-bottom: 25px;">
              <p style="color: #fca5a5; font-size: 14px; margin: 0; line-height: 1.5;">
                <strong>Didn't make this change?</strong><br>
                If you didn't set this recovery email, please secure your account immediately by changing your password and contacting our support team.
              </p>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid rgba(148, 163, 184, 0.2);">
              <p style="color: #64748b; font-size: 12px; margin: 0;">
                This is an automated message from CryptoScope. Please do not reply to this email.
              </p>
              <p style="color: #64748b; font-size: 12px; margin: 10px 0 0 0;">
                &copy; ${new Date().getFullYear()} CryptoScope. All rights reserved.
              </p>
            </div>

          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Recovery Email Confirmed - CryptoScope

      Hello ${username},

      This email address has been successfully set as the recovery email for your CryptoScope account.

      What does this mean?
      If you ever forget your password or get locked out of your account, we'll use this email to help you regain access to your CryptoScope account.

      Didn't make this change?
      If you didn't set this recovery email, please secure your account immediately by changing your password and contacting our support team.

      This is an automated message from CryptoScope. Please do not reply to this email.

      © ${new Date().getFullYear()} CryptoScope. All rights reserved.
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Recovery email confirmation sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending recovery email confirmation:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendRecoveryEmailConfirmation,
};
