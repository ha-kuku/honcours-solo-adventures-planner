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
    type: "outdoor",
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
    type: "outdoor",
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
    type: "outdoor",
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
  },
  {
    id: 4,
    title: "넷플릭스 & 홈 카페",
    description: "집에서 즐기는 완벽한 영화 마라톤과 홈메이드 음료",
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&h=400&fit=crop",
    duration: "4시간",
    difficulty: "beginner",
    rating: 4.9,
    reviewCount: 203,
    congestionLevel: "none",
    type: "home",
    locations: [
      {
        id: 10,
        name: "거실 영화관 세팅",
        type: "movie_setup",
        description: "편안한 소파와 조명으로 홈시네마 분위기 만들기",
        time: "19:00 - 19:30",
        duration: "30분",
        congestion: "없음",
        tip: "조명을 어둡게 하고 담요를 준비하세요. 스마트폰은 무음으로!",
        arrivalTip: "팝콘이나 간단한 간식을 미리 준비해두세요",
        image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=400&h=300&fit=crop"
      },
      {
        id: 11,
        name: "넷플릭스 추천작 감상",
        type: "streaming",
        description: "화제의 드라마나 영화 2-3편 연속 시청",
        time: "19:30 - 22:00",
        duration: "2.5시간",
        congestion: "없음",
        tip: "장르를 미리 정해두세요. 로맨스, 스릴러, 다큐 중에서 골라보세요!",
        arrivalTip: "시청 목록을 미리 만들어두면 선택 시간을 줄일 수 있어요",
        image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=400&h=300&fit=crop"
      },
      {
        id: 12,
        name: "홈메이드 음료 타임",
        type: "drink_making",
        description: "따뜻한 코코아나 허브티로 마무리",
        time: "22:00 - 22:30",
        duration: "30분",
        congestion: "없음",
        tip: "카모마일이나 라벤더차는 숙면에 도움이 돼요. 꿀을 조금 넣어보세요!",
        arrivalTip: "차를 우리는 동안 오늘 본 영화에 대해 생각해보세요",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop"
      }
    ],
    tips: [
      "편안한 잠옷으로 갈아입고 시작하세요",
      "중간중간 스트레칭을 해서 몸이 굳지 않게 해주세요",
      "눈의 피로를 위해 화면 밝기를 적절히 조절하세요",
      "다음 날 일이 있다면 너무 늦지 않게 마무리하세요"
    ]
  },
  {
    id: 5,
    title: "홈 요가 & 명상",
    description: "집에서 하는 몸과 마음의 힐링 타임",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
    duration: "3시간",
    difficulty: "beginner",
    rating: 4.7,
    reviewCount: 167,
    congestionLevel: "none",
    type: "home",
    locations: [
      {
        id: 13,
        name: "요가 매트 준비",
        type: "preparation",
        description: "조용한 공간에 요가 매트와 소품 세팅",
        time: "18:00 - 18:15",
        duration: "15분",
        congestion: "없음",
        tip: "방을 환기시키고 차분한 음악을 틀어두세요",
        arrivalTip: "휴대폰은 무음으로 하고 물을 준비해두세요",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop"
      },
      {
        id: 14,
        name: "기본 요가 루틴",
        type: "yoga_practice",
        description: "초보자를 위한 30분 요가 동작",
        time: "18:15 - 19:00",
        duration: "45분",
        congestion: "없음",
        tip: "무리하지 말고 자신의 페이스대로 따라해보세요",
        arrivalTip: "YouTube 요가 채널을 미리 찾아두면 좋아요",
        image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&h=300&fit=crop"
      },
      {
        id: 15,
        name: "명상과 휴식",
        type: "meditation",
        description: "10분간의 명상으로 하루 마무리",
        time: "19:00 - 19:30",
        duration: "30분",
        congestion: "없음",
        tip: "편안한 자세로 호흡에만 집중해보세요",
        arrivalTip: "명상 앱이나 백색소음을 활용해보세요",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
      }
    ],
    tips: [
      "요가복이 없어도 편한 옷이면 충분해요",
      "처음엔 쉬운 동작부터 시작하세요",
      "호흡을 깊게 하는 것이 가장 중요해요",
      "매일 조금씩이라도 꾸준히 하는 것이 좋아요"
    ]
  },
  {
    id: 6,
    title: "보드게임 & 퍼즐",
    description: "혼자서도 즐거운 보드게임과 직소퍼즐",
    image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=400&fit=crop",
    duration: "5시간",
    difficulty: "beginner",
    rating: 4.5,
    reviewCount: 98,
    congestionLevel: "none",
    type: "home",
    locations: [
      {
        id: 16,
        name: "1인용 보드게임",
        type: "board_game",
        description: "솔로 플레이 가능한 보드게임 즐기기",
        time: "14:00 - 16:00",
        duration: "2시간",
        congestion: "없음",
        tip: "온라인으로도 다양한 보드게임을 즐길 수 있어요",
        arrivalTip: "게임 규칙을 미리 읽어두면 더 재미있어요",
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400&h=300&fit=crop"
      },
      {
        id: 17,
        name: "직소퍼즐 도전",
        type: "puzzle",
        description: "500-1000피스 퍼즐로 집중력 키우기",
        time: "16:30 - 19:00",
        duration: "2.5시간",
        congestion: "없음",
        tip: "모서리부터 맞춰나가면 쉬워요. 충분한 공간을 확보하세요!",
        arrivalTip: "좋은 조명 아래서 하는 것이 눈에 편해요",
        image: "https://images.unsplash.com/photo-1580913428706-c311e67898b3?w=400&h=300&fit=crop"
      },
      {
        id: 18,
        name: "간단한 간식 타임",
        type: "snack_time",
        description: "게임하며 즐길 수 있는 간단한 간식 준비",
        time: "19:00 - 19:30",
        duration: "30분",
        congestion: "없음",
        tip: "손에 묻지 않는 간식이 좋아요. 견과류나 과일 추천!",
        arrivalTip: "게임 중에는 음료수보다 물이 안전해요",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop"
      }
    ],
    tips: [
      "혼자 할 수 있는 게임 목록을 미리 만들어두세요",
      "퍼즐은 완성하는 데 시간이 오래 걸리니 여유를 가지세요",
      "게임 중간중간 스트레칭을 잊지 마세요",
      "완성한 퍼즐은 사진으로 남기면 뿌듯해요"
    ]
  }
];
