import { Module } from '@nestjs/common';
import { CompanyListUseCase } from './companyList/companyList.useCase';
import { CompanyCreateUseCase } from './companyCreate/companyCreate.useCase';
import { CompanyRepositoryModule } from 'src/repositories/company/companyRepository.module';

@Module({
  imports: [CompanyRepositoryModule],
  providers: [CompanyListUseCase, CompanyCreateUseCase],
  exports: [CompanyListUseCase, CompanyCreateUseCase],
})
export class CompanyCaseModule {}
