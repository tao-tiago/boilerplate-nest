import { QueryOptionsDTO } from "../helpers/query-options.dto"

import { filters } from "./filters"

describe("utils > filters", () => {
  it("should process basic query options with default values", () => {
    const query: QueryOptionsDTO = {
      orderBy: "createdAt",
      order: "desc",
      page: 1,
      size: 10
    }

    const result = filters(query)

    expect(result).toEqual({
      orderBy: "createdAt",
      order: "desc",
      skip: 0,
      take: 10,
      filter: {}
    })
  })

  it("should calculate skip correctly for different page numbers", () => {
    const query1: QueryOptionsDTO = {
      orderBy: "createdAt",
      order: "desc",
      page: 2,
      size: 10
    }

    const query2: QueryOptionsDTO = {
      orderBy: "createdAt",
      order: "desc",
      page: 3,
      size: 5
    }

    const result1 = filters(query1)
    const result2 = filters(query2)

    expect(result1.skip).toBe(10) // (2-1) * 10
    expect(result1.take).toBe(10)

    expect(result2.skip).toBe(10) // (3-1) * 5
    expect(result2.take).toBe(5)
  })

  it("should handle custom orderBy and order values", () => {
    const query: QueryOptionsDTO = {
      orderBy: "name",
      order: "asc",
      page: 1,
      size: 20
    }

    const result = filters(query)

    expect(result).toEqual({
      orderBy: "name",
      order: "asc",
      skip: 0,
      take: 20,
      filter: {}
    })
  })

  it("should extract filters from additional query parameters", () => {
    const query = {
      orderBy: "createdAt",
      order: "desc" as const,
      page: 1,
      size: 10,
      name: "test",
      category: "electronics",
      status: "active"
    }

    const result = filters(query)

    expect(result).toEqual({
      orderBy: "createdAt",
      order: "desc",
      skip: 0,
      take: 10,
      filter: {
        name: "test",
        category: "electronics",
        status: "active"
      }
    })
  })

  it("should ignore undefined filter values", () => {
    const query = {
      orderBy: "createdAt",
      order: "desc" as const,
      page: 1,
      size: 10,
      name: "test",
      category: undefined,
      status: "active",
      description: undefined
    }

    const result = filters(query)

    expect(result).toEqual({
      orderBy: "createdAt",
      order: "desc",
      skip: 0,
      take: 10,
      filter: {
        name: "test",
        status: "active"
      }
    })
  })

  it("should handle empty string as valid filter value", () => {
    const query = {
      orderBy: "createdAt",
      order: "desc" as const,
      page: 1,
      size: 10,
      name: "",
      category: "electronics"
    }

    const result = filters(query)

    expect(result).toEqual({
      orderBy: "createdAt",
      order: "desc",
      skip: 0,
      take: 10,
      filter: {
        name: "",
        category: "electronics"
      }
    })
  })

  it("should handle query with only pagination parameters", () => {
    const query: QueryOptionsDTO = {
      orderBy: "id",
      order: "asc",
      page: 5,
      size: 25
    }

    const result = filters(query)

    expect(result).toEqual({
      orderBy: "id",
      order: "asc",
      skip: 100, // (5-1) * 25
      take: 25,
      filter: {}
    })
  })

  it("should work with typed filters", () => {
    type ProductFilter = {
      name: string
      category: string
      price: string
    }

    const query = {
      orderBy: "createdAt",
      order: "desc" as const,
      page: 1,
      size: 10,
      name: "laptop",
      category: "electronics"
    }

    const result = filters<ProductFilter>(query)

    expect(result.filter).toEqual({
      name: "laptop",
      category: "electronics"
    })
    expect(result.orderBy).toBe("createdAt")
    expect(result.order).toBe("desc")
  })

  it("should handle large page numbers correctly", () => {
    const query: QueryOptionsDTO = {
      orderBy: "createdAt",
      order: "desc",
      page: 100,
      size: 50
    }

    const result = filters(query)

    expect(result.skip).toBe(4950) // (100-1) * 50
    expect(result.take).toBe(50)
  })

  it("should handle page 1 edge case", () => {
    const query: QueryOptionsDTO = {
      orderBy: "createdAt",
      order: "desc",
      page: 1,
      size: 1
    }

    const result = filters(query)

    expect(result.skip).toBe(0) // (1-1) * 1
    expect(result.take).toBe(1)
  })

  it("should preserve all filter properties with mixed data types as strings", () => {
    const query = {
      orderBy: "createdAt",
      order: "desc" as const,
      page: 2,
      size: 15,
      userId: "123",
      isActive: "true",
      count: "5"
    }

    const result = filters(query)

    expect(result).toEqual({
      orderBy: "createdAt",
      order: "desc",
      skip: 15, // (2-1) * 15
      take: 15,
      filter: {
        userId: "123",
        isActive: "true",
        count: "5"
      }
    })
  })

  it("should handle null values in filter (treated as string)", () => {
    const query = {
      orderBy: "createdAt",
      order: "desc" as const,
      page: 1,
      size: 10,
      name: null as unknown as string, // null will be treated as string
      category: "electronics"
    }

    const result = filters(query)

    expect(result.filter).toEqual({
      name: null,
      category: "electronics"
    })
  })
})
