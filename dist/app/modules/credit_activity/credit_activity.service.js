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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditActivityService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const credit_activity_model_1 = __importDefault(require("./credit_activity.model"));
const getActivitiesByUserId = (query, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const filteredQuery = Object.assign({ referred_by: new mongoose_1.Types.ObjectId(userId) }, query);
    const creditActivityQuery = new QueryBuilder_1.default(credit_activity_model_1.default.find().populate([
        {
            path: 'referred_by',
            select: 'name email referral_code',
        },
        {
            path: 'reffer_to',
            select: 'name email referral_code',
        },
        {
            path: 'order_id',
            select: 'user_id course_id price createdAt',
            populate: {
                path: 'course_id',
                select: 'name title description',
            },
        },
    ]), filteredQuery)
        .search([])
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield creditActivityQuery.countTotal();
    const data = yield creditActivityQuery.modelQuery;
    return {
        data,
        meta,
    };
});
exports.CreditActivityService = {
    getActivitiesByUserId,
};
