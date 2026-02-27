import { useEffect, useRef } from 'react'
import { Network } from 'vis-network'
import { DataSet } from 'vis-data'
import { getGraph } from '../api/client'

export default function GraphPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const networkRef = useRef<Network | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const nodes = new DataSet<{ id: number; label: string }>([])
    const edges = new DataSet<{ id?: string; from: number; to: number; arrows: string }>([])

    const data = { nodes, edges }
    const options = {
      nodes: {
        shape: 'dot',
        size: 16,
        font: { size: 14 },
      },
      edges: {
        arrows: { to: { enabled: true } },
      },
      physics: {
        enabled: true,
        barnesHut: {
          gravitationalConstant: -3000,
          centralGravity: 0.1,
          springLength: 120,
          springConstant: 0.04,
        },
      },
    }

    const net = new Network(container, data, options)
    networkRef.current = net

    getGraph()
      .then((res) => {
        res.nodes.forEach((n) => nodes.add({ id: n.id, label: n.username }))
        res.edges.forEach((e) =>
          edges.add({
            id: `${e.start}-${e.end}`,
            from: e.start,
            to: e.end,
            arrows: 'to',
          }),
        )
      })
      .catch((err) => {
        console.error(err)
        nodes.clear()
        edges.clear()
      })

    return () => {
      net.destroy()
      networkRef.current = null
    }
  }, [])

  return (
    <div>
      <h1>Graph</h1>
      <div
        ref={containerRef}
        style={{ width: '100%', height: '70vh', border: '1px solid #ddd', borderRadius: 8 }}
      />
    </div>
  )
}
