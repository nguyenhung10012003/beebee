import * as bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  const saltOfRound = 10;
  return await bcrypt.hash(password, saltOfRound);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};