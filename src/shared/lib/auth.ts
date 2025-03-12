'use client';

// Constants for token storage keys
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

// Function to get the access token from localStorage
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// Function to get the refresh token from localStorage
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

// Function to get the user from localStorage
export const getUser = (): any | null => {
  if (typeof window === 'undefined') return null;
  const userJson = localStorage.getItem(USER_KEY);
  if (!userJson) return null;
  try {
    return JSON.parse(userJson);
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return null;
  }
};

// Function to set tokens in localStorage
export const setTokens = (accessToken: string, refreshToken: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

// Function to set user in localStorage
export const setUser = (user: any): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

// Function to clear tokens and user from localStorage
export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

// Function to check if the user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// Function to handle login success
export const handleLoginSuccess = (response: any): void => {
  const { accessToken, refreshToken, user } = response;
  setTokens(accessToken, refreshToken);
  setUser(user);
};

// Function to handle logout
export const handleLogout = (): void => {
  clearTokens();
  // Redirect to login page or home page
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}; 