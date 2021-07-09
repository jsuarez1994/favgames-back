import { OAuth2Client } from 'google-auth-library';

export async function googleVerify ( idToken:string = '' )  {
  const client = new OAuth2Client( process.env.GOOGLE_CLIENT_ID );

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  });

  const name  = ticket.getPayload()?.name     || '';
  const image = ticket.getPayload()?.picture  || '';
  const email = ticket.getPayload()?.email    || '';

  return { name, image, email };
}