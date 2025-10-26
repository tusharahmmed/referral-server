"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const courseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: true,
        index: true,
    },
    price: {
        type: mongoose_1.Types.Decimal128,
        default: mongoose_1.Types.Decimal128.fromString('0.00'),
        required: true,
        get: (value) => parseFloat(value.toString()),
    },
    instructor: {
        type: String,
        required: true,
        index: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
        select: 0,
        index: true,
    },
}, {
    timestamps: true,
    toJSON: { getters: true },
});
courseSchema.pre('save', function (next) {
    const course = this;
    if (course.isModified('price') && typeof course.price === 'number') {
        course.price = mongoose_1.Types.Decimal128.fromString(course.price.toFixed(2));
    }
    next();
});
const Course = (0, mongoose_1.model)('Course', courseSchema);
exports.default = Course;
