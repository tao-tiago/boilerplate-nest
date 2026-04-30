import { Request } from "express"

export type OmitBase<T, Base> = Omit<T, keyof Base>

export type CustomRequest = Request & {
  correlationId: string
}
