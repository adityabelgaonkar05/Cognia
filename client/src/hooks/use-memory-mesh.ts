import { useEffect, useState } from "react"
import { MemoryService } from "@/services/memory.service"
import { requireAuthToken } from "@/utils/auth"

import type { MemoryMesh } from "@/types/memory"

export function useMemoryMesh(
  similarityThreshold: number,
  onMeshLoad?: (mesh: MemoryMesh) => void
) {
  const [meshData, setMeshData] = useState<MemoryMesh | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMeshData = async () => {
      try {
        requireAuthToken()
        setIsLoading(true)
        setError(null)
        const data = await MemoryService.getMemoryMesh(
          Infinity,
          similarityThreshold
        )
        setMeshData(data)
        if (typeof onMeshLoad === "function") {
          onMeshLoad(data)
        }
      } catch (err) {
        setError("Failed to load memory mesh")
        console.error("Error fetching mesh data:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMeshData()
  }, [similarityThreshold, onMeshLoad])

  return { meshData, isLoading, error }
}
