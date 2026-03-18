import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import * as http from "node:http"
import * as https from "node:https"

export async function signal<T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  options: {
    timeout?: number
    timeoutErrorMessage?: string
  } = {}
): Promise<T> {
  const controller = new AbortController()
  const signal = controller.signal

  const timeout = options.timeout ?? 3 * 60 * 1_000 // 3 minutes
  const timeoutErrorMessage = options.timeoutErrorMessage ?? "Request Timed Out"

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  const httpAgent = new http.Agent({
    keepAlive: true,
    timeout
  })

  const httpsAgent = new https.Agent({
    keepAlive: true,
    timeout
  })

  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      ...config,
      signal,
      timeout,
      httpAgent,
      httpsAgent
    })

    return response.data
  } catch (error) {
    if (signal.aborted) {
      throw new Error(timeoutErrorMessage)
    }

    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}
