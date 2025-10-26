"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.stringToBoolean = exports.asyncForEach = void 0;
exports.excludeFields = excludeFields;
function excludeFields(user, keys) {
    return Object.fromEntries(Object.entries(user).filter(([key]) => !keys.includes(key)));
}
const asyncForEach = (arr, callback) => __awaiter(void 0, void 0, void 0, function* () {
    if (!Array.isArray(arr)) {
        throw new Error('expected an array');
    }
    for (let i = 0; i < arr.length; i++) {
        yield callback(arr[i], i, arr);
    }
});
exports.asyncForEach = asyncForEach;
const stringToBoolean = (string) => {
    return string.toLowerCase() === 'true';
};
exports.stringToBoolean = stringToBoolean;
