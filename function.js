
/*


import {
    isset,
    isEmpty,
    isNotEmpty,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isArray,
    isFunction,
    isDate,
    trim,
    strlen
  } from './function.js';


*/



















// Variable එකක් set වෙලා තියෙනවද සහ null නොවෙනවද බලනවා. Multiple arguments check කරන්නත් පුළුවන්.
export function isset(...args) {
    return args.every(arg => typeof arg !== 'undefined' && arg !== null);
}

// Value එක undefined, null, හෝ empty string ද කියලා බලනවා.
export function isEmpty(value) {
    return value === undefined || value === null || value === '';
}

// Value එක empty නොවෙනවාද කියලා බලනවා. isEmpty එකේ opposite එක.
export function isNotEmpty(value) {
    return !isEmpty(value);
}

// Value එක string type එකක්ද කියලා බලනවා.
export function isString(value) {
    return typeof value === 'string';
}

// Value එක number type එකක්ද කියලා බලනවා.
export function isNumber(value) {
    return typeof value === 'number';
}

// Value එක boolean type එකක්ද (true/false) කියලා බලනවා.
export function isBoolean(value) {
    return typeof value === 'boolean';
}

// Value එක object type එකක්ද කියලා බලනවා (null නොවෙනවා සහ array නොවෙනවා ඕන).
export function isObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Value එක array type එකක්ද කියලා බලනවා.
export function isArray(value) {
    return Array.isArray(value);
}

// Value එක function type එකක්ද කියලා බලනවා.
export function isFunction(value) {
    return typeof value === 'function';
}

// Value එක Date object එකක්ද කියලා බලනවා.
export function isDate(value) {
    return value instanceof Date;
}

// String එකක leading සහ trailing whitespace හෝ specify කරපු characters ඉවත් කරනවා.
export function trim(str, characters = '') {
    if (typeof str !== 'string') return ''; // String නොවෙනවා නම් empty string return කරනවා
    const defaultWhitespace = ' \t\n\r\v\f'; // Default whitespace characters define කරනවා
    const charsToTrim = characters || defaultWhitespace; // Custom characters හෝ default එක ගන්නවා
    const startRegex = new RegExp(`^[${charsToTrim}]+`); // Leading characters ඉවත් කරන regex
    const endRegex = new RegExp(`[${charsToTrim}]+$`); // Trailing characters ඉවත් කරන regex
    return str.replace(startRegex, '').replace(endRegex, ''); // Clean කරපු string එක return කරනවා
}

// Input එකක character count එක ගන්නවා. Non-string එකක් ආවත් string එකකට convert කරලා length ගන්නවා.
export function strlen(input) {
    return String(input).length;
}







