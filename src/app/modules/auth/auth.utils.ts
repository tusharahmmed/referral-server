export const generateReferralCode = (name: string): string => {
  const prefix = name.trim().toLowerCase().replace(/\s+/g, '');
  const randomPart = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${randomPart}`;
};
