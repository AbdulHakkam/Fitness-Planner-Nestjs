import mongoose from 'mongoose';
import { Workout } from './schemas/workout.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class WorkoutService {
  constructor(
    @InjectModel(Workout.name)
    private workoutModal: mongoose.Model<Workout>,
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}

  async addWorkout(workout: Workout): Promise<Workout> {
    console.log(workout);
    const newWorkout = await this.workoutModal.create(
      new this.workoutModal(workout)
    );
    await this.userModel.findOneAndUpdate(
      { user_id: workout.creator_id },
      { $push: { workout_plans: newWorkout._id } }
    );
    return newWorkout;
  }

  async patchWorkout(
    workoutId: string,
    updatedWorkout: Workout
  ): Promise<Workout> {
    const workout = await this.workoutModal.findByIdAndUpdate(
      workoutId,
      updatedWorkout
    );
    if (!workout) {
      throw new HttpException('Workout not found', HttpStatus.NOT_FOUND);
    }
    return workout;
  }

  async delWorkout(workoutId: string, userId: string) {
    await this.workoutModal.deleteOne({ _id: workoutId });
    await this.userModel.findOneAndUpdate(
      { user_id: userId },
      { $pull: { workout_plans: new mongoose.Types.ObjectId(workoutId) } }
    );
  }
}
