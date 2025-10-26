"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReferralCode = void 0;
const generateReferralCode = (name) => {
    const prefix = name.trim().toLowerCase().replace(/\s+/g, '');
    const randomPart = Math.random().toString(36).substring(2, 8);
    return `${prefix}-${randomPart}`;
};
exports.generateReferralCode = generateReferralCode;
