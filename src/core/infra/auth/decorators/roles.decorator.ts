import { SetMetadata } from "@nestjs/common"

import { Role } from "../contracts/roles.enum"

export const ROLES_KEY = "roles"
export const AllowRoles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles)
