import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export class Workout {
  @Prop()
  id: string;

  @Prop()
  weight?: number;

  @Prop()
  sets: number;

  @Prop()
  rest_time: number;
}

export class WorkoutPlans {
  @Prop()
  workout_id: string;

  @Prop()
  workout_name: string;

  @Prop()
  workout: Workout[];
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  user_id: string;

  @Prop()
  workout_plans: WorkoutPlans[];
}

export const UserSchema = SchemaFactory.createForClass(User);
