import { Transform } from "class-transformer"
import { IsIn, IsOptional, IsUUID } from "class-validator"

export class QueryOptionsDTO {
  @IsOptional()
  orderBy: string = "createdAt"

  @IsOptional()
  @IsIn(["asc", "desc"])
  order: "asc" | "desc" = "desc"

  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  page = 1

  @IsOptional()
  @Transform(({ value }: { value: string }) => parseInt(value, 10))
  size = 10
}

export class QueryCompanyId {
  @IsUUID()
  companyId: string
}

export class QueryId {
  @IsUUID()
  id: string
}

export type QueryOptionsResponse<T> = Pick<QueryOptionsDTO, "orderBy" | "order"> & {
  skip: number
  take: number
  filter: Record<keyof T, string>
}
