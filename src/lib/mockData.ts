
export const mockCourses = [
  {
    id: 1,
    title: "힐링 아트 데이",
    description: "조용한 전시관과 아늑한 카페, 그리고 감성 영화까지",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
    duration: "6시간",
    difficulty: "beginner",
    rating: 4.8,
    reviewCount: 124,
    congestionLevel: "low",
    locations: [
      {
        id: 1,
        name: "서울시립미술관",
        type: "exhibition",
        description: "조용하고 여유로운 분위기의 현대미술 전시",
        time: "10:00 - 12:00",
        duration: "2시간",
        congestion: "한산함",
        tip: "평일 오전이 가장 한적해요. 무료 도슨트 투어도 추천!",
        arrivalTip: "1층 안내데스크에서 전시 가이드를 받아보세요",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        name: "북카페 그리다",
        type: "cafe",
        description: "책과 함께하는 조용한 카페 타임",
        time: "12:30 - 14:30",
        duration: "2시간",
        congestion: "보통",
        tip: "2층 창가 자리가 혼자 앉기 좋아요. 샐러드도 맛있어요!",
        arrivalTip: "혼자 온 손님을 위한 1인석이 2층에 있어요",
        image: "https://images.unsplash.com/photo-1481833761820-0509d3217039?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        name: "CGV 압구정",
        type: "cinema",
        description: "감성적인 독립영화로 하루를 마무리",
        time: "15:00 - 17:00",
        duration: "2시간",
        congestion: "보통",
        tip: "혼자 영화보기 좋은 좌석은 가장자리! 팝콘은 작은 사이즈로 추천",
        arrivalTip: "1인 관객을 위한 할인 혜택이 있는지 확인해보세요",
        image: "https://images.unsplash.com/photo-1489185078692-20b23a010d65?w=400&h=300&fit=crop"
      }
    ],
    tips: [
      "전시관에서는 혼자만의 속도로 천천히 감상해보세요",
      "카페에서는 창가 자리를 추천해요",
      "영화는 감성적인 독립영화나 드라마 장르가 혼자보기 좋아요",
      "하루 종일 걸을 예정이니 편한 신발을 신으세요"
    ]
  },
  {
    id: 2,
    title: "도심 속 자연 힐링",
    description: "공원 산책과 식물원, 그리고 차분한 티타임",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
    duration: "5시간",
    difficulty: "beginner",
    rating: 4.6,
    reviewCount: 89,
    congestionLevel: "low",
    locations: [
      {
        id: 4,
        name: "남산공원",
        type: "park",
        description: "도심 속 자연을 만끽할 수 있는 힐링 스팟",
        time: "09:00 - 11:00",
        duration: "2시간",
        congestion: "한산함",
        tip: "새벽 공기가 가장 맑아요. 간단한 운동복 준비하세요!",
        arrivalTip: "순환버스를 이용하면 편리해요",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
      },
      {
        id: 5,
        name: "서울식물원",
        type: "garden",
        description: "다양한 식물과 함께하는 치유의 시간",
        time: "12:00 - 14:00",
        duration: "2시간",
        congestion: "한산함",
        tip: "온실이 특히 아름다워요. 사진 촬영도 자유롭게!",
        arrivalTip: "입구에서 지도를 받아 코스를 미리 정해보세요",
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop"
      },
      {
        id: 6,
        name: "티하우스 봄날",
        type: "teahouse",
        description: "자연을 바라보며 즐기는 차분한 티타임",
        time: "14:30 - 16:00",
        duration: "1.5시간",
        congestion: "한산함",
        tip: "허브티 종류가 다양해요. 창가 자리 추천!",
        arrivalTip: "예약 없이도 가능하지만 주말엔 미리 전화해보세요",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop"
      }
    ],
    tips: [
      "편안한 운동화를 신고 가세요",
      "물통을 챙겨가면 좋아요",
      "날씨가 좋은 날 추천하는 코스예요",
      "자연 속에서의 명상이나 스케치도 좋아요"
    ]
  },
  {
    id: 3,
    title: "문화 탐방 코스",
    description: "박물관, 서점, 그리고 전통찻집까지",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
    duration: "7시간",
    difficulty: "intermediate",
    rating: 4.7,
    reviewCount: 156,
    congestionLevel: "medium",
    locations: [
      {
        id: 7,
        name: "국립중앙박물관",
        type: "museum",
        description: "한국의 역사와 문화를 깊이 있게 탐방",
        time: "10:00 - 13:00",
        duration: "3시간",
        congestion: "보통",
        tip: "상설전시만 봐도 충분해요. 오디오 가이드 추천!",
        arrivalTip: "무료 관람이에요. 물품보관함도 이용하세요",
        image: "https://images.unsplash.com/photo-1566127992631-137a642a90f4?w=400&h=300&fit=crop"
      },
      {
        id: 8,
        name: "교보문고 광화문점",
        type: "bookstore",
        description: "넓고 다양한 책들과 함께하는 시간",
        time: "14:00 - 16:00",
        duration: "2시간",
        congestion: "보통",
        tip: "지하 1층 문학 코너가 특히 좋아요. 의자도 많아요!",
        arrivalTip: "회원가입하면 할인 혜택이 있어요",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      },
      {
        id: 9,
        name: "인사동 전통찻집",
        type: "traditional_tea",
        description: "전통 차와 함께하는 여유로운 마무리",
        time: "16:30 - 18:00",
        duration: "1.5시간",
        congestion: "한산함",
        tip: "대추차나 유자차 추천해요. 전통 과자도 맛있어요!",
        arrivalTip: "2층에 조용한 자리가 많아요",
        image: "https://images.unsplash.com/photo-1571167092024-76bfc637be7c?w=400&h=300&fit=crop"
      }
    ],
    tips: [
      "박물관에서는 충분한 시간을 가지고 천천히 관람하세요",
      "서점에서는 관심 분야 책을 미리 정해두면 좋아요",
      "전통찻집에서는 스마트폰을 내려두고 여유를 즐겨보세요",
      "인사동 거리 구경도 함께 해보세요"
    ]
  }
];
