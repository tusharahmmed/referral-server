"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.OrderService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importStar(require("mongoose"));
const referral_1 = require("../../../enums/referral");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const course_model_1 = __importDefault(require("../course/course.model"));
const credit_activity_model_1 = __importDefault(require("../credit_activity/credit_activity.model"));
const referral_model_1 = __importDefault(require("../referral/referral.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const createOrder = (payload, requestedUser) => __awaiter(void 0, void 0, void 0, function* () {
    // check same user
    if ((payload === null || payload === void 0 ? void 0 : payload.user_id) !== (requestedUser === null || requestedUser === void 0 ? void 0 : requestedUser.id)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Forbidden');
    }
    return yield mongoose_1.default.connection.transaction((session) => __awaiter(void 0, void 0, void 0, function* () {
        // get user
        const userDetails = yield user_model_1.default.findById(new mongoose_1.Types.ObjectId(payload.user_id)).session(session);
        if (!userDetails) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
        }
        // get course
        const courseDetails = yield course_model_1.default.findById(new mongoose_1.Types.ObjectId(payload.course_id)).session(session);
        if (!courseDetails) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Course does not exist');
        }
        // check first order
        const isFirstOrder = yield order_model_1.default.isFirstOrder(payload.user_id, session);
        // create order
        const createdOrder = yield order_model_1.default.create([
            {
                course_id: new mongoose_1.Types.ObjectId(payload.course_id),
                user_id: new mongoose_1.Types.ObjectId(payload.user_id),
                price: courseDetails === null || courseDetails === void 0 ? void 0 : courseDetails.price,
            },
        ], { session });
        const order = createdOrder[0];
        // if first order and has referral
        if (isFirstOrder && (userDetails === null || userDetails === void 0 ? void 0 : userDetails.referred_by)) {
            // change referral status
            const updatedReferral = yield referral_model_1.default.findOneAndUpdate({
                reffer_to: userDetails === null || userDetails === void 0 ? void 0 : userDetails._id,
            }, {
                status: referral_1.REFERRAL_STATUS.converted,
            }, {
                new: true,
                session,
            });
            // insert data into credit activity
            yield credit_activity_model_1.default.create([
                {
                    referred_by: new mongoose_1.Types.ObjectId(userDetails === null || userDetails === void 0 ? void 0 : userDetails.referred_by),
                    reffer_to: new mongoose_1.Types.ObjectId(userDetails === null || userDetails === void 0 ? void 0 : userDetails._id),
                    credit: updatedReferral === null || updatedReferral === void 0 ? void 0 : updatedReferral.credit,
                    order_id: new mongoose_1.Types.ObjectId(order === null || order === void 0 ? void 0 : order._id),
                },
            ], { session });
        }
        const result = yield order_model_1.default.findById(order._id)
            .populate('course_id')
            .populate('user_id')
            .session(session);
        return result;
    }));
});
exports.OrderService = {
    createOrder,
};
