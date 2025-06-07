import { COOKIES } from '@/constants'
import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import { getCookie } from 'cookies-next/client'
import * as rax from 'retry-axios'

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const defaultConfig: CreateAxiosDefaults<any> = {
	timeout: 30 * 1000, // 30 seconds
	// withCredentials: true,
	raxConfig: {
		// Retry 3 times on requests that return a response (500, etc) before giving up.  Defaults to 3.
		retry: 3,

		// Retry twice on errors that don't return a response (ENOTFOUND, ETIMEDOUT, etc).
		// 'noResponseRetries' is limited by the 'retry' value.
		noResponseRetries: 2,

		// Milliseconds to delay at first.  Defaults to 100. Only considered when backoffType is 'static'
		retryDelay: 100,

		// HTTP methods to automatically retry.  Defaults to:
		// ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT']
		httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],

		// The response status codes to retry.  Supports a double
		// array with a list of ranges.  Defaults to:
		// [[100, 199], [429, 429], [500, 599]]
		statusCodesToRetry: [
			[100, 199],
			[429, 429],
			[500, 599],
		],

		// You can set the backoff type.
		// options are 'exponential' (default), 'static' or 'linear'
		backoffType: 'exponential',
	},
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function isAuthError(error: any) {
	return error.response?.status === 401 || error.response?.data?.status === 401
}

function addResponseInterceptor(instance: AxiosInstance) {
	instance.interceptors.request.use(
		(config) => {
			const jwt = getCookie(COOKIES.JWT)

			if (jwt) {
				config.headers.Authorization = `Bearer ${jwt}`
			}
			return config
		},
		(error) => {
			return Promise.reject(error)
		},
	)
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function createAxiosInstance(config: CreateAxiosDefaults<any> = defaultConfig) {
	const instance = axios.create(config)
	addResponseInterceptor(instance)

	rax.attach(instance)

	return instance
}

const customAxiosInstance = createAxiosInstance()

export * from 'axios'
export default customAxiosInstance
