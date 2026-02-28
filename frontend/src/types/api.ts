export type AccountResponse = {
  username: string;
  following: string[];
  followers: string[];
};

export type GraphNode = { id: number; username: string };
export type GraphEdge = { start: number; end: number };

export type GraphResponse = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};
