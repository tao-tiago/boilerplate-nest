import { QueryOptionsDTO } from "@/core/shared/helpers/query-options.dto"
import { OmitBase } from "@/core/shared/helpers/utility-types"

export class ListUserDTO extends QueryOptionsDTO {}

export type ListUserFilter = OmitBase<ListUserDTO, QueryOptionsDTO>
