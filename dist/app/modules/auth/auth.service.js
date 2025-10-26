"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const referral_1 = require("../../../enums/referral");
const user_1 = require("../../../enums/user");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const referral_model_1 = __importDefault(require("../referral/referral.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const auth_utils_1 = require("./auth.utils");
const signup = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // set role
    payload.role = user_1.USER_ROLE.USER;
    // generate referral code
    const code = (0, auth_utils_1.generateReferralCode)(payload.name);
    payload.referral_code = code;
    const { referred_user_code } = payload;
    return yield mongoose_1.default.connection.transaction((session) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (referred_user_code) {
                const refferer_id = yield user_model_1.default.getUserIdByRefferCode(referred_user_code, session);
                if (refferer_id) {
                    payload.referred_by = refferer_id;
                }
            }
            // create user
            const createdUser = yield user_model_1.default.create([payload], { session });
            const user = createdUser[0];
            // insert into referral
            if (user === null || user === void 0 ? void 0 : user.referred_by) {
                yield referral_model_1.default.create([
                    {
                        referred_by: user === null || user === void 0 ? void 0 : user.referred_by,
                        reffer_to: user === null || user === void 0 ? void 0 : user._id,
                        credit: 2,
                        status: referral_1.REFERRAL_STATUS.pending,
                    },
                ], { session });
            }
            // generate token
            const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id: user === null || user === void 0 ? void 0 : user._id, role: user === null || user === void 0 ? void 0 : user.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
            const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id: user === null || user === void 0 ? void 0 : user._id, role: user === null || user === void 0 ? void 0 : user.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
            return { accessToken, refreshToken };
        }
        catch (error) {
            throw new Error(error);
        }
    }));
});
const signin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'user is not found !');
    }
    //check password
    if (!(yield user_model_1.default.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched');
    // generate token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ id: user === null || user === void 0 ? void 0 : user._id, role: user === null || user === void 0 ? void 0 : user.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ id: user === null || user === void 0 ? void 0 : user._id, role: user === null || user === void 0 ? void 0 : user.role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return { accessToken, refreshToken };
});
// refresh token service
const refreshToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshToken = payload;
    let verifiedToken = null;
    // check invalid token
    try {
        verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(refreshToken, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid refresh token');
    }
    // check user exist
    const { id } = verifiedToken;
    const verifiedUser = yield user_model_1.default.findOne({ _id: id });
    if (!verifiedUser) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new accessToken
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken({
        id: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser._id,
        role: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.role,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    signup,
    signin,
    refreshToken,
};
