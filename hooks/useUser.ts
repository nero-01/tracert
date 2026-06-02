import { MOCK_USER, MOCK_SUBSCRIPTION, MOCK_STREAK } from '@/lib/mock/mockUser'

export function useUser() {
  return {
    user: MOCK_USER,
    profile: MOCK_USER,
    subscription: MOCK_SUBSCRIPTION,
    streak: MOCK_STREAK,
    isLoading: false,
    isPro: true,
  }
}
