import { Module } from '@nestjs/common';
import { CompanyListUseCase } from './companyList/companyList.useCase';
import { CompanyCreateUseCase } from './companyCreate/companyCreate.useCase';

@Module({
  providers: [CompanyListUseCase, CompanyCreateUseCase],
  exports: [CompanyListUseCase, CompanyCreateUseCase],
})
export class CompanyCaseModule {}
