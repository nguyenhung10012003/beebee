import { gql } from '@apollo/client';

export const SIGN_UP = gql`
  mutation signUp($createUserInput: CreateUserInput!) {
    signUp(createUserInput: $createUserInput) {
      id, email
    }
  }`;

export interface CreateUserInput {
  email: string;
  password: string;
  username: string;
}