import { Injectable, NotFoundException } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Exercise } from './schemas/exercise.schema';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectModel(Exercise.name)
    private exerciseModel: mongoose.Model<Exercise>,
  ) {}

  async findAll(): Promise<Exercise[]> {
    return this.exerciseModel.find().exec();
  }

  async findById(id: string): Promise<Exercise> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid exercise ID.');
    }

    const exercise = await this.exerciseModel.findById(id);

    // if (!exercise) {
    //     // throw a regular error
    //     throw new Error('Exercise not found');
    // }

    return exercise;
  }

  async create(exercise: Exercise): Promise<Exercise> {
    const result = await this.exerciseModel.create(exercise);
    return result;
  }

  //create a lot of exercises
  async createManyExercises(exercises: Exercise[]): Promise<Exercise[]> {
    const result = await this.exerciseModel.insertMany(exercises);
    return result;
  }

  async updateById(id: string, exercise: Exercise): Promise<Exercise> {
    return await this.exerciseModel.findByIdAndUpdate(id, exercise, {
      new: true,
      runValidators: true,
    });
  }

  async deleteAll(): Promise<any> {
    return this.exerciseModel.deleteMany({}).exec();
  }

  async deleteById(id: string): Promise<any> {
    return this.exerciseModel.findByIdAndDelete(id).exec();
  }
}
