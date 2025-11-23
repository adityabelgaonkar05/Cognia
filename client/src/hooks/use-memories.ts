import { useCallback, useEffect, useState } from "react"

import { MemoryService } from "../services/memory.service"
import type { Memory } from "../types/memory"
import { requireAuthToken } from "../utils/auth"

export function useMemories() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [totalMemoryCount, setTotalMemoryCount] = useState<number>(0)

  const fetchMemories = useCallback(async () => {
    try {
      requireAuthToken()

      const [memoriesData, totalCount] = await Promise.all([
        MemoryService.getMemoriesWithTransactionDetails(10000),
        MemoryService.getUserMemoryCount(),
      ])

      setMemories(memoriesData || [])
      setTotalMemoryCount(totalCount || 0)
    } catch (err) {
      console.error("Error fetching memories:", err)
    }
  }, [])

  useEffect(() => {
    fetchMemories()
  }, [fetchMemories])

  return { memories, totalMemoryCount, refetch: fetchMemories }
}
