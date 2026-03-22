import { getM2MToken } from "./m2mTokenCache";


/**
 * Custom fetch function to make API calls with common configurations.
 * @param endpoint API endpoint to be appended to the base URL.
 * @param options Fetch options including method, headers, body, etc.
 * @param isPrivate Boolean indicating if the request is to a private API route (requires Authorization header).
 * @returns The response data of type T.
 */
export async function customFetchBaseAPI<T>(
  endpoint: string,
  options: RequestInit = {},
  isPrivate: boolean = true,
): Promise<T> {
  const m2mToken = await getM2MToken();
  const headers: HeadersInit = {
    // "Content-Type": "application/json",
    ...(isPrivate && m2mToken && { Authorization: `Bearer ${m2mToken}` }),
    ...options.headers,
  };

  const fetchOptions: RequestInit = {
    cache: "no-store",
    ...options,
    headers,
  };

  const baseUrl = process.env.API_URL!;
  const url = `${baseUrl}/api-base-service${endpoint}`;

  try {
    const response = await fetch(url, fetchOptions);
    //console.log(response)
    const contentType = response.headers.get("content-type");

    let data;
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const message = response.statusText || `Erro ${response.status}`;
      //console.log({ message, response });
      const apiError = new Error(message);
      (apiError as any).status = response.status;
      (apiError as any).data = data;
      throw apiError;
    }

    return data as T;
  } catch (error) {
    return Promise.reject(error);
  }
}
