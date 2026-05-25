/**
 * Centralized fetch utility for consistent error handling
 */
export async function fetcher<T = unknown>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Get the base URL for data fetching
 */
export function getBaseUrl() {
  return import.meta.env.BASE_URL ?? "/";
}
