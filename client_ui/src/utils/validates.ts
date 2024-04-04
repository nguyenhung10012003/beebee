export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const checkConfirmPassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
};

export const validatePassword = (password: string) => {
  const reg = /^[a-zA-Z0-9_]{6,24}$/;
  return reg.test(password);
};