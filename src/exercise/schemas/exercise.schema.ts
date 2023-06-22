import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum Muscle {
    CALVES = 'calves',
    QUADRICEPS = 'quadriceps',
    LATS = 'lats',
    GLUTES = 'glutes',
    LOWER_BACK = 'lower_back',
    TRICEPS = 'triceps',
    NECK = 'neck',
    ABDUCTORS = 'abductors',
    TRAPS = 'traps',
    ADDUCTORS = 'adductors',
    MIDDLE_BACK = 'middle_back',
    CHEST = 'chest',
    ABDOMINALS = 'abdominals',
    HAMSTRINGS = 'hamstrings',
    BICEPS = 'biceps',
    FOREARMS = 'forearms'
}

@Schema(
    {
        timestamps: true
    }
)

export class Exercise {
    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    muscle: Muscle;

    @Prop()
    equipment: string;

    @Prop()
    difficulty: string;

    @Prop()
    instructions: string;
}

export const ExerciseSchema = SchemaFactory.createForClass(Exercise);