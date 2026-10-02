const API_BASE_URL =

  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8010";

export class ApiError extends Error {

  status: number;

  details: unknown;

  constructor(

    message: string,

    status: number,

    details?: unknown,

  ) {

    super(message);

    this.name = "ApiError";

    this.status = status;

    this.details = details;

  }

}

type RequestOptions = RequestInit & {

  token?: string;

};

async function request<T>(

  path: string,

  options: RequestOptions = {},

): Promise<T> {

  const { token, headers, ...fetchOptions } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {

    ...fetchOptions,

    headers: {

      Accept: "application/json",

      ...(fetchOptions.body ? { "Content-Type": "application/json" } : {}),

      ...(token

        ? {

            Authorization: `Bearer ${token}`,

          }

        : {}),

      ...headers,

    },

  });

  const contentType = response.headers.get("content-type") || "";

  let data: unknown = null;

  if (contentType.includes("application/json")) {

    data = await response.json();

  } else {

    data = await response.text();

  }

  if (!response.ok) {

    let message = `API request failed with status ${response.status}`;

    if (

      typeof data === "object" &&

      data !== null &&

      "detail" in data

    ) {

      const detail = (data as { detail?: unknown }).detail;

      if (typeof detail === "string") {

        message = detail;

      }

    }

    throw new ApiError(message, response.status, data);

  }

  return data as T;

}

export const api = {

  get<T>(path: string, options?: RequestOptions) {

    return request<T>(path, {

      ...options,

      method: "GET",

    });

  },

  post<T>(

    path: string,

    body?: unknown,

    options?: RequestOptions,

  ) {

    return request<T>(path, {

      ...options,

      method: "POST",

      body: body === undefined ? undefined : JSON.stringify(body),

    });

  },

  put<T>(

    path: string,

    body?: unknown,

    options?: RequestOptions,

  ) {

    return request<T>(path, {

      ...options,

      method: "PUT",

      body: body === undefined ? undefined : JSON.stringify(body),

    });

  },

  patch<T>(

    path: string,

    body?: unknown,

    options?: RequestOptions,

  ) {

    return request<T>(path, {

      ...options,

      method: "PATCH",

      body: body === undefined ? undefined : JSON.stringify(body),

    });

  },

  delete<T>(path: string, options?: RequestOptions) {

    return request<T>(path, {

      ...options,

      method: "DELETE",

    });

  },

};

export function getApiBaseUrl() {

  return API_BASE_URL;

}