/**
 * Global API Domain & Endpoints Configuration
 *
 * Supports dynamic switching between environments (dev, staging, prod)
 * via the UI dropdown in App.tsx or persisted in localStorage.
 */

export type ApiEnvironment = 'dev' | 'staging' | 'prod';

export const ENV_BASE_URLS: Record<ApiEnvironment, string> = {
  dev: 'https://dev.abotribe.com',
  staging: 'https://staging.abotribe.com',
  prod: 'https://admin.abotribe.com',
};

const STORAGE_KEY = 'abo_api_env';

/**
 * Gets the currently active API environment.
 * Priority: localStorage -> VITE_API_BASE_URL -> default ('dev')
 */
export const getApiEnvironment = (): ApiEnvironment => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY) as ApiEnvironment | null;
    if (saved && ENV_BASE_URLS[saved]) {
      return saved;
    }
  }

  const envUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
  if (envUrl) {
    if (envUrl.includes('dev.abotribe.com')) return 'dev';
    if (envUrl.includes('staging.abotribe.com')) return 'staging';
    if (envUrl.includes('admin.abotribe.com')) return 'prod';
  }

  return 'dev';
};

/**
 * Gets the current base URL according to the active environment.
 */
export const getApiBaseUrl = (): string => {
  const env = getApiEnvironment();
  return ENV_BASE_URLS[env] || ENV_BASE_URLS.dev;
};

/**
 * Exported API_BASE_URL for backward compatibility.
 * Keeps dynamically updated via setApiEnvironment.
 */
export let API_BASE_URL = getApiBaseUrl();

/**
 * Sets the active API environment and updates localStorage.
 */
export const setApiEnvironment = (env: ApiEnvironment): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, env);
  }
  API_BASE_URL = ENV_BASE_URLS[env] || ENV_BASE_URLS.dev;
};

/**
 * Builds a full API URL given a path relative to the base domain.
 * Evaluates dynamically based on the current environment.
 * @param path - The API endpoint path (e.g. '/api/method/...')
 */
export const getApiUrl = (path: string): string => {
  const base = getApiBaseUrl().replace(/\/+$/, '');
  const endpoint = path.startsWith('/') ? path : `/${path}`;
  return `${base}${endpoint}`;
};

/**
 * Centralized list of API endpoints.
 * Dynamic getters ensure the current environment base URL is always used.
 */
export const API_ENDPOINTS = {
  // Bar onboarding endpoint
  get onboardBar(): string {
    return getApiUrl('/api/method/abo.api.bar_details.onboard_bar');
  },

  // Bar features endpoint
  get getFeatures(): string {
    return getApiUrl('/api/method/abo.api.utils.get_features');
  },
};
