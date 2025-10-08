import { Module } from '@nestjs/common';

import { CompanyControllerModule } from './company/companyController.module';

@Module({
  imports: [CompanyControllerModule],
})
export class ControllerRootModule {}
