
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserMode } from '@/pages/Index';
import { Coffee, Battery, Sun, Moon, Zap, Heart, Users, BookOpen, Home, MapPin } from 'lucide-react';

interface OnboardingProps {
  onComplete: (mode: UserMode) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [moodData, setMoodData] = useState<{
    energy?: 'low' | 'medium' | 'high';
    mood?: 'calm' | 'active' | 'social';
  }>({});

  const steps = [
    {
      title: '지금 내 에너지 레벨은?',
      subtitle: '솔직하게 답해주세요',
      options: [
        { key: 'low', label: '피곤해요', icon: <Battery className="w-5 h-5" />, desc: '집에서 쉬고 싶어요' },
        { key: 'medium', label: '보통이에요', icon: <Coffee className="w-5 h-5" />, desc: '가벼운 활동 정도는 괜찮아요' },
        { key: 'high', label: '활기차요', icon: <Zap className="w-5 h-5" />, desc: '뭔가 해보고 싶어요' }
      ]
    },
    {
      title: '어떤 기분이신가요?',
      subtitle: '지금 내 마음 상태를 선택해주세요',
      options: [
        { key: 'calm', label: '차분해요', icon: <Moon className="w-5 h-5" />, desc: '조용한 활동을 원해요' },
        { key: 'active', label: '활동적이에요', icon: <Sun className="w-5 h-5" />, desc: '몸을 움직이고 싶어요' },
        { key: 'social', label: '사람구경하고 싶어요', icon: <Coffee className="w-5 h-5" />, desc: '카페나 공원 같은 곳이 좋아요' }
      ]
    }
  ];

  const activityOptions = [
    {
      mode: 'novice' as UserMode,
      title: '혼행이 처음이에요',
      description: '혼자 외출하는 게 처음이라 가이드가 필요해요',
      icon: <MapPin className="w-8 h-8" />,
      color: 'from-blue-400 to-purple-500'
    },
    {
      mode: 'experienced' as UserMode,
      title: '혼행에 익숙해요',
      description: '혼자 다니는 것에 익숙하고 새로운 경험을 원해요',
      icon: <Users className="w-8 h-8" />,
      color: 'from-green-400 to-blue-500'
    },
    {
      mode: 'home' as UserMode,
      title: '집에서 쉬고 싶어요',
      description: '외출보다는 집에서 알찬 시간을 보내고 싶어요',
      icon: <Home className="w-8 h-8" />,
      color: 'from-pink-400 to-red-500'
    }
  ];

  const handleStepAnswer = (key: string) => {
    if (currentStep === 0) {
      setMoodData(prev => ({ ...prev, energy: key as 'low' | 'medium' | 'high' }));
      setCurrentStep(1);
    } else if (currentStep === 1) {
      setMoodData(prev => ({ ...prev, mood: key as 'calm' | 'active' | 'social' }));
      setCurrentStep(2);
    }
  };

  const handleModeSelect = (mode: UserMode) => {
    // 기분/피로도 체크 결과를 localStorage에 저장
    const moodResult = {
      energy: moodData.energy || 'medium',
      mood: moodData.mood || 'calm',
      preference: mode === 'home' ? 'indoor' : 'outdoor'
    };
    localStorage.setItem('honcours-mood-result', JSON.stringify(moodResult));
    
    onComplete(mode);
  };

  // 기분/피로도 체크 단계
  if (currentStep < 2) {
    const currentQuestion = steps[currentStep];
    
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center space-x-2 mb-4">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index <= currentStep ? 'bg-purple-500' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <h1 className="text-2xl font-bold text-gray-800">{currentQuestion.title}</h1>
            <p className="text-gray-600">{currentQuestion.subtitle}</p>
          </div>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <Card
                key={option.key}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105"
                onClick={() => handleStepAnswer(option.key)}
              >
                <CardContent className="p-4 flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                    {option.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{option.label}</h3>
                    <p className="text-sm text-gray-600">{option.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 활동 선택 단계 (기존과 동일하지만 에너지가 낮으면 집콕 우선 추천)
  const shouldRecommendHome = moodData.energy === 'low';
  const sortedOptions = shouldRecommendHome 
    ? [activityOptions[2], activityOptions[0], activityOptions[1]]  // home 옵션을 첫번째로
    : activityOptions;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">혼코스에 오신 걸 환영해요!</h1>
          <p className="text-xl text-gray-600 mb-2">혼자만의 특별한 시간을 만들어보세요</p>
          {shouldRecommendHome && (
            <div className="inline-flex items-center space-x-2 bg-green-50 border border-green-200 rounded-full px-4 py-2 mt-4">
              <Battery className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-700">에너지가 낮으니 집콕 활동을 추천드려요!</span>
            </div>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          {sortedOptions.map((option, index) => (
            <Card 
              key={option.mode}
              className={`overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                shouldRecommendHome && option.mode === 'home' ? 'ring-2 ring-green-400' : ''
              }`}
              onClick={() => handleModeSelect(option.mode)}
            >
              <CardHeader className="text-center pb-2">
                <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white`}>
                  {option.icon}
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
                {shouldRecommendHome && option.mode === 'home' && (
                  <Badge className="bg-green-500 text-white">추천!</Badge>
                )}
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-gray-600">{option.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
