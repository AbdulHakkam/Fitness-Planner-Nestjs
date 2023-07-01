import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Exercise } from "src/exercise/schemas/exercise.schema";

@Schema(
    {
        timestamps: false
    }
)

export class Workout {
    @Prop({ required: true })
    workout_id: string;

    @Prop([{ type: Exercise, required: true }])
    exercises: Array<ExerciseWithPosition>;
    
}

//an exercise with a position to indicate the order of the exercises in the workout
export class ExerciseWithPosition {
    @Prop({ type: Exercise, required: true })
    exercise: Exercise;
  
    @Prop({ required: true })
    position: number;
  }

export const WorkoutSchema = SchemaFactory.createForClass(Workout);