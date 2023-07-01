import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ExerciseWithPosition, Workout } from './schemas/workout.schema';
import { Model } from 'mongoose';
import { CreateExerciseDto } from 'src/exercise/dto/create-exercise.dto';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { Exercise } from 'src/exercise/schemas/exercise.schema';
import { AddExerciseDto } from './dto/add-exercise.dto';

@Injectable()
export class WorkoutService {
    
    constructor(
        @InjectModel(Workout.name)
        private workoutModel: Model<Workout>,
    ) {}

    findAll(): Promise<Workout[]> {
        //return just the workouts
        return this.workoutModel.find().exec();
    }

    async addExercise(workout_id: string, exercise: Exercise): Promise<Workout> {
        
        //find the workout by id
        // const workout = await this.workoutModel.findOne({ workout_id: workout_id });
        const workout = await this.workoutModel.findOne({ workout_id: '007' });

        if (!workout) {
            throw new Error('Workout not found');
        }

        //create a new exercise with postition
        var exerciseWithPosition: ExerciseWithPosition = new ExerciseWithPosition();
        exerciseWithPosition.exercise = exercise;
        exerciseWithPosition.position = workout.exercises.length;

        console.log(exerciseWithPosition);
        
        //add the exercise to the workout

        console.log("workout.exercises PRE");
        console.log(workout.exercises);

        workout.exercises.push(exerciseWithPosition);

        // console.log(exerciseWithPosition);
        console.log("workout.exercises");
        console.log(workout.exercises);
        // console.log(workout);

        //save the workout
        await workout.save();

        //return the workout
        return workout;

    }

    deleteAll(): any {
        return this.workoutModel.deleteMany({}).exec();
    }

    createWorkout(createWorkoutDto: CreateWorkoutDto): any {
        return this.workoutModel.create(createWorkoutDto);
    }
}
