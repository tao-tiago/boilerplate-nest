import { Module } from '@nestjs/common';
import { ControllerModule } from './http/controllers/controllers.module';

@Module({
  imports: [ControllerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
