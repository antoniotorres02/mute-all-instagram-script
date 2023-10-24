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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log('Starting script');
require("dotenv/config");
var instagram_private_api_1 = require("instagram-private-api");
var ig = new instagram_private_api_1.IgApiClient();
ig.state.generateDevice(process.env.IG_USERNAME);
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var loggedInUser, followingFeed, myFollowing, i, myFollowing_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: 
            //Login
            return [4 /*yield*/, ig.simulate.preLoginFlow()];
            case 1:
                //Login
                _a.sent();
                return [4 /*yield*/, ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)];
            case 2:
                loggedInUser = _a.sent();
                process.nextTick(function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ig.simulate.postLoginFlow()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); }); });
                ig.challenge.auto(true);
                followingFeed = ig.feed.accountFollowing(loggedInUser.pk);
                return [4 /*yield*/, followingFeed.items()];
            case 3:
                myFollowing = _a.sent();
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 120000); })];
            case 4:
                _a.sent();
                i = 0;
                return [4 /*yield*/, muteFollower(myFollowing, ig, i)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                if (!followingFeed.isMoreAvailable()) return [3 /*break*/, 10];
                console.log('More available');
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 120000); })];
            case 7:
                _a.sent();
                return [4 /*yield*/, followingFeed.items()];
            case 8:
                myFollowing_1 = _a.sent();
                return [4 /*yield*/, muteFollower(myFollowing_1, ig, i)];
            case 9:
                _a.sent();
                return [3 /*break*/, 6];
            case 10:
                //Mute recommendations
                console.log('Done');
                return [2 /*return*/];
        }
    });
}); })();
function muteFollower(myFollowing, ig, i) {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _i, myFollowing_2, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (user) {
                        var time;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, ig.friendship.mutePostsOrStoryFromFollow({ targetPostsAuthorId: user.pk.toString(), targetReelAuthorId: user.pk.toString() })];
                                case 1:
                                    _b.sent();
                                    console.log("Muted ".concat(user.username));
                                    time = Math.round(Math.random() * 6000) + 1000;
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, time); })];
                                case 2:
                                    _b.sent();
                                    //Wait randomly doing 6 minutes another request
                                    i++;
                                    if (!(i % 50 === 0)) return [3 /*break*/, 4];
                                    console.log('Waiting 2 minutes');
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 120000); })];
                                case 3:
                                    _b.sent();
                                    _b.label = 4;
                                case 4: return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, myFollowing_2 = myFollowing;
                    _a.label = 1;
                case 1:
                    if (!(_i < myFollowing_2.length)) return [3 /*break*/, 4];
                    user = myFollowing_2[_i];
                    return [5 /*yield**/, _loop_1(user)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
