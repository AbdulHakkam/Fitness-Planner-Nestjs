import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class Exercise {
  @Prop()
  @IsNotEmpty()
  name: string;

  @Prop()
  @IsNotEmpty()
  weight?: number;

  @Prop()
  @IsNotEmpty()
  sets: number;

  @Prop()
  @IsNotEmpty()
  rest_time: number;
}

@Schema({
  timestamps: true,
})
export class Workout {
  @Prop()
  @IsNotEmpty()
  workout_name: string;

  @Prop()
  @IsNotEmpty()
  creator_id: string;

  @Prop()
  @ValidateNested()
  @Type(() => Exercise)
  workout: Exercise[];
}
export const WorkoutSchema = SchemaFactory.createForClass(Workout);
