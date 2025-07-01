
import { Badge, Reward } from '@/types/rewards';

export const mockBadges: Badge[] = [
  {
    id: 'first-solo',
    name: '첫 혼행',
    description: '첫 번째 혼자 여행을 완료했어요',
    icon: '🎯',
    category: 'achievement'
  },
  {
    id: 'exhibition-lover',
    name: '전시 애호가',
    description: '전시회를 3번 이상 방문했어요',
    icon: '🎨',
    category: 'location'
  },
  {
    id: 'cafe-hopper',
    name: '카페 탐험가',
    description: '다양한 카페를 5곳 이상 방문했어요',
    icon: '☕',
    category: 'location'
  },
  {
    id: 'movie-buff',
    name: '영화 매니아',
    description: '혼자 영화를 10편 이상 봤어요',
    icon: '🎬',
    category: 'location'
  },
  {
    id: 'review-master',
    name: '리뷰 마스터',
    description: '후기를 20개 이상 작성했어요',
    icon: '⭐',
    category: 'achievement'
  }
];

export const mockRewards: Reward[] = [
  {
    id: 'starbucks-discount',
    title: '스타벅스 15% 할인',
    description: '아메리카노, 라떼 등 음료 15% 할인',
    pointsCost: 500,
    category: 'discount',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400',
    partnerName: '스타벅스',
    expiryDays: 30
  },
  {
    id: 'hollys-voucher',
    title: '할리스 음료 쿠폰',
    description: '아메리카노 1잔 무료 쿠폰',
    pointsCost: 800,
    category: 'voucher',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
    partnerName: '할리스',
    expiryDays: 60
  },
  {
    id: 'cgv-discount',
    title: 'CGV 영화 할인',
    description: '영화 티켓 2,000원 할인',
    pointsCost: 1000,
    category: 'discount',
    image: 'https://images.unsplash.com/photo-1489185078254-c3365d6e359f?w=400',
    partnerName: 'CGV',
    expiryDays: 45
  },
  {
    id: 'bookstore-voucher',
    title: '교보문고 도서 쿠폰',
    description: '도서 구매 시 3,000원 할인',
    pointsCost: 1200,
    category: 'voucher',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
    partnerName: '교보문고',
    expiryDays: 90
  }
];
