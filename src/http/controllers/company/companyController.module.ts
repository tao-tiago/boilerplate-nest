import { Module } from '@nestjs/common';

import { CompanyController } from './company.controller';
import { CompanyCaseModule } from 'src/cases/company/companyCase.module';

@Module({
  imports: [CompanyCaseModule],
  controllers: [CompanyController],
})
export class CompanyControllerModule {}
