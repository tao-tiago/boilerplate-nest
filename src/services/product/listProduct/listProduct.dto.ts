import { IsOptional, IsString } from "class-validator"

import { QueryOptionsDTO } from "@/core/shared/helpers/query-options.dto"
import { OmitBase } from "@/core/shared/helpers/utility-types"

export class ListProductDTO extends QueryOptionsDTO {
  @IsOptional()
  @IsString()
  name?: string
}

export type ListProductFilter = OmitBase<ListProductDTO, QueryOptionsDTO>
