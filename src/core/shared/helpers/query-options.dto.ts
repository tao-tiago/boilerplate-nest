import { Expose, Transform } from 'class-transformer';
import { IsIn, IsOptional } from 'class-validator';

export class QueryOptionsDTO {
  @IsOptional()
  orderBy: string = 'createdAt';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'desc';

  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  page = 1;

  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  size = 10;

  @Expose()
  filters?: Record<string, any>;
}
