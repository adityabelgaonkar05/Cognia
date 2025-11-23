import type {
  DynamicProfile,
  ProfileResponse,
  StaticProfile,
  UserProfile,
} from "../../types/profile"
import { requireAuthToken } from "../../utils/auth"
import { getRequest, postRequest } from "../../utils/http"

export type { StaticProfile, DynamicProfile, UserProfile, ProfileResponse }

export async function getProfile(): Promise<UserProfile | null> {
  requireAuthToken()

  try {
    const response = await getRequest("/profile")

    if (response.data?.success === false) {
      console.error("API error:", response.data?.error)
      throw new Error(response.data?.error || "API returned error")
    }

    return response.data?.data?.profile || null
  } catch (error) {
    console.error("Error fetching profile:", error)
    throw error
  }
}

export async function refreshProfile(): Promise<UserProfile> {
  requireAuthToken()

  try {
    const response = await postRequest(
      "/profile/refresh",
      {},
      undefined,
      undefined,
      300000
    )

    if (response.data?.success === false) {
      console.error("API error:", response.data?.error)
      throw new Error(response.data?.error || "API returned error")
    }

    return response.data?.data?.profile
  } catch (error) {
    console.error("Error refreshing profile:", error)
    throw error
  }
}

export async function getProfileContext(): Promise<string> {
  requireAuthToken()

  try {
    const response = await getRequest("/profile/context")

    if (response.data?.success === false) {
      console.error("API error:", response.data?.error)
      throw new Error(response.data?.error || "API returned error")
    }

    return response.data?.data?.context || ""
  } catch (error) {
    console.error("Error fetching profile context:", error)
    return ""
  }
}
