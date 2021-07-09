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
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleVerify = void 0;
const google_auth_library_1 = require("google-auth-library");
function googleVerify(idToken = '') {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = yield client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID
        });
        const name = ((_a = ticket.getPayload()) === null || _a === void 0 ? void 0 : _a.name) || '';
        const image = ((_b = ticket.getPayload()) === null || _b === void 0 ? void 0 : _b.picture) || '';
        const email = ((_c = ticket.getPayload()) === null || _c === void 0 ? void 0 : _c.email) || '';
        return { name, image, email };
    });
}
exports.googleVerify = googleVerify;
//# sourceMappingURL=google-verify.js.map