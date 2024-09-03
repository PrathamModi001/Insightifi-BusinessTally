import nodemailer from 'nodemailer';
import { userRoles } from './helper.js';
import { WelcomeMessage } from './Emails/WelcomMessage.js';
import { emailOtp } from './Emails/emailOtp.js';
import { fileURLToPath } from 'url';
import path from 'path';
import { InviteEmail } from './Emails/InviteEmail.js';
import { VerifyEmail } from './Emails/VerifyEmail.js';
import { forgotPasswordEmail } from './Emails/forgotpassword.js';
import { ApproveUser } from './Emails/ApproveUser.js';
import { UserApproved } from './Emails/UserApproved.js';
import { OrganizationAdminNotify } from './Emails/OrganizationAdminNotify.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagePath = path.join(__dirname, 'insightifi.png');
const pdfPath = path.join(__dirname, 'whitepaper.pdf');
const demoPdfPath = path.join(__dirname, 'requestdemo.pdf');
const transporter = nodemailer.createTransport({
  sendMail: true,
  host: process.env.SMTP_HOST,
  secure: true,
  port: process.env.SMTP_PORT,
  auth: {
    user: `${process.env.SMTP_MAIL}`,
    pass: `${process.env.SMTP_PASSWORD}`,
  },
});

const sendMail = async (mailObject) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: mailObject.to,
    subject: mailObject.subject,
    text: mailObject.text,
    html: mailObject.html,
  };

  try {
    await transporter.sendMail(mailOptions, (err, res) => res);
  } catch (err) {
    console.log('Error ::', err?.message);
    return err;
  }
};

export const wrapedAsyncSendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);

    console.log(`Email sent: ${info.response}`);
    return info;
  } catch (error) {
    console.log(`Error: ${error.message}`);
    throw error;
  }
};

export const emailOTP = async (firstname, email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Your Verification OTP to Business-Tally',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],

    text: 'This is a test message, Thanks for Registering on Business-Tally.',
    html: emailOtp(firstname, email, otp),
  };
  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const mailUserForgotPasswordOTP = async (email, otp) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Your Forgot Password Request Verification OTP to Business-Tally ',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],
    text: 'This is a test message,Please enter the given otp to reset your user password.',
    html: forgotPasswordEmail(email, otp),
  };

  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const mailSuccessfullyRegisterUser = (userDetails) => {
  const mailObject = {
    email: userDetails.email,
    subject: `Welcome ${userDetails.firstname}  ${userDetails.lastname} to Business-Tally`,
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],
    text: 'Thanks for Registering on Business-Tally.',
    html: WelcomeMessage(userDetails),
  };

  sendMail(mailObject);
};

export const inviteMail = async (inviteDetails) => {
  let YOUR_INVITATION_LINK;
  if (inviteDetails.userType === userRoles.companyAdmin) {
    YOUR_INVITATION_LINK =
      process.env.INVITATION_LINK +
      '/company-invite?' +
      inviteDetails?.inviteToken;
  } else if (
    inviteDetails.userType === userRoles.organizationEmployee ||
    inviteDetails.userType === userRoles.companyEmployee
  ) {
    YOUR_INVITATION_LINK =
      process.env.INVITATION_LINK +
      '/employee-invite?' +
      inviteDetails?.inviteToken;
  }
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: inviteDetails.email,
    subject: `Invitation to Business Tally`,
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],

    html: InviteEmail(inviteDetails.firstname, YOUR_INVITATION_LINK),
  };
  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const sendEmailUpdateRequest = async (email, url) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Your Email Update to Business-Tally',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],
    text: 'This is a test message, Thanks for Update Email on Business-Tally.',
    html: VerifyEmail(email, url),
  };

  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const superAdminNotify = async (
  superAdminEmail,
  superAdminName,
  user
) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: superAdminEmail,
    subject: 'Approve new Register user ',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],
    text: 'This is a test message,Please enter the given otp to reset your user password.',
    html: ApproveUser(superAdminName, user),
  };

  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const organizationAdminNotify = async (
  email,
  inviterFirstname,
  firstname,
  inviteeRole
) => {
  // company admin successfully registered
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'A new user has signed in',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee',
      },
    ],
    text: 'The Company Admin has been successfully registered',
    html: OrganizationAdminNotify(inviterFirstname, firstname, inviteeRole),
  };
  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const superAdminContactUsNotify = async (email, contactUsDetails) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Feedback from Business-Tally Contact Us',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],
    text: 'This is a test message,Please enter the given otp to reset your user password.',
    html: `<html><h1>Feedback from Business-Tally Contact Us</h1><p>${contactUsDetails.message}</p></html>`,
  };
  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const approvedUserNotify = async (email, firstname) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Approved new Register user ',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
    ],
    text: 'This is superAdmin Approved , please login',
    html: UserApproved(email, firstname),
  };

  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const whitePaperSendMail = async (email, firstname) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Welcome to Business-Tally',
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee', //same cid value as in the html img src
      },
      {
        filename: 'whitepaper.pdf', // name of the PDF file
        path: pdfPath, // path to the PDF file
      },
    ],
    text: 'This is a test message,Thanks for Registering on Business-Tally.',
    html: `<html><h1>Welcome to Business-Tally, ${firstname}</h1><p>Thanks for Registering on Business-Tally.</p></html>`,
  };

  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const sendMailToClient = async (email) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Request Demo',
    html: `
      <p>Hello,</p>
      <p>Please find the requested demo attached.</p>
      <img src="cid:unique@kreata.ee" alt="Insightifi Logo">
    `,
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee',
      },
      {
        filename: 'requestdemo.pdf',
        path:  demoPdfPath,
      },
    ],
  };

  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};

export const sendMailToSuperAdmin = async (email) => {
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: 'Request Demo',
    html: `
      <p>Hello,</p>
      <p>Please find the requested demo attached.</p>
      <img src="cid:unique@kreata.ee" alt="Insightifi Logo">
    `,
    attachments: [
      {
        filename: 'insightifi.png',
        path: imagePath,
        cid: 'unique@kreata.ee',
      },
      {
        filename: 'requestdemo.pdf',
        path:  demoPdfPath,
      },
    ],
  };

  const resp = await wrapedAsyncSendMail(mailOptions);
  return resp;
};