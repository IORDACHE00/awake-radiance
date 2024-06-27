export function queryBuilder(
  endpoint: string,
  params: Record<string, string | number | boolean>
): string {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const url = new URL(`${BASE_URL}/${endpoint}`);

  Object.keys(params).forEach((key) => {
    const value = params[key].toString().trim();
    if (value !== "") {
      url.searchParams.append(key, value);
    }
  });

  return url.toString();
}
