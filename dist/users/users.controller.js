"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const user_1 = require("../schemas/user");
const users_service_1 = require("./users.service");
const jwt = require("jsonwebtoken");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
        this.secretKey = 'fdkhdsfkdsfhsldjfcsbndsakjfsd';
    }
    generateToken(user) {
        return jwt.sign({ username: user.username, userId: user._id }, this.secretKey, { expiresIn: '1h' });
    }
    async create(user) {
        try {
            const createdUser = await this.userService.create(user);
            const token = this.generateToken(createdUser);
            return { user: createdUser, token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    async signIn(credentials) {
        try {
            const user = await this.userService.findByUsername(credentials.username);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found please sign up');
            }
            const isPasswordValid = await this.userService.comparePasswords(credentials.password, user.password);
            if (!isPasswordValid) {
                throw new common_1.UnauthorizedException('Invalid password');
            }
            const token = this.generateToken(user);
            return { user, token };
        }
        catch (error) {
            throw new common_1.UnauthorizedException(error.message);
        }
    }
    findOne(id) {
        this.userService.findOne(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('/signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signIn", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)(':id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map