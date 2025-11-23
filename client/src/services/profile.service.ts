import * as ProfileApi from "./profile/profile.service"

export class ProfileService {
  static async getProfile() {
    return ProfileApi.getProfile()
  }

  static async refreshProfile() {
    return ProfileApi.refreshProfile()
  }

  static async getProfileContext() {
    return ProfileApi.getProfileContext()
  }
}

export type {
  UserProfile,
  StaticProfile,
  DynamicProfile,
  ProfileResponse,
} from "../types/profile"
