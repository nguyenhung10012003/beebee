export const validateEmail = (email: string) => {
  const reg = /\S+@\S+\.\S+/;
  return reg.test(email);
};

export const validateUsername = (username: string) => {
  return true;
};

export const validatePassword = (password: string) => {
  const reg = /^[a-zA-Z0-9_]{6,24}$/;
  return reg.test(password);
};