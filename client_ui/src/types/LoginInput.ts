import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation signIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      token, userId, expiredAt, user {
        role, email, username
      }
    }
  }`;

export interface LoginInput {
  email: string;
  password: string;
}