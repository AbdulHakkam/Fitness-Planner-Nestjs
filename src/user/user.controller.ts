import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User, Workout } from './schemas/user.schema';
import { QueryOptions } from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(
    @Param('id')
    id: string,
  ): Promise<User> {
    return this.userService.getUser(id);
  }

  @Post('workout/:id')
  @HttpCode(200)
  async updateUserWorkouts(
    @Param('id')
    id: string,
    @Body()
    workout: Workout,
  ): Promise<QueryOptions> {
    return this.userService.updateWorkouts(workout, id);
  }
}
