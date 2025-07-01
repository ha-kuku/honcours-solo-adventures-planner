
export interface UserPoints {
  total: number;
  available: number;
  earned: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'location' | 'achievement' | 'special';
  earnedAt?: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  category: 'discount' | 'voucher' | 'special';
  image: string;
  partnerName: string;
  expiryDays: number;
}

export interface ShareCard {
  courseTitle: string;
  completedAt: string;
  locations: string[];
  badges: Badge[];
  totalPoints: number;
}
