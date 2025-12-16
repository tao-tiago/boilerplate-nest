import { compare, hashSync } from "bcryptjs"
const HASH_SALT = 10

export const generateHash = (password: string) => hashSync(password, HASH_SALT)

export const compareHash = async (password: string, hash: string) => compare(password, hash)
