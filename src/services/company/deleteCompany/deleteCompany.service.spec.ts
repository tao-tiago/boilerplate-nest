import { NotFoundException } from "@nestjs/common"
import { Test, TestingModule } from "@nestjs/testing"
import { TypeCompany } from "@prisma/client"

import { QueryId } from "@/core/shared/helpers/query-options.dto"
import { CompanyRepository } from "@/repositories/company/company.repository"

import { DeleteCompanyService } from "./deleteCompany.service"

describe("DeleteCompanyService", () => {
  let service: DeleteCompanyService
  let companyRepository: jest.Mocked<CompanyRepository>

  const mockCompanyRepository = {
    create: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn()
  }

  const mockCompany = {
    id: "550e8400-e29b-41d4-a716-446655440000",
    corporateName: "Test Company",
    typeCompany: TypeCompany.MEI,
    createdAt: new Date("2025-01-01T10:00:00Z")
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCompanyService,
        {
          provide: CompanyRepository,
          useValue: mockCompanyRepository
        }
      ]
    }).compile()

    service = module.get<DeleteCompanyService>(DeleteCompanyService)
    companyRepository = module.get(CompanyRepository)

    // Reset all mocks before each test
    jest.clearAllMocks()
  })

  describe("Service Initialization", () => {
    it("should be defined", () => {
      expect(service).toBeDefined()
    })

    it("should have companyRepository injected", () => {
      expect(companyRepository).toBeDefined()
    })
  })

  describe("execute", () => {
    it("should successfully delete an existing company", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(mockCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      await service.execute(queryId)

      expect(companyRepository.findById).toHaveBeenCalledTimes(1)
      expect(companyRepository.findById).toHaveBeenCalledWith(queryId.id)
      expect(companyRepository.delete).toHaveBeenCalledTimes(1)
      expect(companyRepository.delete).toHaveBeenCalledWith(queryId.id)
    })

    it("should throw NotFoundException when company does not exist", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(null)

      await expect(service.execute(queryId)).rejects.toThrow(NotFoundException)
      await expect(service.execute(queryId)).rejects.toThrow("Company not found")

      expect(companyRepository.findById).toHaveBeenCalledTimes(2)
      expect(companyRepository.findById).toHaveBeenCalledWith(queryId.id)
      expect(companyRepository.delete).not.toHaveBeenCalled()
    })

    it("should throw NotFoundException when company is undefined", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(null)

      await expect(service.execute(queryId)).rejects.toThrow(NotFoundException)
      await expect(service.execute(queryId)).rejects.toThrow("Company not found")

      expect(companyRepository.findById).toHaveBeenCalledTimes(2)
      expect(companyRepository.delete).not.toHaveBeenCalled()
    })

    it("should handle valid UUID formats", async () => {
      const validUUIDs = [
        "550e8400-e29b-41d4-a716-446655440000",
        "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
        "123e4567-e89b-12d3-a456-426614174000"
      ]

      for (const uuid of validUUIDs) {
        const queryId: QueryId = { id: uuid }

        companyRepository.findById.mockResolvedValue(mockCompany)
        companyRepository.delete.mockResolvedValue(undefined)

        await service.execute(queryId)

        expect(companyRepository.findById).toHaveBeenCalledWith(uuid)
        expect(companyRepository.delete).toHaveBeenCalledWith(uuid)
      }

      expect(companyRepository.findById).toHaveBeenCalledTimes(validUUIDs.length)
      expect(companyRepository.delete).toHaveBeenCalledTimes(validUUIDs.length)
    })

    it("should propagate repository errors from findById", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      const repositoryError = new Error("Database connection failed")
      companyRepository.findById.mockRejectedValue(repositoryError)

      await expect(service.execute(queryId)).rejects.toThrow("Database connection failed")

      expect(companyRepository.findById).toHaveBeenCalledTimes(1)
      expect(companyRepository.delete).not.toHaveBeenCalled()
    })

    it("should propagate repository errors from delete", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      const deleteError = new Error("Foreign key constraint violation")
      companyRepository.findById.mockResolvedValue(mockCompany)
      companyRepository.delete.mockRejectedValue(deleteError)

      await expect(service.execute(queryId)).rejects.toThrow("Foreign key constraint violation")

      expect(companyRepository.findById).toHaveBeenCalledTimes(1)
      expect(companyRepository.delete).toHaveBeenCalledTimes(1)
    })

    it("should handle companies with different types (MEI)", async () => {
      const meiCompany = {
        ...mockCompany,
        typeCompany: TypeCompany.MEI
      }

      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(meiCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      await service.execute(queryId)

      expect(companyRepository.findById).toHaveBeenCalledWith(queryId.id)
      expect(companyRepository.delete).toHaveBeenCalledWith(queryId.id)
    })

    it("should handle companies with different types (LTDA)", async () => {
      const ltdaCompany = {
        ...mockCompany,
        typeCompany: TypeCompany.LTDA
      }

      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(ltdaCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      await service.execute(queryId)

      expect(companyRepository.findById).toHaveBeenCalledWith(queryId.id)
      expect(companyRepository.delete).toHaveBeenCalledWith(queryId.id)
    })

    it("should not modify the input query object", async () => {
      const originalQueryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      // Create a deep copy to compare later
      const queryIdCopy = JSON.parse(JSON.stringify(originalQueryId))

      companyRepository.findById.mockResolvedValue(mockCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      await service.execute(originalQueryId)

      // Verify the original query wasn't modified
      expect(originalQueryId).toEqual(queryIdCopy)
    })

    it("should complete execution without returning a value", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(mockCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      const result = await service.execute(queryId)

      expect(result).toBeUndefined()
    })

    it("should handle concurrent deletions", async () => {
      const queryId1: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }
      const queryId2: QueryId = {
        id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8"
      }

      companyRepository.findById.mockResolvedValue(mockCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      // Execute both calls concurrently
      await Promise.all([service.execute(queryId1), service.execute(queryId2)])

      expect(companyRepository.findById).toHaveBeenCalledTimes(2)
      expect(companyRepository.delete).toHaveBeenCalledTimes(2)
      expect(companyRepository.findById).toHaveBeenCalledWith(queryId1.id)
      expect(companyRepository.findById).toHaveBeenCalledWith(queryId2.id)
      expect(companyRepository.delete).toHaveBeenCalledWith(queryId1.id)
      expect(companyRepository.delete).toHaveBeenCalledWith(queryId2.id)
    })
  })

  describe("Error handling edge cases", () => {
    it("should handle repository returning falsy values", async () => {
      const falsyValues = [null, undefined, false, 0, ""]
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      for (const falsyValue of falsyValues) {
        companyRepository.findById.mockResolvedValue(falsyValue as never)

        await expect(service.execute(queryId)).rejects.toThrow(NotFoundException)
        expect(companyRepository.delete).not.toHaveBeenCalled()
      }

      expect(companyRepository.findById).toHaveBeenCalledTimes(falsyValues.length)
    })

    it("should handle database timeout errors", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      const timeoutError = new Error("Connection timeout")
      companyRepository.findById.mockRejectedValue(timeoutError)

      await expect(service.execute(queryId)).rejects.toThrow("Connection timeout")

      expect(companyRepository.findById).toHaveBeenCalledTimes(1)
      expect(companyRepository.delete).not.toHaveBeenCalled()
    })

    it("should handle cascading delete constraints", async () => {
      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(mockCompany)

      const cascadeError = new Error("Cannot delete company with existing products")
      companyRepository.delete.mockRejectedValue(cascadeError)

      await expect(service.execute(queryId)).rejects.toThrow("Cannot delete company with existing products")

      expect(companyRepository.findById).toHaveBeenCalledTimes(1)
      expect(companyRepository.delete).toHaveBeenCalledTimes(1)
    })
  })

  describe("Integration scenarios", () => {
    it("should work with minimal company object", async () => {
      const minimalCompany = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        corporateName: "Minimal Corp",
        typeCompany: TypeCompany.MEI,
        createdAt: new Date()
      }

      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(minimalCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      await expect(service.execute(queryId)).resolves.not.toThrow()

      expect(companyRepository.findById).toHaveBeenCalledWith(queryId.id)
      expect(companyRepository.delete).toHaveBeenCalledWith(queryId.id)
    })

    it("should work with company object containing extra properties", async () => {
      const extendedCompany = {
        ...mockCompany,
        extraProperty: "extra value",
        anotherField: 123
      }

      const queryId: QueryId = {
        id: "550e8400-e29b-41d4-a716-446655440000"
      }

      companyRepository.findById.mockResolvedValue(extendedCompany)
      companyRepository.delete.mockResolvedValue(undefined)

      await expect(service.execute(queryId)).resolves.not.toThrow()

      expect(companyRepository.findById).toHaveBeenCalledWith(queryId.id)
      expect(companyRepository.delete).toHaveBeenCalledWith(queryId.id)
    })
  })
})
