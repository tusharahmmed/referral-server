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
exports.AuthController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const auth_service_1 = require("./auth.service");
const signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const { refreshToken, accessToken } = yield auth_service_1.AuthService.signup(payload);
    // set refresh token to cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config_1.default.env === 'production',
        sameSite: 'none',
        domain: config_1.default.env === 'production' ? config_1.default.server_domain : '',
        expires: new Date(Date.now() + 12 * 30 * 24 * 3600000), // 1year
        path: '/',
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User created successfully!',
        data: { accessToken },
    });
}));
const signin = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, accessToken } = yield auth_service_1.AuthService.signin(req.body);
    // set refresh token to cookie
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: config_1.default.env === 'production',
        sameSite: 'none',
        domain: config_1.default.env === 'production' ? config_1.default.server_domain : '',
        expires: new Date(Date.now() + 12 * 30 * 24 * 3600000), // 1year
        path: '/',
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User signin successfully!',
        data: { accessToken },
    });
}));
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const result = yield auth_service_1.AuthService.refreshToken(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Successfully generate refresh token',
        data: result,
    });
}));
exports.AuthController = {
    signup,
    signin,
    refreshToken,
};
