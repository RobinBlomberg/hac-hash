"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.generate = void 0;
const crypto = __importStar(require("crypto"));
const DIGEST_ALGORITHM = 'sha512';
const ITERATIONS = 2048;
const KEY_LENGTH = 32;
const SALT_LENGTH = 16;
exports.generate = (password, salt = crypto.randomBytes(SALT_LENGTH).toString('hex'), { digestAlgorithm = DIGEST_ALGORITHM, iterations = ITERATIONS, keyLength = KEY_LENGTH } = {}) => {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, iterations, keyLength, digestAlgorithm, (error, key) => {
            if (error) {
                reject(error);
            }
            else {
                const result = [salt, key.toString('hex')].join('$');
                resolve(result);
            }
        });
    });
};
exports.verify = async (password, hash, options) => {
    const [salt, oldHashPart] = hash.split('$');
    const newHash = await exports.generate(password, salt, options);
    const newHashPart = newHash.split('$')[1];
    return newHashPart === oldHashPart;
};
//# sourceMappingURL=index.js.map