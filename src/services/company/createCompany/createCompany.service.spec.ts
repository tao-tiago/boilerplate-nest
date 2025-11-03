import { Test, TestingModule } from "@nestjs/testing"
import { TypeCompany } from "@prisma/client"

import { CompanyRepository } from "@/repositories/company/company.repository"

import { CreateCompanyDTO } from "./createCompany.dto"
import { CreateCompanyService } from "./createCompany.service"

describe("CreateCompanyService", () => {
  let service: CreateCompanyService
  let companyRepository: jest.Mocked<CompanyRepository>

  const mockCompanyRepository = {
    create: jest.fn(),
    list: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCompanyService,
        {
          provide: CompanyRepository,
          useValue: mockCompanyRepository
        }
      ]
    }).compile()

    service = module.get<CreateCompanyService>(CreateCompanyService)
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
    it("should create a company with valid MEI type", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Test Company MEI",
        typeCompany: TypeCompany.MEI
      }

      companyRepository.create.mockResolvedValue(undefined)

      await service.execute(createCompanyDTO)

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO)
    })

    it("should create a company with valid LTDA type", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Test Company LTDA",
        typeCompany: TypeCompany.LTDA
      }

      companyRepository.create.mockResolvedValue(undefined)

      await service.execute(createCompanyDTO)

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO)
    })

    it("should create a company with minimum required fields", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Minimal Company",
        typeCompany: TypeCompany.MEI
      }

      companyRepository.create.mockResolvedValue(undefined)

      await service.execute(createCompanyDTO)

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO)
    })

    it("should handle company name with special characters", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Test & Associates - Ltda. (Branch #1)",
        typeCompany: TypeCompany.LTDA
      }

      companyRepository.create.mockResolvedValue(undefined)

      await service.execute(createCompanyDTO)

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO)
    })

    it("should handle long company names", async () => {
      const longCompanyName = "A".repeat(255) // Very long company name
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: longCompanyName,
        typeCompany: TypeCompany.MEI
      }

      companyRepository.create.mockResolvedValue(undefined)

      await service.execute(createCompanyDTO)

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO)
    })

    it("should propagate repository errors", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Test Company",
        typeCompany: TypeCompany.MEI
      }

      const repositoryError = new Error("Database connection failed")
      companyRepository.create.mockRejectedValue(repositoryError)

      await expect(service.execute(createCompanyDTO)).rejects.toThrow("Database connection failed")

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO)
    })

    it("should handle Prisma validation errors", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Test Company",
        typeCompany: TypeCompany.LTDA
      }

      const prismaError = new Error("Invalid data provided")
      companyRepository.create.mockRejectedValue(prismaError)

      await expect(service.execute(createCompanyDTO)).rejects.toThrow("Invalid data provided")

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
    })

    it("should handle database constraint violations", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Duplicate Company",
        typeCompany: TypeCompany.MEI
      }

      const constraintError = new Error("Unique constraint violation")
      companyRepository.create.mockRejectedValue(constraintError)

      await expect(service.execute(createCompanyDTO)).rejects.toThrow("Unique constraint violation")

      expect(companyRepository.create).toHaveBeenCalledTimes(1)
    })

    it("should not modify the input payload", async () => {
      const originalPayload: CreateCompanyDTO = {
        corporateName: "Original Company",
        typeCompany: TypeCompany.MEI
      }

      // Create a deep copy to compare later
      const payloadCopy = JSON.parse(JSON.stringify(originalPayload))

      companyRepository.create.mockResolvedValue(undefined)

      await service.execute(originalPayload)

      // Verify the original payload wasn't modified
      expect(originalPayload).toEqual(payloadCopy)
      expect(companyRepository.create).toHaveBeenCalledWith(originalPayload)
    })

    it("should work with different TypeCompany enum values", async () => {
      const testCases = [
        {
          corporateName: "MEI Company",
          typeCompany: TypeCompany.MEI
        },
        {
          corporateName: "LTDA Company",
          typeCompany: TypeCompany.LTDA
        }
      ]

      companyRepository.create.mockResolvedValue(undefined)

      for (const testCase of testCases) {
        await service.execute(testCase)
      }

      expect(companyRepository.create).toHaveBeenCalledTimes(2)
      expect(companyRepository.create).toHaveBeenNthCalledWith(1, testCases[0])
      expect(companyRepository.create).toHaveBeenNthCalledWith(2, testCases[1])
    })

    it("should handle concurrent executions", async () => {
      const createCompanyDTO1: CreateCompanyDTO = {
        corporateName: "Concurrent Company 1",
        typeCompany: TypeCompany.MEI
      }

      const createCompanyDTO2: CreateCompanyDTO = {
        corporateName: "Concurrent Company 2",
        typeCompany: TypeCompany.LTDA
      }

      companyRepository.create.mockResolvedValue(undefined)

      // Execute both calls concurrently
      await Promise.all([service.execute(createCompanyDTO1), service.execute(createCompanyDTO2)])

      expect(companyRepository.create).toHaveBeenCalledTimes(2)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO1)
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO2)
    })

    it("should complete execution without returning a value", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Test Company",
        typeCompany: TypeCompany.MEI
      }

      companyRepository.create.mockResolvedValue(undefined)

      const result = await service.execute(createCompanyDTO)

      expect(result).toBeUndefined()
      expect(companyRepository.create).toHaveBeenCalledTimes(1)
    })
  })

  describe("Integration scenarios", () => {
    it("should handle repository method returning void", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Void Return Company",
        typeCompany: TypeCompany.LTDA
      }

      // Mock repository to return void (which is undefined)
      companyRepository.create.mockImplementation(() => Promise.resolve())

      await expect(service.execute(createCompanyDTO)).resolves.not.toThrow()
      expect(companyRepository.create).toHaveBeenCalledWith(createCompanyDTO)
    })

    it("should properly pass through all DTO properties", async () => {
      const createCompanyDTO: CreateCompanyDTO = {
        corporateName: "Complete DTO Company",
        typeCompany: TypeCompany.MEI
      }

      companyRepository.create.mockResolvedValue(undefined)

      await service.execute(createCompanyDTO)

      const calledWith = companyRepository.create.mock.calls[0][0]
      expect(calledWith).toHaveProperty("corporateName", "Complete DTO Company")
      expect(calledWith).toHaveProperty("typeCompany", TypeCompany.MEI)
      expect(Object.keys(calledWith)).toHaveLength(2)
    })
  })
})
