import { Muscle } from "src/exercise/schemas/exercise.schema";

export class AddExerciseDto {
    name: string;
    type: string;
    muscle: Muscle;
    equipment: string;
    difficulty: string;
    instructions: string;
}