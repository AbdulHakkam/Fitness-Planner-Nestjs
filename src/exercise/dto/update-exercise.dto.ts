import { Muscle } from "../schemas/exercise.schema";

export class UpdateExerciseDto {
    name: string;
    type: string;
    muscle: Muscle;
    equipment: string;
    difficulty: string;
    instructions: string;
}