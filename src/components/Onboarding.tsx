
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MapPin, Users } from 'lucide-react';

interface OnboardingProps {
  onComplete: (isNovice: boolean) => void;
}

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [isNovice, setIsNovice] = useState<boolean | null>(null);

  const handleContinue = () => {
    if (isNovice !== null) {
      onComplete(isNovice);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            혼코스
          </h1>
          <p className="text-lg text-gray-600">
            혼자서도 하루가 꽉 찬<br />
            나만의 플랜을 만들어보세요
          </p>
        </div>

        <div className="space-y-4">
          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isNovice === true ? 'ring-2 ring-purple-500 bg-purple-50' : ''
            }`}
            onClick={() => setIsNovice(true)}
          >
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">혼행이 처음이에요</h3>
                <p className="text-sm text-gray-600">친절한 가이드와 추천 코스를 받아보세요</p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              isNovice === false ? 'ring-2 ring-purple-500 bg-purple-50' : ''
            }`}
            onClick={() => setIsNovice(false)}
          >
            <CardContent className="p-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">혼행 경험이 있어요</h3>
                <p className="text-sm text-gray-600">다양한 코스를 자유롭게 탐색해보세요</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Button 
          onClick={handleContinue}
          disabled={isNovice === null}
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-lg rounded-xl"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
};
