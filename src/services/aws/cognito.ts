import { Auth } from 'aws-amplify';

export type AuthParams = {
  email: string;
  phone_number?: string;
  password: string;
};

export async function signUp({ password, email }: AuthParams) {
  return Auth.signUp({
    username: email,
    password,
    attributes: {
      email,
      // phone_number, // TODO: Add phone number
    },
  });
}

export async function signIn({ email, password }: AuthParams) {
  return Auth.signIn({
    username: email,
    password,
  });
}

export async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error('Unable to sign out.');
  }
}
