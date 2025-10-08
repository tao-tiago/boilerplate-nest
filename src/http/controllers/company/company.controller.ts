/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CompanyCreateDTO } from '@/cases/company/companyCreate/companyCreate.dto';
import { CompanyCreateUseCase } from '@/cases/company/companyCreate/companyCreate.useCase';
import { CompanyListUseCase } from '@/cases/company/companyList/companyList.useCase';
import { filters } from '@/core/shared/helpers/filters';
import { QueryOptionsDTO } from '@/core/shared/helpers/query-options.dto';

@Controller('api/v1/companies')
export class CompanyController {
  constructor(
    private companyListUseCase: CompanyListUseCase,
    private companyCreateUseCase: CompanyCreateUseCase,
  ) {}

  @Get()
  async companyList(@Query() query: QueryOptionsDTO) {
    const payload = filters(query);
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
