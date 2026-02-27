import type {
  AccountRequest,
  AccountResponse,
  GraphResponse,
  RelationRequest,
} from '../types/api'

const BASE = '/api'

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `HTTP ${res.status}`)
  }
  if (res.status === 204 || res.headers.get('content-length') === '0') {
    return undefined as T
  }
  return res.json() as Promise<T>
}

export function createNode(body: AccountRequest): Promise<void> {
  return request<void>('/node', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getNode(username: string): Promise<AccountResponse> {
  return request<AccountResponse>(`/node/${encodeURIComponent(username)}`)
}

export function createRelationship(body: RelationRequest): Promise<void> {
  return request<void>('/relationship', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getGraph(): Promise<GraphResponse> {
  return request<GraphResponse>('/graph')
}
