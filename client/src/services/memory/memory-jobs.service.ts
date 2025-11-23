import { requireAuthToken } from "../../utils/auth"
import { getRequest } from "../../utils/http"

export async function getMemorySnapshots(
  page: number = 1,
  limit: number = 20
): Promise<{
  snapshots: unknown[]
  total: number
  page: number
  limit: number
}> {
  requireAuthToken()
  const response = await getRequest(
    `/memory/snapshots?page=${page}&limit=${limit}`
  )
  return response.data?.data || { snapshots: [], total: 0, page, limit }
}
