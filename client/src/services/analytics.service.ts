import * as AnalyticsApi from "./analytics/analytics.service"

export class AnalyticsService {
  static async getAnalytics() {
    return AnalyticsApi.getAnalytics()
  }
}

export type { AnalyticsData } from "../types/analytics"
