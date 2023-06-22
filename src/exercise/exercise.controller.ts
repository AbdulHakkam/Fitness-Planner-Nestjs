import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { Exercise } from './schemas/exercise.schema';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercise')
export class ExerciseController {
    constructor(
        private exerciseService: ExerciseService
    ) {}

    @Get()
    async getExercises(): Promise<Exercise[]> {
        return this.exerciseService.findAll();
    }

    @Get(':id')
    async getExerciseById(
        @Param('id')
        id: string,
    ): Promise<Exercise> {
        return this.exerciseService.findById(id);
    }

    @Post()
    async createExercise(
        @Body() 
        exercise: CreateExerciseDto,
    ): Promise<Exercise> {
        return this.exerciseService.create(exercise);
    }

    @Post('createMany')
    async createManyExercises(
        @Body()
        exercises: CreateExerciseDto[],
    ): Promise<Exercise[]> {
        return this.exerciseService.createManyExercises(exercises);
    }

    @Put(':id')
    async updateExercise(
        @Param('id')
        id: string,
        @Body()
        exercise: UpdateExerciseDto,
    ): Promise<Exercise> {
        return this.exerciseService.updateById(id, exercise);
    }

    @Post('deleteAll')
    async deleteAll(): Promise<any> {
        return this.exerciseService.deleteAll();
    }

    @Post('delete/:id')
    async deleteById(
        @Param('id')
        id: string,
    ): Promise<any> {
        return this.exerciseService.deleteById(id);
    }

}
