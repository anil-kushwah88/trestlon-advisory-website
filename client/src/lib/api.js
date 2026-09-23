export const API_URL =
  import.meta.env.VITE_API_URL ||
  'https://trestlon-advisory-website-bm5f.vercel.app';

const TOKEN_KEY = 'trustlon_admin_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);

export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

/**
 * Thin fetch wrapper used across the public site and admin panel.
 * Pass auth: true to attach the admin bearer token.
 */
export async function api(
  path,
  { method = 'GET', body, auth = false } = {}
) {
  const headers = {};

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = getToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(
      data.errors?.[0]?.message ||
        data.message ||
        'Request failed'
    );

    err.status = res.status;
    err.errors = data.errors;

    throw err;
  }

  return data;
}
