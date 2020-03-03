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
import express from 'express';
var router = express.Router();
import validator from 'express-validator';
import auth from '../../middleware/auth.js';
import Reading from '../../models/Readings.js';
import User from '../../models/Users.js';
//Private POST route to record a reading
router.post('/', auth, [
    validator
        .check('store', 'Store name is required')
        .not()
        .isEmpty(),
    validator
        .check('total', 'A total price must be included')
        .not()
        .isEmpty()
        .isNumeric(),
    validator
        .check('perGallon', 'A total price must be included')
        .not()
        .isEmpty()
        .isNumeric(),
    validator
        .check('numGallons', 'A numGallons price must be included')
        .not()
        .isEmpty()
        .isNumeric(),
], function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, _a, store, street, city, state, total, perGallon, numGallons, user, newReading, reading, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                errors = validator.validationResult(req);
                if (!errors.isEmpty()) {
                    return [2 /*return*/, res.status(400).json({ errors: errors.array() })];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                _a = req.body, store = _a.store, street = _a.street, city = _a.city, state = _a.state, total = _a.total, perGallon = _a.perGallon, numGallons = _a.numGallons;
                return [4 /*yield*/, User.findById(req.user.id).select('-password')];
            case 2:
                user = _b.sent();
                newReading = new Reading({
                    user: req.user.id,
                    name: user.name,
                    avatar: user.avatar,
                    store: store,
                    street: street,
                    city: city,
                    state: state,
                    total: total,
                    perGallon: perGallon,
                    numGallons: numGallons,
                });
                return [4 /*yield*/, newReading.save()];
            case 3:
                reading = _b.sent();
                res.json(reading);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _b.sent();
                console.error(err_1.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
//public route to get all readings
router.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var readings, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Reading.find().sort({ date: -1 })];
            case 1:
                readings = _a.sent();
                res.json(readings);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.error(err_2.message);
                res.status(500).send('Server Error');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
export default router;
