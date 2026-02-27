export interface GraphNode {
  id: number
  username: string
}

export interface GraphEdge {
  start: number
  end: number
}

export interface GraphResponse {
  nodes: GraphNode[]
  edges: GraphEdge[]
}

export interface AccountResponse {
  username: string
  following: string[]
  followers: string[]
}

export interface AccountRequest {
  username: string
}

export interface RelationRequest {
  start: string
  end: string
}
