const nodemailer = require("nodemailer");


function makeTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, 
      pass: process.env.GMAIL_APP_PASSWORD, 
    },
  });
}

async function sendInviteEmail({ to, inviteUrl, eventName , name}) {
  const transporter = makeTransporter();

  await transporter.sendMail({
    from: `"MedLeads" <${process.env.GMAIL_USER}>`,
    to,
    subject: `You're invited to ${eventName}`,
    html: `
    <p>Hi ${name},

      <p> Neat, I think it worked? you have been invited to attend <b>${eventName}</b>.</p>
      <p>
        <a href="${inviteUrl}">Accept invite</a>
      </p>
      <p>This link will expire.</p>
    `,
  });
}

module.exports = { sendInviteEmail };