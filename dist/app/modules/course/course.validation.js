"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseValidation = exports.priceSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.priceSchema = zod_1.default
    .number()
    .min(0, 'price cannot be negative')
    .max(1000000, 'price too large')
    .refine(val => {
    const decimalPart = val.toString().split('.')[1];
    return !decimalPart || decimalPart.length <= 2;
}, 'price can have maximum 2 decimal places');
const createCourse = zod_1.default.object({
    body: zod_1.default.object({
        name: zod_1.default.string({ required_error: 'Name is required' }),
        description: zod_1.default.string({ required_error: 'Description is required' }),
        price: exports.priceSchema,
        instructor: zod_1.default.string({ required_error: 'Instructor is required' }),
        thumbnail: zod_1.default.string({ required_error: 'Thumbnail is required' }),
    }),
});
exports.CourseValidation = {
    createCourse,
};
