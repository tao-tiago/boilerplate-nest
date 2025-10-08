import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyCreateDTO } from '@/cases/company/companyCreate/companyCreate.dto';
import { CompanyCreateUseCase } from '@/cases/company/companyCreate/companyCreate.useCase';
import { CompanyListUseCase } from '@/cases/company/companyList/companyList.useCase';
import { filters } from '@/core/shared/helpers/filters';
import {
  CompanyListDTO,
  CompanyListFilter,
} from '@/cases/company/companyList/companyList.dto';

@Controller('api/v1/companies')
export class CompanyController {
  constructor(
    private companyListUseCase: CompanyListUseCase,
    private companyCreateUseCase: CompanyCreateUseCase,
  ) {}

  @Get()
  async companyList(@Query() query: CompanyListDTO) {
    const payload = filters<CompanyListFilter>(query);
    return await this.companyListUseCase.execute(payload);
  }

  @Post()
  async companyCreate(@Body() companyCreateDTO: CompanyCreateDTO) {
    await this.companyCreateUseCase.execute(companyCreateDTO);
    return {
      message: ['Company created successfully'],
    };
  }
}
