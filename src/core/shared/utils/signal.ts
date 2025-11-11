import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import { Warning } from "@/core/infra/warning"

export async function signal<T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  options = {
    timeout: 30000,
    timeoutErrorMessage: "Request timed out"
  }
): Promise<T> {
  const controller = new AbortController()
  const signal = controller.signal

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, options.timeout)

  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      ...config,
      signal
    })

    return response.data
  } catch (error) {
    if (signal.aborted) {
      throw new Warning(options.timeoutErrorMessage, 503)
    }

    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}
