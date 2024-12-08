// utils/cookies.ts
export function getCookie(name: string): string | undefined {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }
  return undefined;
}

export function setCookie(
  name: string,
  value: string,
  options: { path?: string; maxAge?: number } = {}
): void {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }
  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  document.cookie = cookieString;
}
