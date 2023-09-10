import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':id')
  async getUser(
    @Param('id')
    id: string
  ): Promise<User> {
    return this.userService.getUser(id);
  }
}
