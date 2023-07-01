import { ExerciseWithPosition } from "../schemas/workout.schema";

export class CreateWorkoutDto {
    workout_id: string;
    exercises: ExerciseWithPosition[];
}