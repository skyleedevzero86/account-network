import { useCallback, useEffect, useRef, useState } from 'react';
import { DataSet } from 'vis-data/standalone';
import { Network } from 'vis-network';
import { getGraph } from '@/api/client';
import type { GraphResponse } from '@/types/api';

export default function GraphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<GraphResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    setError(null);
    setLoading(true);
    getGraph()
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e instanceof Error ? e.message : '그래프를 불러오지 못했습니다.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!data?.nodes?.length || !containerRef.current) return;
    const nodes = new DataSet(data.nodes.map((n) => ({ id: n.id, label: n.username })));
    const edgeItems = data.edges.map((e, i) => ({
      id: i,
      from: e.start,
      to: e.end,
      arrows: 'to' as const,
    }));
    const edges = new DataSet<{ id: number; from: number; to: number; arrows: 'to' }>(edgeItems);
    const net = new Network(containerRef.current, { nodes, edges }, { physics: { stabilization: true } });
    return () => net.destroy();
  }, [data]);

  if (error)
    return (
      <div style={{ padding: '1rem' }}>
        <p style={{ color: 'crimson', marginBottom: '0.5rem' }}>{error}</p>
        <button type="button" onClick={load}>
          다시 시도
        </button>
      </div>
    );
  if (loading || !data)
    return <p style={{ padding: '1rem' }}>불러오는 중…</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
}
