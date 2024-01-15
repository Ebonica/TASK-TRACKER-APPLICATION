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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_1 = require("../schemas/task");
const users_service_1 = require("../users/users.service");
let TasksService = class TasksService {
    constructor(taskModel, userService) {
        this.taskModel = taskModel;
        this.userService = userService;
    }
    async create(createTaskDto) {
        const user = await this.userService.findOne(createTaskDto.userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const createdTask = await this.taskModel.create({
            ...createTaskDto,
            user: user._id,
        });
        return createdTask;
    }
    async findAllByUser(userId) {
        const user = await this.userService.findOne(userId);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const tasks = await this.taskModel.find({ user: user._id }).exec();
        return tasks;
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_1.TASK_MODEL)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map