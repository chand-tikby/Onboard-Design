/**
 * Global API Domain & Endpoints Configuration
 *
 * To change the domain for all API calls across the entire project,
 * simply update `API_BASE_URL` below or specify `VITE_API_BASE_URL` in an `.env` file.
 */
export const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ||
  'https://admin.abotribe.com';

/**
 * Builds a full API URL given a path relative to the base domain.
 * @param path - The API endpoint path (e.g. '/api/method/...')
 */
export const getApiUrl = (path: string): string => {
  const base = API_BASE_URL.replace(/\/+$/, '');
  const endpoint = path.startsWith('/') ? path : `/${path}`;
  return `${base}${endpoint}`;
};

/**
 * Centralized list of API endpoints.
 * All endpoints derive from `API_BASE_URL`.
 */
export const API_ENDPOINTS = {
  // Bar onboarding endpoint
  onboardBar: getApiUrl('/api/method/abo.api.bar_details.onboard_bar'),

  // Bar features endpoint
  getFeatures: getApiUrl('/api/method/abo.api.utils.get_features'),
} as const;
