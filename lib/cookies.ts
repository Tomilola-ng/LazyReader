export interface CookieOptions {
  expires?: number; // Number of days until the cookie expires (default: 1)
  path?: string; // The path for which the cookie is valid (default: '/')
  domain?: string; // The domain for which the cookie is valid (default: current domain)
  secure?: boolean; // Whether the cookie should only be sent over secure connections (default: false)
  samesite?: "Strict" | "Lax" | "None"; // The SameSite attribute for the cookie (default: 'Strict')
}

/**
 * Sets a cookie with the given name, value, and options.
 * @param name - The name of the cookie to set.
 * @param value - The value of the cookie to set.
 * @param options - Optional options for setting the cookie.
 */
function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  const {
    expires = 1,
    path = "/",
    domain,
    secure = false,
    samesite = "Strict",
  } = options;

  const cookieValue = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}`;
  const cookieOptions = [
    `path=${path}`,
    `max-age=${expires * 24 * 60 * 60}`, // Expires in the specified number of days
    domain ? `domain=${domain}` : "",
    secure ? "secure" : "",
    `samesite=${samesite}`,
  ]
    .filter(Boolean)
    .join("; ");

  document.cookie = `${cookieValue}; ${cookieOptions}`;
}

/**
 * Gets the value of the cookie with the given name.
 * @param name - The name of the cookie to get.
 * @returns The value of the cookie, or an empty string if the cookie is not found.
 */
function getCookie(name: string): string {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? decodeURIComponent(cookieValue.pop() || "") : "";
}

/**
 * Removes the cookie with the given name.
 * @param name - The name of the cookie to remove.
 * @param options - Optional options for removing the cookie.
 */
function removeCookie(name: string, options: CookieOptions = {}): void {
  const { path = "/", domain, secure = false, samesite = "Strict" } = options;

  setCookie(name, "", {
    expires: -1, // Expires the cookie immediately
    path,
    domain,
    secure,
    samesite,
  });
}

export { setCookie, getCookie, removeCookie };
