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
exports.CourseService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = __importDefault(require("../../../builder/QueryBuilder"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const course_constant_1 = require("./course.constant");
const course_model_1 = __importDefault(require("./course.model"));
const createCourse = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield course_model_1.default.create(payload);
    return result;
});
const getAllCourse = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const courseQuery = new QueryBuilder_1.default(course_model_1.default.find(), Object.assign(Object.assign({}, query), { isDeleted: false }))
        .search(course_constant_1.CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();
    const meta = yield courseQuery.countTotal();
    const data = yield courseQuery.modelQuery;
    return {
        data,
        meta,
    };
});
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = new mongoose_1.Types.ObjectId(id);
    const result = yield course_model_1.default.findByIdAndUpdate(_id, {
        isDeleted: true,
    }, { new: true });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Course does not exist!');
    }
    return { _id: result === null || result === void 0 ? void 0 : result._id, deletedCount: 1 };
});
exports.CourseService = {
    createCourse,
    getAllCourse,
    deleteCourse,
};
