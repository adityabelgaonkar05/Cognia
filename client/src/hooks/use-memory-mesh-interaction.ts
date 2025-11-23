import { useCallback, useMemo, useState } from "react"

import type { Memory } from "../types/memory"

export function useMemoryMeshInteraction(memories: Memory[]) {
  const [clickedNodeId, setClickedNodeId] = useState<string | null>(null)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  const handleNodeClick = useCallback(
    (memoryId: string) => {
      const memoryInfo = memories.find((m) => m.id === memoryId)
      if (memoryInfo) {
        setSelectedMemory(memoryInfo)
      }
      setClickedNodeId(memoryId)
    },
    [memories]
  )

  const highlightedMemoryIds = useMemo(
    () => [
      ...(clickedNodeId ? [clickedNodeId] : []),
      ...(selectedMemory ? [selectedMemory.id] : []),
    ],
    [clickedNodeId, selectedMemory]
  )

  const memorySources = useMemo(
    () => Object.fromEntries(memories.map((m) => [m.id, m.source || ""])),
    [memories]
  )

  const memoryUrls = useMemo(
    () => Object.fromEntries(memories.map((m) => [m.id, m.url || ""])),
    [memories]
  )

  return {
    clickedNodeId,
    selectedMemory,
    setSelectedMemory,
    handleNodeClick,
    highlightedMemoryIds,
    memorySources,
    memoryUrls,
  }
}
