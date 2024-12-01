import { User } from '@/types/user'

export interface SubscriptionLimits {
  dailyMinutes: number
  monthlyMinutes: number
  hasAds: boolean
  hasWatermark: boolean
}

export async function getSubscriptionLimits(user: User): Promise<SubscriptionLimits> {
  const response = await fetch('/api/subscription-limits', {
    headers: { 'Authorization': `Bearer ${user.token}` },
  });
  return response.json();
}

export function checkUsageLimit(subscriptionTier: string, usedMinutes: number): boolean {
  const limits = {
    free: 10,
    plus: 30,
    premium: 60
  };
  return usedMinutes < (limits[subscriptionTier as keyof typeof limits] || 0);
}

export async function createSubscription(user: User, plan: 'plus' | 'premium'): Promise<string> {
  const response = await fetch('/api/create-subscription', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${user.token}`,
    },
    body: JSON.stringify({ plan }),
  });
  const data = await response.json();
  return data.subscription_id;
}

export async function cancelSubscription(subscriptionId: string): Promise<void> {
  await fetch('/api/cancel-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription_id: subscriptionId }),
  });
}

export async function updateSubscription(subscriptionId: string, plan: 'plus' | 'premium'): Promise<void> {
  await fetch('/api/update-subscription', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscription_id: subscriptionId, plan }),
  });
}

