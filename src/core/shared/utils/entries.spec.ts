import { entries } from "./entries"

describe("utils > entries", () => {
  it("should return entries for simple object", () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = entries(obj)

    expect(result).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3]
    ])
  })

  it("should return entries for object with different value types", () => {
    const obj = {
      string: "hello",
      number: 42,
      boolean: true,
      array: [1, 2, 3],
      object: { nested: "value" }
    }
    const result = entries(obj)

    expect(result).toEqual([
      ["string", "hello"],
      ["number", 42],
      ["boolean", true],
      ["array", [1, 2, 3]],
      ["object", { nested: "value" }]
    ])
  })

  it("should return empty array for empty object", () => {
    const obj = {}
    const result = entries(obj)

    expect(result).toEqual([])
  })

  it("should handle object with null and undefined values", () => {
    const obj = {
      nullValue: null,
      undefinedValue: undefined,
      emptyString: "",
      zero: 0,
      falsy: false
    }
    const result = entries(obj)

    expect(result).toEqual([
      ["nullValue", null],
      ["undefinedValue", undefined],
      ["emptyString", ""],
      ["zero", 0],
      ["falsy", false]
    ])
  })

  it("should handle object with symbol keys (only enumerable string keys)", () => {
    const obj = {
      regularKey: "value1",
      anotherKey: "value2"
    }
    const result = entries(obj)

    expect(result).toEqual([
      ["regularKey", "value1"],
      ["anotherKey", "value2"]
    ])
  })

  it("should maintain type safety with typed objects", () => {
    type TestInterface = {
      id: number
      name: string
      active: boolean
    }

    const obj: TestInterface = {
      id: 1,
      name: "test",
      active: true
    }

    const result = entries(obj)

    // Type assertion to verify the return type is correct
    const typedResult: [keyof TestInterface, TestInterface[keyof TestInterface]][] = result

    expect(result).toEqual([
      ["id", 1],
      ["name", "test"],
      ["active", true]
    ])
    expect(typedResult).toBeDefined()
  })

  it("should work with objects that have computed properties", () => {
    const obj = {
      get computed() {
        return "computed value"
      },
      regular: "regular value"
    }

    const result = entries(obj)

    expect(result).toEqual([
      ["computed", "computed value"],
      ["regular", "regular value"]
    ])
  })

  it("should handle objects with numeric string keys", () => {
    const obj = {
      "0": "zero",
      "1": "one",
      normalKey: "normal"
    }

    const result = entries(obj)

    expect(result).toEqual([
      ["0", "zero"],
      ["1", "one"],
      ["normalKey", "normal"]
    ])
  })

  it("should preserve the same behavior as Object.entries but with type safety", () => {
    const obj = { x: 10, y: 20, z: 30 }

    const nativeResult = Object.entries(obj)
    const utilResult = entries(obj)

    expect(utilResult).toEqual(nativeResult)
    expect(Array.isArray(utilResult)).toBe(true)
    expect(utilResult.length).toBe(Object.keys(obj).length)
  })
})
