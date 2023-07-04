import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

export class Workout {
  @Prop()
  workout_id: string;
  @Prop()
  workout: string[];
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  user_id: string;

  @Prop()
  workout_plans: Workout[];
}

export const UserSchema = SchemaFactory.createForClass(User);
