
import { useState, useEffect } from 'react';
import { Onboarding } from '@/components/Onboarding';
import { MoodCheck, MoodResult } from '@/components/MoodCheck';
import { CourseRecommendation } from '@/components/CourseRecommendation';
import { CourseDetail } from '@/components/CourseDetail';
import { ReviewForm } from '@/components/ReviewForm';
import { LocationGuide } from '@/components/LocationGuide';
import { RewardsPanel } from '@/components/RewardsPanel';
import { ShareCard } from '@/components/ShareCard';
import { MyPage } from '@/components/MyPage';
import { CourseCreator } from '@/components/CourseCreator';
import { UserPoints, ShareCard as ShareCardType } from '@/types/rewards';
import { MyPageData, UserCourse } from '@/types/location';

export type AppState = 'onboarding' | 'mood-check' | 'recommendation' | 'course-detail' | 'active-plan' | 'review' | 'rewards' | 'share' | 'mypage' | 'create-course';
export type UserMode = 'novice' | 'experienced' | 'home';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('onboarding');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [userMode, setUserMode] = useState<UserMode>('novice');
  const [moodResult, setMoodResult] = useState<MoodResult | null>(null);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [userPoints, setUserPoints] = useState<UserPoints>({ total: 3500, available: 3200, earned: 3500 });
  const [userBadges, setUserBadges] = useState<string[]>(['first-solo', 'cafe-hopper']);
  const [shareData, setShareData] = useState<ShareCardType | null>(null);
  const [myPageData, setMyPageData] = useState<MyPageData>({
    completedCourses: [
      {
        id: 'completed-1',
        title: '홍대 감성 카페 투어',
        completedAt: '2024-01-15T14:30:00Z',
        rating: 4.5,
        image: '/placeholder.svg',
        locations: ['카페 A', '카페 B', '카페 C']
      }
    ],
    createdCourses: [],
    totalPoints: 3500,
    badges: ['first-solo', 'cafe-hopper'],
    favoriteLocations: ['홍대', '성수', '강남']
  });

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('honcours-onboarding');
    const savedUserMode = localStorage.getItem('honcours-user-mode') as UserMode;
    const savedMoodResult = localStorage.getItem('honcours-mood-result');
    
    if (hasCompletedOnboarding && savedUserMode && savedMoodResult) {
      setUserMode(savedUserMode);
      setMoodResult(JSON.parse(savedMoodResult));
      setCurrentState('recommendation');
    }
  }, []);

  const handleOnboardingComplete = (mode: UserMode) => {
    setUserMode(mode);
    localStorage.setItem('honcours-onboarding', 'true');
    localStorage.setItem('honcours-user-mode', mode);
    
    // 온보딩에서 이미 기분 체크가 완료된 경우 바로 추천으로
    const savedMoodResult = localStorage.getItem('honcours-mood-result');
    if (savedMoodResult) {
      setMoodResult(JSON.parse(savedMoodResult));
      setCurrentState('recommendation');
    } else {
      setCurrentState('mood-check');
    }
  };

  const handleMoodCheckComplete = (result: MoodResult) => {
    setMoodResult(result);
    localStorage.setItem('honcours-mood-result', JSON.stringify(result));
    setCurrentState('recommendation');
  };

  const handleCourseSelect = (course: any) => {
    setSelectedCourse(course);
    setCurrentState('course-detail');
  };

  const handlePlanStart = () => {
    setCurrentState('active-plan');
    setCurrentLocation(0);
  };

  const handleLocationUpdate = (locationIndex: number) => {
    setCurrentLocation(locationIndex);
    if (locationIndex >= selectedCourse.locations.length) {
      setCurrentState('review');
    }
  };

  const handleReviewComplete = () => {
    // Award points and badges for completing course
    const pointsEarned = 100;
    const newBadges = userMode === 'home' ? [{ id: 'home-master', name: '집콕 마스터', description: '집에서 알찬 시간을 보냈어요', icon: '🏠', category: 'achievement' as const }] : [{ id: 'exhibition-lover', name: '전시 애호가', description: '전시회를 방문했어요', icon: '🎨', category: 'achievement' as const }];
    
    setUserPoints(prev => ({
      ...prev,
      total: prev.total + pointsEarned,
      available: prev.available + pointsEarned,
      earned: prev.earned + pointsEarned
    }));
    
    setUserBadges(prev => [...prev, ...newBadges.map(badge => badge.id).filter(badgeId => !prev.includes(badgeId))]);
    
    // Add to completed courses
    const completedCourse = {
      id: selectedCourse.id,
      title: selectedCourse.title,
      completedAt: new Date().toISOString(),
      rating: 5, // Default rating, should be from review form
      image: selectedCourse.image,
      locations: selectedCourse.locations.map((loc: any) => loc.name)
    };
    
    setMyPageData(prev => ({
      ...prev,
      completedCourses: [...prev.completedCourses, completedCourse],
      totalPoints: prev.totalPoints + pointsEarned,
      badges: [...prev.badges, ...newBadges.map(badge => badge.id).filter(badgeId => !prev.badges.includes(badgeId))]
    }));
    
    // Prepare share data
    setShareData({
      courseTitle: selectedCourse.title,
      completedAt: new Date().toISOString(),
      locations: selectedCourse.locations.map((loc: any) => loc.name),
      badges: newBadges,
      totalPoints: pointsEarned
    });
    
    setCurrentState('share');
  };

  const handleShowRewards = () => {
    setCurrentState('rewards');
  };

  const handleShowMyPage = () => {
    setCurrentState('mypage');
  };

  const handleCreateCourse = () => {
    setCurrentState('create-course');
  };

  const handleCourseCreated = (course: UserCourse) => {
    setMyPageData(prev => ({
      ...prev,
      createdCourses: [...prev.createdCourses, course]
    }));
    setCurrentState('mypage');
  };

  const handleBackToRecommendation = () => {
    setCurrentState('recommendation');
    setSelectedCourse(null);
    setCurrentLocation(0);
    setShareData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {currentState === 'onboarding' && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {currentState === 'mood-check' && (
        <MoodCheck onComplete={handleMoodCheckComplete} />
      )}
      
      {currentState === 'recommendation' && moodResult && (
        <CourseRecommendation 
          userMode={userMode}
          moodResult={moodResult}
          onCourseSelect={handleCourseSelect}
          onShowRewards={handleShowRewards}
          onShowMyPage={handleShowMyPage}
          userPoints={userPoints}
        />
      )}
      
      {currentState === 'course-detail' && selectedCourse && (
        <CourseDetail 
          course={selectedCourse}
          onStartPlan={handlePlanStart}
          onBack={() => setCurrentState('recommendation')}
        />
      )}
      
      {currentState === 'active-plan' && selectedCourse && (
        <LocationGuide 
          course={selectedCourse}
          currentLocation={currentLocation}
          onLocationUpdate={handleLocationUpdate}
        />
      )}
      
      {currentState === 'review' && selectedCourse && (
        <ReviewForm 
          course={selectedCourse}
          onComplete={handleReviewComplete}
        />
      )}
      
      {currentState === 'rewards' && (
        <RewardsPanel 
          userPoints={userPoints}
          userBadges={userBadges}
          onBack={handleBackToRecommendation}
        />
      )}
      
      {currentState === 'share' && shareData && (
        <ShareCard 
          shareData={shareData}
          onBack={handleBackToRecommendation}
          onShowRewards={handleShowRewards}
          onShowMyPage={handleShowMyPage}
          userPoints={userPoints}
        />
      )}
      
      {currentState === 'mypage' && (
        <MyPage 
          myPageData={myPageData}
          onBack={handleBackToRecommendation}
          onCreateCourse={handleCreateCourse}
        />
      )}
      
      {currentState === 'create-course' && (
        <CourseCreator 
          onBack={() => setCurrentState('mypage')}
          onCourseCreated={handleCourseCreated}
        />
      )}
    </div>
  );
};

export default Index;
