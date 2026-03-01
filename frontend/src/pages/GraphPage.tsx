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
    if (!data || !containerRef.current) return;
    if (data.nodes.length === 0) return;

    const isLargeGraph = data.nodes.length > 500;


    const layoutLargeGraph = (index: number): { x: number; y: number } => {
      const nodesPerRing = 120;
      const ringIndex = Math.floor(index / nodesPerRing);
      const posInRing = index % nodesPerRing;
      const angle = (2 * Math.PI * posInRing) / nodesPerRing;
      const radius = 50 + ringIndex * 22;
      return { x: radius * Math.cos(angle), y: radius * Math.sin(angle) };
    };

    const nodeEntries = data.nodes.map((n, i) => {
      const base: { id: number; label: string; title?: string; size?: number; x?: number; y?: number } = {
        id: n.id,
        label: n.username,
        title: n.username,
      };
      if (isLargeGraph) {
        const pos = layoutLargeGraph(i);
        base.x = pos.x;
        base.y = pos.y;
        base.size = 6;
      }
      return base;
    });
    const nodes = new DataSet(nodeEntries);

    const edgeItems = data.edges.map((e, i) => ({
      id: i,
      from: e.start,
      to: e.end,
      arrows: 'to' as const,
      width: isLargeGraph ? 0.4 : 1,
    }));
    const edges = new DataSet(edgeItems);

    const options = {
      physics: isLargeGraph ? false : { stabilization: { iterations: 150 } },
      nodes: {
        font: {
          size: isLargeGraph ? 10 : 14,
          color: '#1a1a1a',
          background: 'rgba(255,255,255,0.85)',
          strokeWidth: 2,
          strokeColor: '#fff',
        },
        borderWidth: 1,
        borderWidthSelected: 2,
        shape: 'dot',
      },
      edges: {
        smooth: { enabled: true, type: 'continuous', roundness: 0.5 },
        width: isLargeGraph ? 0.5 : 1,
      },
      interaction: {
        hover: true,
        tooltipDelay: 100,
      },
    };
    const net = new Network(containerRef.current, { nodes, edges }, options);
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

  if (data.nodes.length === 0)
    return (
      <div style={{ padding: '1rem' }}>
        <p>표시할 노드가 없습니다.</p>
      </div>
    );

  return (
    <div style={{ padding: '1rem' }}>
      {data.nodes.length > 500 && (
        <p style={{ marginBottom: '0.5rem', color: '#666', fontSize: '0.9rem' }}>
          노드 {data.nodes.length}개 — 링 형태로 배치됨. 축소하면 전체가 보이고, 확대하면 각 노드 옆에 계정명(라벨)이 보입니다. 마우스를 올리면 툴팁으로도 표시됩니다.
        </p>
      )}
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
    </div>
  );
}
