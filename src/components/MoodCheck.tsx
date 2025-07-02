
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Battery, Sun, Moon, Zap, Coffee } from 'lucide-react';

export type MoodResult = {
  energy: 'low' | 'medium' | 'high';
  mood: 'calm' | 'active' | 'social';
  preference: 'indoor' | 'outdoor';
};

interface MoodCheckProps {
  onComplete: (result: MoodResult) => void;
}

export const MoodCheck = ({ onComplete }: MoodCheckProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    energy?: 'low' | 'medium' | 'high';
    mood?: 'calm' | 'active' | 'social';
    preference?: 'indoor' | 'outdoor';
  }>({});

  const questions = [
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
    },
    {
      title: '어디서 시간을 보내고 싶으세요?',
      subtitle: '편한 곳을 선택해주세요',
      options: [
        { key: 'indoor', label: '집에서', icon: <Moon className="w-5 h-5" />, desc: '집콕하며 알차게 보내기' },
        { key: 'outdoor', label: '밖에서', icon: <Sun className="w-5 h-5" />, desc: '외출해서 새로운 경험하기' }
      ]
    }
  ];

  const handleAnswer = (key: string) => {
    const newAnswers = { ...answers, [questions[currentStep].title === '지금 내 에너지 레벨은?' ? 'energy' : questions[currentStep].title === '어떤 기분이신가요?' ? 'mood' : 'preference']: key };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newAnswers as MoodResult);
    }
  };

  const currentQuestion = questions[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center space-x-2 mb-4">
            {questions.map((_, index) => (
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
              onClick={() => handleAnswer(option.key)}
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
};
