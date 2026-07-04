export const generateInviteCode = (length: number = 6): string => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // no O, 0, I, 1 — avoids confusion
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
};
