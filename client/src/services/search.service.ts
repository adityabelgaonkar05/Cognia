import type { SearchFilters } from "../types/memory"
import * as SearchApi from "./search/search.service"

export class SearchService {
  static async semanticSearch(
    query: string,
    limit: number = 10,
    contextOnly: boolean = false,
    signal?: AbortSignal
  ) {
    return SearchApi.SearchService.semanticSearch(
      query,
      limit,
      contextOnly,
      signal
    )
  }

  static async getJob(jobId: string) {
    return SearchApi.SearchService.getJob(jobId)
  }

  static async getContextForAI(
    query: string,
    limit: number = 10,
    signal?: AbortSignal
  ) {
    return SearchApi.SearchService.getContextForAI(query, limit, signal)
  }

  static async semanticSearchMapped(
    query: string,
    filters: SearchFilters = {},
    page: number = 1,
    limit: number = 10,
    signal?: AbortSignal
  ) {
    return SearchApi.SearchService.semanticSearchMapped(
      query,
      filters,
      page,
      limit,
      signal
    )
  }
}

export type { SearchFilters }
