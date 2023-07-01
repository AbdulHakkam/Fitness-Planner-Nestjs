import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { CreateExerciseDto } from 'src/exercise/dto/create-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Workout } from './schemas/workout.schema';
import { Exercise } from 'src/exercise/schemas/exercise.schema';
import { AddExerciseDto } from './dto/add-exercise.dto';

@Controller('workout')
export class WorkoutController {
  constructor(private workoutService: WorkoutService) {}

  @Get('all')
  async getWorkouts(): Promise<Workout[]> {
    return this.workoutService.findAll();
  }

  @Put(':workout_id')
  async addExercise(
    @Param('workout_id')
    workout_id: string,
    @Body()
    exercise: AddExerciseDto,
  ): Promise<Workout> {
    return this.workoutService.addExercise(workout_id, exercise);
  }

  @Post('createWorkout')
  async createWorkout(
    @Body() createWorkoutDto: CreateWorkoutDto,
  ): Promise<Workout> {
    return this.workoutService.createWorkout(createWorkoutDto);
  }

  @Post('deleteAll')
  async deleteAll(): Promise<Workout> {
    return this.workoutService.deleteAll();
  }
}
