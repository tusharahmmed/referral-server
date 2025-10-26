"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const orderSchma = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    course_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    price: {
        type: mongoose_1.Types.Decimal128,
        default: mongoose_1.Types.Decimal128.fromString('0.00'),
        required: true,
        get: (value) => parseFloat(value.toString()),
    },
}, {
    timestamps: true,
    toJSON: { getters: true },
});
orderSchma.pre('save', function (next) {
    const order = this;
    if (order.isModified('price') && typeof order.price === 'number') {
        order.price = mongoose_1.Types.Decimal128.fromString(order.price.toFixed(2));
    }
    next();
});
orderSchma.statics.isFirstOrder = function (user_id, session) {
    return __awaiter(this, void 0, void 0, function* () {
        const orderExist = yield Order.exists({
            user_id: new mongoose_1.Types.ObjectId(user_id),
        }).session(session || null);
        return !orderExist;
    });
};
const Order = (0, mongoose_1.model)('Order', orderSchma);
exports.default = Order;
