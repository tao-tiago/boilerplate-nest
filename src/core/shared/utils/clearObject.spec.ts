import { clearObject } from "./clearObject"

describe("utils > clearObject", () => {
  it("should clear object properties", () => {
    const object = { a: 1, b: 2, c: 3 }

    clearObject(object)

    expect(object).toEqual({})
  })

  it("should clear object properties except exceptions", () => {
    const object = { a: 1, b: 2, c: 3 }

    clearObject(object, ["a"])

    expect(object).toEqual({ a: 1 })
  })
})
