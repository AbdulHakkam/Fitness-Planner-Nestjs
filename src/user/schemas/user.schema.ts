import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  user_id: string;

  @Prop()
  workout_plans: ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
