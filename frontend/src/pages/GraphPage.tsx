import { useEffect, useRef, useState } from 'react';
import { DataSet, Network } from 'vis-network';
import { getGraph } from '@/api/client';
import type { GraphResponse } from '@/types/api';

export default function GraphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GraphResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getGraph()
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed'));
  }, []);

  useEffect(() => {
    if (!data?.nodes?.length || !containerRef.current) return;
    const nodes = new DataSet(data.nodes.map((n) => ({ id: n.id, label: n.username })));
    const edges = new DataSet(
      data.edges.map((e) => ({ from: e.start, to: e.end, arrows: 'to' }))
    );
    const net = new Network(containerRef.current, { nodes, edges }, { physics: { stabilization: true } });
    return () => net.destroy();
  }, [data]);

  if (error) return <p style={{ padding: '1rem', color: 'crimson' }}>{error}</p>;
  if (!data) return <p style={{ padding: '1rem' }}>Loading…</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
}
