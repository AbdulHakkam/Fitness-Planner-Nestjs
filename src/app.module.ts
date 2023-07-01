import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './exercise/exercise.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { WorkoutModule } from './workout/workout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.ATLAS_URI),
    ExerciseModule,
    WorkoutModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
