
export interface LocationInfo {
  id: string;
  name: string;
  description: string;
  type: string;
  duration: string;
  time: string;
  congestion: string;
  // 추가된 정보
  address: string;
  hours: string;
  closedDays: string[];
  phone?: string;
  website?: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  images: string[];
}

export interface UserCourse {
  id: string;
  title: string;
  description: string;
  locations: LocationInfo[];
  createdBy: string;
  createdAt: string;
  rating?: number;
  reviewCount: number;
  isPublic: boolean;
  tags: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  type: 'outdoor' | 'home';
}

export interface MyPageData {
  completedCourses: Array<{
    id: string;
    title: string;
    completedAt: string;
    rating: number;
    image: string;
    locations: string[];
  }>;
  createdCourses: UserCourse[];
  totalPoints: number;
  badges: string[];
  favoriteLocations: string[];
}
