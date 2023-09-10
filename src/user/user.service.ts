import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>
  ) {}

  async getUser(uuid: string): Promise<User> {
    const user = await this.userModel.aggregate([
      { $match: { user_id: uuid } },
      {
        $lookup: {
          from: 'workouts',
          let: { workout_plans: '$workout_plans' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$workout_plans'] } } },
            // Add additional stages here
          ],
          as: 'workouts',
        },
      },
      {
        $project: {
          user_id: 1,
          'workouts._id': 1,
          'workouts.workout_name': 1,
          'workouts.creator_id': 1,
          'workouts.workout': 1,
        },
      },
    ]);
    if (user.length < 1) {
      const newUser = new this.userModel({
        user_id: uuid,
        workout_plans: [],
      });
      return this.userModel.create(newUser);
    }
    return user[0];
  }

  async addWorkout(userId: string, workoutId: string): Promise<User> {
    return await this.userModel.findOneAndUpdate(
      { user_id: userId },
      { $push: { workout_plans: workoutId } }
    );
  }
}
