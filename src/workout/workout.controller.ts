import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { Workout } from './schemas/workout.schema';
import {
  AddWorkoutDto,
  DeleteWorkoutDto,
  PatchWorkoutDto,
} from './dto/workout.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}
  @Post('new')
  async addWorkout(
    @Body()
    addWorkoutDto: AddWorkoutDto
  ): Promise<Workout> {
    return this.workoutService.addWorkout(addWorkoutDto.workout);
  }

  @Patch()
  async patchWorkout(
    @Body()
    patchWorkoutDto: PatchWorkoutDto
  ): Promise<Workout> {
    return this.workoutService.patchWorkout(
      patchWorkoutDto.workoutId,
      patchWorkoutDto.workout
    );
  }

  @Delete()
  async delWorkout(
    @Body()
    deleteWorkoutDto: DeleteWorkoutDto
  ) {
    this.workoutService.delWorkout(
      deleteWorkoutDto.workoutId,
      deleteWorkoutDto.userId
    );
  }
}
