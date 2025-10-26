"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const creditActivitySchema = new mongoose_1.Schema({
    referred_by: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    reffer_to: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
        index: true,
    },
    credit: {
        type: Number,
        required: true,
    },
    order_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
}, {
    timestamps: true,
});
const CreditActivity = (0, mongoose_1.model)('CreditActivity', creditActivitySchema);
exports.default = CreditActivity;
