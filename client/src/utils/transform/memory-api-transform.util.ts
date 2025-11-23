import type { Memory } from "../../types/memory"
import { transformPageMetadata } from "./memory-metadata-transform.util"

export function transformApiMemoryResponse(mem: {
  id?: string
  hash?: string
  timestamp: string | number
  created_at?: string
  title?: string
  content?: string
  source?: string
  url?: string
  page_metadata?: Record<string, unknown>
  access_count?: number
  last_accessed?: string
}): Memory {
  return {
    id: mem.id || "",
    user_id: "",
    hash: mem.hash || "",
    timestamp:
      typeof mem.timestamp === "string"
        ? parseInt(mem.timestamp)
        : typeof mem.timestamp === "number"
          ? mem.timestamp
          : 0,
    created_at: mem.created_at || new Date().toISOString(),
    title: mem.title || "Memory",
    content: mem.content || "",
    preview: mem.content ? mem.content.slice(0, 200) : undefined,
    source: mem.source || "extension",
    url: mem.url,
    page_metadata: transformPageMetadata(mem.page_metadata),
    access_count: mem.access_count || 0,
    last_accessed: mem.last_accessed || new Date().toISOString(),
  }
}
