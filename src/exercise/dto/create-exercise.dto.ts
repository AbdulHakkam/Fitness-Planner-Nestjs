import { Muscle } from "../schemas/exercise.schema";

export class CreateExerciseDto {
    name: string;
    type: string;
    muscle: Muscle;
    equipment: string;
    difficulty: string;
    instructions: string;
}