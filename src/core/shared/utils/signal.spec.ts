/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from "axios"

import { Warning } from "@/core/infra/warning"

import { signal } from "./signal"

// Mock the Warning class
jest.mock("@/core/infra/warning", () => {
  return {
    Warning: jest.fn().mockImplementation((message: string, status: number) => {
      const error = new Error(message) as any
      error.status = status
      error.message = [message]
      return error
    })
  }
})

describe("signal utility function", () => {
  let mockAxiosInstance: { request: jest.Mock }
  let mockAbortController: {
    abort: jest.Mock
    signal: { aborted: boolean }
  }

  beforeEach(() => {
    jest.clearAllMocks()

    // Create simple mock objects
    mockAxiosInstance = {
      request: jest.fn()
    }

    mockAbortController = {
      abort: jest.fn(),
      signal: {
        aborted: false
      }
    }

    // Reset signal state
    mockAbortController.signal.aborted = false

    // Mock AbortController constructor
    global.AbortController = jest.fn(() => mockAbortController) as any

    // Mock timers with spy functions
    jest.spyOn(global, "setTimeout").mockImplementation(() => 123 as any)
    jest.spyOn(global, "clearTimeout").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe("Successful requests", () => {
    it("should return response data on successful request", async () => {
      const mockResponseData = { id: 1, name: "Test User" }
      const mockResponse = {
        data: mockResponseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/users/1"
      }

      const result = await signal(mockAxiosInstance as any, config)

      expect(result).toEqual(mockResponseData)
      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        ...config,
        signal: mockAbortController.signal
      })
    })

    it("should use default timeout of 30000ms", async () => {
      const mockResponseData = { success: true }
      const mockResponse = {
        data: mockResponseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/test"
      }

      const resultPromise = signal(mockAxiosInstance as any, config)

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 30000)

      await resultPromise
    })

    it("should use custom timeout", async () => {
      const mockResponseData = { data: "test" }
      const mockResponse = {
        data: mockResponseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/test"
      }

      const customOptions = {
        timeout: 15000,
        timeoutErrorMessage: "Custom timeout"
      }

      const resultPromise = signal(mockAxiosInstance as any, config, customOptions)

      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 15000)

      const result = await resultPromise
      expect(result).toEqual(mockResponseData)
    })

    it("should clear timeout on successful request", async () => {
      const mockResponseData = { success: true }
      const mockResponse = {
        data: mockResponseData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/test"
      }

      await signal(mockAxiosInstance as any, config)

      expect(clearTimeout).toHaveBeenCalled()
    })
  })

  describe("Timeout handling", () => {
    it("should throw Warning when request times out", async () => {
      const timeoutSpy = jest.spyOn(global, "setTimeout").mockImplementation((callback: any) => {
        // Call the timeout callback immediately to simulate timeout
        callback()
        // Set the signal as aborted when timeout occurs
        mockAbortController.signal.aborted = true
        return 123 as any
      })

      mockAxiosInstance.request.mockImplementation(() => {
        return Promise.reject(new Error("Request aborted"))
      })

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/slow"
      }

      await expect(signal(mockAxiosInstance as any, config)).rejects.toThrow()

      expect(Warning).toHaveBeenCalledWith("Request timed out", 503)
      expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 30000)
    })

    it("should throw Warning with custom timeout message", async () => {
      const timeoutSpy = jest.spyOn(global, "setTimeout").mockImplementation((callback: any) => {
        // Call the timeout callback immediately to simulate timeout
        callback()
        // Set the signal as aborted when timeout occurs
        mockAbortController.signal.aborted = true
        return 123 as any
      })

      mockAxiosInstance.request.mockImplementation(() => {
        return Promise.reject(new Error("Request aborted"))
      })

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/slow"
      }

      const customOptions = {
        timeout: 5000,
        timeoutErrorMessage: "Custom timeout exceeded"
      }

      await expect(signal(mockAxiosInstance as any, config, customOptions)).rejects.toThrow()

      expect(Warning).toHaveBeenCalledWith("Custom timeout exceeded", 503)
      expect(timeoutSpy).toHaveBeenCalledWith(expect.any(Function), 5000)
    })

    it("should call abort when timeout occurs", async () => {
      jest.spyOn(global, "setTimeout").mockImplementation((callback: any) => {
        // Call the timeout callback immediately to simulate timeout
        callback()
        // Set the signal as aborted when timeout occurs
        mockAbortController.signal.aborted = true
        return 123 as any
      })

      mockAxiosInstance.request.mockImplementation(() => {
        return Promise.reject(new Error("Request aborted"))
      })

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/timeout"
      }

      try {
        await signal(mockAxiosInstance as any, config)
      } catch (error) {
        // Expected to throw
      }

      expect(mockAbortController.abort).toHaveBeenCalled()
    })
  })

  describe("Error handling", () => {
    it("should propagate non-timeout errors", async () => {
      const networkError = new Error("Network Error")
      mockAxiosInstance.request.mockRejectedValue(networkError)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/error"
      }

      await expect(signal(mockAxiosInstance as any, config)).rejects.toThrow("Network Error")
    })

    it("should handle axios errors with response", async () => {
      const axiosError = {
        response: {
          status: 404,
          data: { message: "Not Found" }
        },
        isAxiosError: true
      }

      mockAxiosInstance.request.mockRejectedValue(axiosError)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/notfound"
      }

      await expect(signal(mockAxiosInstance as any, config)).rejects.toEqual(axiosError)
    })

    it("should clear timeout even when error occurs", async () => {
      const error = new Error("Some error")
      mockAxiosInstance.request.mockRejectedValue(error)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/error"
      }

      try {
        await signal(mockAxiosInstance as any, config)
      } catch (err) {
        // Expected to throw
      }

      expect(clearTimeout).toHaveBeenCalled()
    })
  })

  describe("Edge cases", () => {
    it("should handle null response data", async () => {
      const mockResponse = {
        data: null,
        status: 204,
        statusText: "No Content",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "DELETE",
        url: "/api/resource/1"
      }

      const result = await signal(mockAxiosInstance as any, config)

      expect(result).toBeNull()
    })

    it("should handle undefined response data", async () => {
      const mockResponse = {
        data: undefined,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/empty"
      }

      const result = await signal(mockAxiosInstance as any, config)

      expect(result).toBeUndefined()
    })

    it("should handle complex response data", async () => {
      const complexData = {
        users: [
          { id: 1, name: "User 1", active: true },
          { id: 2, name: "User 2", active: false }
        ],
        pagination: {
          page: 1,
          total: 2,
          hasNext: false
        }
      }

      const mockResponse = {
        data: complexData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/users"
      }

      const result: any = await signal(mockAxiosInstance as any, config)

      expect(result).toEqual(complexData)
      expect(result.users).toHaveLength(2)
      expect(result.pagination.total).toBe(2)
    })

    it("should work with zero timeout", async () => {
      const mockResponse = {
        data: { instant: true },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/instant"
      }

      const options = { timeout: 0, timeoutErrorMessage: "No timeout" }

      const result = await signal(mockAxiosInstance as any, config, options)

      expect(result).toEqual({ instant: true })
      expect(setTimeout).toHaveBeenCalledWith(expect.any(Function), 0)
    })
  })

  describe("TypeScript generics", () => {
    type User = {
      id: number
      name: string
      email: string
    }

    it("should work with typed responses", async () => {
      const userData: User = {
        id: 1,
        name: "John Doe",
        email: "john@example.com"
      }

      const mockResponse = {
        data: userData,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "GET",
        url: "/api/users/1"
      }

      const result = await signal<User>(mockAxiosInstance as any, config)

      expect(result).toEqual(userData)
      expect((result as any).id).toBe(1)
      expect((result as any).name).toBe("John Doe")
      expect((result as any).email).toBe("john@example.com")
    })
  })

  describe("Request configuration", () => {
    it("should preserve all request configuration properties", async () => {
      const mockResponse = {
        data: { success: true },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const config: AxiosRequestConfig = {
        method: "POST",
        url: "/api/users",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer token123"
        },
        data: { name: "John Doe", email: "john@example.com" },
        params: { include: "profile" },
        timeout: 5000,
        baseURL: "https://api.example.com"
      }

      await signal(mockAxiosInstance as any, config)

      expect(mockAxiosInstance.request).toHaveBeenCalledWith({
        ...config,
        signal: mockAbortController.signal
      })
    })

    it("should add signal to existing config without overwriting other properties", async () => {
      const mockResponse = {
        data: { result: "success" },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {}
      }

      mockAxiosInstance.request.mockResolvedValue(mockResponse)

      const originalConfig: AxiosRequestConfig = {
        method: "PUT",
        url: "/api/resource/123",
        data: { name: "Updated Name" },
        headers: { "X-Custom-Header": "custom-value" }
      }

      await signal(mockAxiosInstance as any, originalConfig)

      const expectedConfig = {
        ...originalConfig,
        signal: mockAbortController.signal
      }

      expect(mockAxiosInstance.request).toHaveBeenCalledWith(expectedConfig)
    })
  })
})
