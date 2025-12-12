import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

import { Warning } from "@/core/infra/log/warning.class"

type SignalOptions = {
  timeout?: number
  timeoutErrorMessage?: string
}

export async function signal<T>(
  instance: AxiosInstance,
  config: AxiosRequestConfig,
  options: SignalOptions = {}
): Promise<T> {
  const controller = new AbortController()
  const signal = controller.signal

  const timeout = options.timeout ?? 30000
  const timeoutErrorMessage = options.timeoutErrorMessage ?? "Request timed out"

  const timeoutId = setTimeout(() => {
    controller.abort()
  }, timeout)

  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      ...config,
      signal
    })

    return response.data
  } catch (error) {
    if (signal.aborted) {
      throw new Warning(timeoutErrorMessage, 503, { message: "HTTP Timeout Error" })
    }

    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}
