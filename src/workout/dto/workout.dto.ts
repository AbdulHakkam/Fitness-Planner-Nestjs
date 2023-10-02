import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Workout } from '../schemas/workout.schema';
import { Type } from 'class-transformer';

export class PatchWorkoutDto {
  @IsNotEmpty()
  workoutId: string;

  @ValidateNested()
  @Type(() => Workout)
  workout: Workout;
}

export class AddWorkoutDto {
  @ValidateNested()
  @Type(() => Workout)
  workout: Workout;
}

export class DeleteWorkoutDto {
  @IsNotEmpty()
  workoutId: string;

  @IsNotEmpty()
  userId: string;
}
