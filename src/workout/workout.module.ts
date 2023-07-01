import { Module } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { WorkoutController } from './workout.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkoutSchema } from './schemas/workout.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Workout', schema: WorkoutSchema }])],  
  controllers: [WorkoutController],
  providers: [WorkoutService]
})
export class WorkoutModule {}