const BASE = '/api';

const request = async <T>(
  path: string,
  init?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? res.statusText);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
};

export const createNode = (username: string) =>
  request<void>('/node', {
    method: 'POST',
    body: JSON.stringify({ username }),
  });

export const getNode = (username: string) =>
  request<import('@/types/api').AccountResponse>(`/node/${encodeURIComponent(username)}`);

export const createRelationship = (start: string, end: string) =>
  request<void>('/relationship', {
    method: 'POST',
    body: JSON.stringify({ start, end }),
  });

export const getGraph = () =>
  request<import('@/types/api').GraphResponse>('/graph');
