import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Query, QueryOptions } from 'mongoose';
import { User, WorkoutPlans } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async getUser(uuid: string): Promise<User> {
    const user = await this.userModel.findOne({ user_id: uuid }).exec();
    if (!user) {
      const newUser = new this.userModel({
        user_id: uuid,
        workout_plans: [],
      });
      return this.userModel.create(newUser);
    }
    return user;
  }

  async updateWorkouts(
    newWorkout: WorkoutPlans,
    uuid: string,
  ): Promise<QueryOptions> {
    const user = await this.userModel.findOne({ user_id: uuid }).exec();
    let newUserWorkouts: WorkoutPlans[] = [];
    if (
      user.workout_plans.filter(
        (plan) => plan.workout_id === newWorkout.workout_id,
      ).length > 0
    ) {
      if (newWorkout.workout.length > 0) {
        newUserWorkouts = user.workout_plans.map((plan) => {
          return plan.workout_id === newWorkout.workout_id ? newWorkout : plan;
        });
      } else {
        newUserWorkouts = user.workout_plans.filter(
          (workout) => workout.workout_id != newWorkout.workout_id,
        );
      }
    } else {
      newUserWorkouts = [...user.workout_plans, newWorkout];
    }
    const res: QueryOptions = await this.userModel.updateOne(
      { user_id: uuid },
      { workout_plans: newUserWorkouts },
    );
    return res;
  }
}
