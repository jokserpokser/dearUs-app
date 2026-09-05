export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 128;
export const MAX_NAME_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 254;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const normalizeName = (name: string) => name.trim().replace(/\s+/g, " ");

export const isValidEmail = (email: string) =>
  email.length <= MAX_EMAIL_LENGTH && emailPattern.test(email);
