"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const referral_1 = require("../../../enums/referral");
const referralSchema = new mongoose_1.Schema({
    referred_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reffer_to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true,
    },
    status: {
        type: String,
        required: true,
        enum: Object.values(referral_1.REFERRAL_STATUS),
        default: referral_1.REFERRAL_STATUS.pending,
        index: true,
    },
    credit: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const Referral = (0, mongoose_1.model)('Referral', referralSchema);
exports.default = Referral;
