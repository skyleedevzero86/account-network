const BASE = '/api';

const BACKEND_UNREACHABLE =
  '백엔드가 실행 중이 아닙니다. 포트 8080에서 백엔드를 실행한 뒤 다시 시도하세요.';

function toMessage(e: unknown, fallback: string): string {
  if (e instanceof TypeError && (e.message === 'Failed to fetch' || e.message.includes('fetch')))
    return BACKEND_UNREACHABLE;
  if (e instanceof Error) return e.message;
  return fallback;
}

const request = async <T>(path: string, init?: RequestInit): Promise<T> => {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { 'Content-Type': 'application/json', ...init?.headers },
      ...init,
    });
  } catch (e) {
    throw new Error(toMessage(e, '네트워크 오류가 발생했습니다.'));
  }
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
