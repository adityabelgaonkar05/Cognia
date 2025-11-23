import type { MemoryType, SearchResult } from "../../types/memory"
import { transformPageMetadata } from "./memory-metadata-transform.util"

interface ApiSearchResult {
  memory_id: string
  user_id?: string
  source?: string
  url?: string
  title?: string
  content?: string
  content_preview?: string
  timestamp: number
  created_at?: string
  full_content?: string
  page_metadata?: Record<string, unknown>
  importance_score?: number
  access_count?: number
  last_accessed?: string
  score: number
  memory_type?: MemoryType | null
}

export function transformApiSearchResult(
  result: ApiSearchResult
): SearchResult {
  return {
    memory: {
      id: result.memory_id,
      user_id: result.user_id || "",
      source: result.source || (result.url ? "browser" : "extension"),
      url: result.url,
      title: result.title,
      content: result.content || result.content_preview || "",
      preview:
        result.content_preview ||
        (result.content ? result.content.slice(0, 200) : ""),
      timestamp: result.timestamp,
      created_at:
        result.created_at || new Date(result.timestamp * 1000).toISOString(),
      full_content: result.full_content,
      page_metadata: transformPageMetadata(result.page_metadata),
      importance_score: result.importance_score,
      access_count: result.access_count || 0,
      last_accessed: result.last_accessed || new Date().toISOString(),
      memory_type: result.memory_type || null,
    },
    similarity_score: result.score,
    relevance_score: result.score,
    semantic_score: result.score,
    search_type: "semantic" as const,
  }
}
