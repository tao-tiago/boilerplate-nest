import { Injectable } from '@nestjs/common';
import { CompanyCreateDTO } from './companyCreate.dto';

@Injectable()
export class CompanyCreateUseCase {
  async execute(payload: CompanyCreateDTO) {
    await Promise.resolve();

    return payload;
  }
}
