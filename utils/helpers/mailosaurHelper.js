// utils/helpers/mailosaurHelper.js
import MailosaurClient from 'mailosaur';
import 'dotenv/config';

const { MAILOSAUR_API_KEY, MAILOSAUR_SERVER_ID, MAILOSAUR_DOMAIN } = process.env;

if (!MAILOSAUR_SERVER_ID) throw new Error('MAILOSAUR_SERVER_ID is not set!');

const client = new MailosaurClient(MAILOSAUR_API_KEY);

export const getOtp = async (localPart) => {
  const emailAddress = `${localPart}@${MAILOSAUR_DOMAIN}`;

  const email = await client.messages.get(
    MAILOSAUR_SERVER_ID,
    { sentTo: emailAddress },
    { timeout: 30000 } // wait up to 30s
  );

  let body = '';

  if (email.text && email.text.body) {
    body += email.text.body;
  } else {
    console.warn('⚠️ No plain text body found');
  }

  if (email.html && email.html.body) {
    body += `\n${email.html.body}`;
  } else {
    console.warn('⚠️ No HTML body found');
  }

  // console.log('📧 EMAIL BODY:\n', body);

  if (!body) {
    throw new Error('Email body is empty, cannot extract OTP');
  }

  const otpMatch = body.match(/\b\d{6}\b/);

  if (otpMatch) {
    return otpMatch[0];
  } else {
    throw new Error('OTP not found in email');
  }
};
