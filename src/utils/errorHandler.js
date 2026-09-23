/**
 * Error handler utility for consistent error management
 */

const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: "Unable to connect. Please check your internet connection.",
  TIMEOUT: "Request timed out. Please try again.",
  CORS_ERROR: "Connection blocked. Please check CORS settings.",

  // API errors
  INVALID_INPUT: "Please check your input and try again.",
  API_UNAVAILABLE: "Service is temporarily unavailable. Please try again later.",
  UNAUTHORIZED: "Please log in to continue.",
  FORBIDDEN: "You don't have permission to access this resource.",
  NOT_FOUND: "The requested resource was not found.",

  // Healthcare-specific
  NO_SYMPTOMS: "Please describe at least 3 symptoms before getting a diagnosis.",
  INVALID_SYMPTOMS: "Unable to recognize symptoms. Please try different descriptions.",
  DIAGNOSIS_FAILED: "Unable to generate diagnosis. Please try again.",
  LOCATION_REQUIRED: "Please provide your location to find nearby hospitals.",
  INVALID_LOCATION: "Unable to recognize location. Please try again.",
  NO_HOSPITALS_FOUND: "No hospitals found in the specified area.",

  // Validation
  MISSING_FIELD: "Please fill in all required fields.",
  INVALID_EMAIL: "Please enter a valid email address.",
  INVALID_PHONE: "Please enter a valid phone number.",

  // Generic
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  SERVER_ERROR: "Server error. Please try again later.",
};

const ERROR_CODES = {
  NETWORK: "NETWORK_ERROR",
  TIMEOUT: "TIMEOUT_ERROR",
  VALIDATION: "VALIDATION_ERROR",
  AUTHENTICATION: "AUTH_ERROR",
  PERMISSION: "PERMISSION_ERROR",
  NOT_FOUND: "NOT_FOUND",
  HEALTHCARE: "HEALTHCARE_ERROR",
  SERVER: "SERVER_ERROR",
  UNKNOWN: "UNKNOWN_ERROR",
};

/**
 * Get user-friendly error message
 */
export const getErrorMessage = (error, context = null) => {
  // Handle axios/fetch error objects
  if (error.response) {
    // Server responded with error status
    const status = error.response.status;
    const data = error.response.data || {};

    if (status === 400) {
      return data.message || ERROR_MESSAGES.INVALID_INPUT;
    }
    if (status === 401) {
      return ERROR_MESSAGES.UNAUTHORIZED;
    }
    if (status === 403) {
      return ERROR_MESSAGES.FORBIDDEN;
    }
    if (status === 404) {
      return ERROR_MESSAGES.NOT_FOUND;
    }
    if (status >= 500) {
      return ERROR_MESSAGES.SERVER_ERROR;
    }
  }

  // Handle network errors
  if (error.code === "ECONNABORTED" || error.message === "timeout") {
    return ERROR_MESSAGES.TIMEOUT;
  }
  if (error.message === "Network Error" || !navigator.onLine) {
    return ERROR_MESSAGES.NETWORK_ERROR;
  }

  // Handle custom error messages
  if (error.message && typeof error.message === "string") {
    if (error.message.toLowerCase().includes("cors")) {
      return ERROR_MESSAGES.CORS_ERROR;
    }
    if (error.message.toLowerCase().includes("symptom")) {
      return ERROR_MESSAGES.INVALID_SYMPTOMS;
    }
    if (error.message.toLowerCase().includes("location")) {
      return ERROR_MESSAGES.INVALID_LOCATION;
    }
  }

  // Healthcare-specific context
  if (context === "symptoms") {
    return ERROR_MESSAGES.INVALID_SYMPTOMS;
  }
  if (context === "hospitals") {
    return ERROR_MESSAGES.NO_HOSPITALS_FOUND;
  }
  if (context === "location") {
    return ERROR_MESSAGES.INVALID_LOCATION;
  }

  return error.message || ERROR_MESSAGES.UNKNOWN_ERROR;
};

/**
 * Categorize error for logging
 */
export const categorizeError = (error) => {
  if (!error.response && (error.code === "ECONNABORTED" || error.message === "timeout")) {
    return ERROR_CODES.TIMEOUT;
  }
  if (!error.response && !navigator.onLine) {
    return ERROR_CODES.NETWORK;
  }
  if (error.response?.status >= 500) {
    return ERROR_CODES.SERVER;
  }
  if (error.response?.status === 401) {
    return ERROR_CODES.AUTHENTICATION;
  }
  if (error.response?.status === 403) {
    return ERROR_CODES.PERMISSION;
  }
  if (error.response?.status === 404) {
    return ERROR_CODES.NOT_FOUND;
  }
  if (error.response?.status === 400) {
    return ERROR_CODES.VALIDATION;
  }
  return ERROR_CODES.UNKNOWN;
};

/**
 * Validate symptoms input
 */
export const validateSymptoms = (symptomsText) => {
  if (!symptomsText || typeof symptomsText !== "string") {
    return { valid: false, error: ERROR_MESSAGES.MISSING_FIELD };
  }

  const trimmed = symptomsText.trim();
  if (trimmed.length < 10) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_INPUT };
  }

  // Check for minimum symptoms (heuristic: at least 3 comma-separated items or natural phrases)
  const symptomCount = (trimmed.match(/,/g) || []).length + 1;
  if (symptomCount < 1) {
    return { valid: false, error: ERROR_MESSAGES.NO_SYMPTOMS };
  }

  return { valid: true };
};

/**
 * Validate location input
 */
export const validateLocation = (location) => {
  if (!location || typeof location !== "string") {
    return { valid: false, error: ERROR_MESSAGES.MISSING_FIELD };
  }

  const trimmed = location.trim();
  if (trimmed.length < 3) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_INPUT };
  }

  // Check if it's coordinates (lat,lng) or address text
  const coordinateRegex = /^-?\d+\.?\d*\s*,\s*-?\d+\.?\d*$/;
  if (!coordinateRegex.test(trimmed) && trimmed.length < 5) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_LOCATION };
  }

  return { valid: true };
};

/**
 * Log error to console and analytics
 */
export const logError = (error, context = {}) => {
  const errorCode = categorizeError(error);
  const message = getErrorMessage(error, context.type);

  console.error("Error:", {
    code: errorCode,
    message,
    context,
    error,
    timestamp: new Date().toISOString(),
  });

  // TODO: Send to analytics service (e.g., Sentry, LogRocket)
  // if (window.analytics) {
  //   window.analytics.captureException(error, { tags: { code: errorCode }, extra: context });
  // }
};

/**
 * Create structured error response
 */
export const createErrorResponse = (error, context = {}) => {
  const code = categorizeError(error);
  const message = getErrorMessage(error, context.type);

  return {
    status: "error",
    code,
    message,
    context,
    timestamp: new Date().toISOString(),
  };
};

/**
 * Retry logic with exponential backoff
 */
export const retryWithBackoff = async (fn, maxRetries = 3, initialDelay = 1000) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) throw error;

      const delay = initialDelay * Math.pow(2, attempt);
      console.warn(`Retry attempt ${attempt + 1}/${maxRetries} after ${delay}ms`, error.message);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

export default {
  getErrorMessage,
  categorizeError,
  validateSymptoms,
  validateLocation,
  logError,
  createErrorResponse,
  retryWithBackoff,
  ERROR_MESSAGES,
  ERROR_CODES,
};
