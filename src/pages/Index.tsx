import { useState, useEffect } from 'react';
import { Onboarding } from '@/components/Onboarding';
import { CourseRecommendation } from '@/components/CourseRecommendation';
import { CourseDetail } from '@/components/CourseDetail';
import { ReviewForm } from '@/components/ReviewForm';
import { LocationGuide } from '@/components/LocationGuide';
import { RewardsPanel } from '@/components/RewardsPanel';
import { ShareCard } from '@/components/ShareCard';
import { UserPoints, ShareCard as ShareCardType } from '@/types/rewards';

export type AppState = 'onboarding' | 'recommendation' | 'course-detail' | 'active-plan' | 'review' | 'rewards' | 'share';

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('onboarding');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isNovice, setIsNovice] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(0);
  const [userPoints, setUserPoints] = useState<UserPoints>({ total: 1500, available: 1200, earned: 1500 });
  const [userBadges, setUserBadges] = useState<string[]>(['first-solo', 'cafe-hopper']);
  const [shareData, setShareData] = useState<ShareCardType | null>(null);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('honcours-onboarding');
    if (hasCompletedOnboarding) {
      setCurrentState('recommendation');
    }
  }, []);

  const handleOnboardingComplete = (noviceMode: boolean) => {
    setIsNovice(noviceMode);
    localStorage.setItem('honcours-onboarding', 'true');
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
    const newBadges = ['exhibition-lover']; // Example new badge
    
    setUserPoints(prev => ({
      ...prev,
      total: prev.total + pointsEarned,
      available: prev.available + pointsEarned,
      earned: prev.earned + pointsEarned
    }));
    
    setUserBadges(prev => [...prev, ...newBadges.filter(badge => !prev.includes(badge))]);
    
    // Prepare share data
    setShareData({
      courseTitle: selectedCourse.title,
      completedAt: new Date().toISOString(),
      locations: selectedCourse.locations.map((loc: any) => loc.name),
      badges: newBadges.map(badgeId => ({ id: badgeId, name: '전시 애호가', description: '전시회를 방문했어요', icon: '🎨' })),
      totalPoints: pointsEarned
    });
    
    setCurrentState('share');
  };

  const handleShowRewards = () => {
    setCurrentState('rewards');
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
      
      {currentState === 'recommendation' && (
        <CourseRecommendation 
          isNovice={isNovice}
          onCourseSelect={handleCourseSelect}
          onShowRewards={handleShowRewards}
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
        />
      )}
    </div>
  );
};

export default Index;
