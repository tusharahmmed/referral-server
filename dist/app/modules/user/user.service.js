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
exports.UserService = void 0;
const mongoose_1 = require("mongoose");
const referral_model_1 = __importDefault(require("../referral/referral.model"));
const user_model_1 = __importDefault(require("./user.model"));
const getPorfileStats = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield referral_model_1.default.aggregate([
        {
            $match: {
                $or: [
                    { referred_by: new mongoose_1.Types.ObjectId(userId) },
                    {
                        reffer_to: new mongoose_1.Types.ObjectId(userId),
                        status: 'converted',
                    },
                ],
            },
        },
        {
            $group: {
                _id: null,
                totalReferred: {
                    $sum: {
                        $cond: [
                            { $eq: ['$referred_by', new mongoose_1.Types.ObjectId(userId)] },
                            1,
                            0,
                        ],
                    },
                },
                convertedUsers: {
                    $sum: {
                        $cond: [
                            {
                                $and: [
                                    { $eq: ['$referred_by', new mongoose_1.Types.ObjectId(userId)] },
                                    { $eq: ['$status', 'converted'] },
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
                totalCreditsEarned: {
                    $sum: '$credit',
                },
            },
        },
    ]);
    // return
    if ((result === null || result === void 0 ? void 0 : result.length) > 0) {
        return result === null || result === void 0 ? void 0 : result[0];
    }
    else {
        return { totalReferred: 0, convertedUsers: 0, totalCreditsEarned: 0 };
    }
});
const getProfileDetais = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findOne({ _id: new mongoose_1.Types.ObjectId(userId) });
    return result;
});
exports.UserService = {
    getPorfileStats,
    getProfileDetais,
};
