
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Star, Trophy, ArrowLeft, Home, Coffee, CheckCircle } from 'lucide-react';
import { mockRewards, mockBadges } from '@/lib/rewardsData';
import { UserPoints } from '@/types/rewards';
import { toast } from 'sonner';

interface RewardsPanelProps {
  userPoints: UserPoints;
  userBadges: string[];
  onBack: () => void;
}

export const RewardsPanel = ({ userPoints, userBadges, onBack }: RewardsPanelProps) => {
  const [selectedTab, setSelectedTab] = useState('rewards');
  const [cafeEligible, setCafeEligible] = useState(userPoints.available >= 3000);

  const handleRewardRedeem = (rewardId: string, pointsCost: number) => {
    if (userPoints.available < pointsCost) {
      toast.error('포인트가 부족합니다');
      return;
    }

    // Simulate reward redemption
    toast.success('리워드가 교환되었습니다!', {
      description: '마이페이지에서 쿠폰을 확인해보세요'
    });
  };

  const handleCafePartnership = () => {
    if (userPoints.available >= 3000) {
      toast.success('혼코스 제휴 카페 이용권이 활성화되었습니다!', {
        description: '전국 혼코스 제휴 카페에서 특별 할인을 받으세요'
      });
    }
  };

  const handleGoHome = () => {
    localStorage.removeItem('honcours-onboarding');
    window.location.reload();
  };

  const earnedBadges = mockBadges.filter(badge => userBadges.includes(badge.id));
  const availableBadges = mockBadges.filter(badge => !userBadges.includes(badge.id));

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center space-x-4">
            <Button 
              onClick={onBack}
              variant="outline" 
              size="icon"
              className="rounded-full"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">리워드 & 배지</h1>
          </div>
          <Button 
            onClick={handleGoHome}
            variant="outline" 
            size="icon"
            className="rounded-full"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>

        {/* Points Summary */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">내 포인트</h2>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-purple-600">{userPoints.available}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 text-center mb-4">
              <div>
                <p className="text-sm text-gray-600">총 획득</p>
                <p className="text-lg font-semibold text-gray-800">{userPoints.earned}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">사용 가능</p>
                <p className="text-lg font-semibold text-purple-600">{userPoints.available}</p>
              </div>
            </div>
            
            {/* 카페 제휴 기능 */}
            {cafeEligible && (
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Coffee className="w-8 h-8 text-amber-600" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-amber-800">혼코스 제휴 카페 이용 가능!</h3>
                      <p className="text-sm text-amber-700">3000P 이상으로 전국 제휴 카페에서 특별 혜택을 받으세요</p>
                    </div>
                    <Button 
                      onClick={handleCafePartnership}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      활성화
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>리워드</span>
            </TabsTrigger>
            <TabsTrigger value="badges" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>배지</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rewards" className="space-y-4">
            {/* 카페 제휴 리워드 추가 */}
            {cafeEligible && (
              <Card className="overflow-hidden border-amber-200">
                <div className="flex">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                    <Coffee className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">혼코스 제휴 카페 이용권</h3>
                        <p className="text-sm text-gray-600">전국 제휴 카페에서 20% 할인</p>
                        <p className="text-xs text-gray-500 mt-1">혼코스 제휴점 • 30일</p>
                      </div>
                      <Badge className="bg-amber-500 text-white">
                        VIP
                      </Badge>
                    </div>
                    <Button 
                      onClick={handleCafePartnership}
                      size="sm"
                      className="w-full bg-amber-600 hover:bg-amber-700"
                    >
                      제휴 혜택 받기
                    </Button>
                  </div>
                </div>
              </Card>
            )}
            
            {mockRewards.map((reward) => (
              <Card key={reward.id} className="overflow-hidden">
                <div className="flex">
                  <img 
                    src={reward.image} 
                    alt={reward.title}
                    className="w-24 h-24 object-cover"
                  />
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-800">{reward.title}</h3>
                        <p className="text-sm text-gray-600">{reward.description}</p>
                        <p className="text-xs text-gray-500 mt-1">{reward.partnerName} • {reward.expiryDays}일</p>
                      </div>
                      <Badge variant="outline" className="ml-2">
                        {reward.pointsCost}P
                      </Badge>
                    </div>
                    <Button 
                      onClick={() => handleRewardRedeem(reward.id, reward.pointsCost)}
                      disabled={userPoints.available < reward.pointsCost}
                      size="sm"
                      className="w-full"
                    >
                      {userPoints.available < reward.pointsCost ? '포인트 부족' : '교환하기'}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            {/* Earned Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">획득한 배지 ({earnedBadges.length})</h3>
              <div className="grid grid-cols-2 gap-3">
                {earnedBadges.map((badge) => (
                  <Card key={badge.id} className="p-4 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h4 className="font-semibold text-gray-800 text-sm">{badge.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Badges */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">획득 가능한 배지</h3>
              <div className="grid grid-cols-2 gap-3">
                {availableBadges.map((badge) => (
                  <Card key={badge.id} className="p-4 text-center opacity-60">
                    <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                    <h4 className="font-semibold text-gray-600 text-sm">{badge.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{badge.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
