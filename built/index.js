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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var MapGrid_1 = require("blockrpg-core/built/Model/MapBlock/Entity/MapGrid");
var index_1 = require("blockrpg-core/built/Model/MapBlock/Entity/index");
var MapBlockBLL = __importStar(require("blockrpg-core/built/Model/MapBlock/BLL"));
var iReadLine = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function ReadLine(ques) {
    return new Promise(function (resolve, reject) {
        iReadLine.question(ques, function (answer) {
            resolve(answer);
        });
    });
}
function Random(num) {
    return Math.floor(Math.random() * (Math.floor(Math.abs(num)) + 1)) === 0;
}
function initMap(num) {
    return __awaiter(this, void 0, void 0, function () {
        var i, j, grids, block;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    i = -num;
                    _a.label = 1;
                case 1:
                    if (!(i <= num)) return [3 /*break*/, 6];
                    j = -num;
                    _a.label = 2;
                case 2:
                    if (!(j <= num)) return [3 /*break*/, 5];
                    grids = Array(21 * 13).fill(0).map(function (num) {
                        return new MapGrid_1.MapGrid({
                            // 草地地图
                            map: {
                                resId: 0,
                                resNum: 1,
                            },
                            // 灌木道具
                            prop: Random(20) ? {
                                resId: 0,
                                resNum: 11,
                                passMask: 0,
                            } : undefined,
                        });
                    });
                    block = new index_1.MapBlock({
                        id: undefined,
                        mapId: 'test',
                        x: j,
                        y: i,
                        grids: grids,
                    });
                    console.log(i + "~" + j + " building...");
                    return [4 /*yield*/, MapBlockBLL.newBlock(block)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    ++j;
                    return [3 /*break*/, 2];
                case 5:
                    ++i;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var numStr, num, padNum;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('------map init------');
                    return [4 /*yield*/, ReadLine('input number: ')];
                case 1:
                    numStr = _a.sent();
                    num = Number(numStr);
                    if (!(isFinite(num) && num >= 1)) return [3 /*break*/, 3];
                    padNum = Math.floor(num);
                    return [4 /*yield*/, initMap(padNum)];
                case 2:
                    _a.sent();
                    console.log('finished');
                    return [3 /*break*/, 4];
                case 3:
                    console.error('number error');
                    _a.label = 4;
                case 4:
                    iReadLine.close();
                    process.exit(0);
                    return [2 /*return*/];
            }
        });
    });
}
main();
