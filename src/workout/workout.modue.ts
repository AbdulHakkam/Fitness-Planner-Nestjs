import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSchema } from './schemas/workout.schema';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { UserSchema } from 'src/user/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Workout', schema: WorkoutSchema },
      { name: 'User', schema: UserSchema },
    ]),
  ],
  providers: [WorkoutService],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
