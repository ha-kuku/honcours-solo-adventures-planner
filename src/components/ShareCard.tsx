
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Copy, MessageCircle, Star, Gift, User, Home } from 'lucide-react';
import { ShareCard as ShareCardType } from '@/types/rewards';
import { toast } from 'sonner';

interface ShareCardProps {
  shareData: ShareCardType;
  onBack: () => void;
  onShowRewards?: () => void;
  onShowMyPage?: () => void;
  userPoints?: { available: number };
}

export const ShareCard = ({ shareData, onBack, onShowRewards, onShowMyPage, userPoints }: ShareCardProps) => {
  const [isSharing, setIsSharing] = useState(false);

  const shareText = `${shareData.courseTitle} 혼코스 완주! 🎉
${shareData.locations.join(' → ')}
총 ${shareData.totalPoints}P 획득했어요! #혼코스 #혼행`;

  const handleShare = async (platform: 'kakao' | 'copy' | 'native') => {
    setIsSharing(true);
    
    try {
      switch (platform) {
        case 'kakao':
          // KakaoTalk 공유 API (Mock)
          console.log('Sharing to KakaoTalk:', shareText);
          toast.success('카카오톡으로 공유했어요!');
          break;
          
        case 'copy':
          await navigator.clipboard.writeText(shareText);
          toast.success('클립보드에 복사되었어요!');
          break;
          
        case 'native':
          if (navigator.share) {
            await navigator.share({
              title: '혼코스 완주!',
              text: shareText,
              url: window.location.href
            });
          } else {
            await navigator.clipboard.writeText(shareText);
            toast.success('클립보드에 복사되었어요!');
          }
          break;
      }
    } catch (error) {
      toast.error('공유하기에 실패했어요');
    } finally {
      setIsSharing(false);
    }
  };

  const handleGoHome = () => {
    localStorage.removeItem('honcours-onboarding');
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        {/* 상단 버튼들 */}
        <div className="flex items-center justify-between pt-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">완주 축하해요! 🎉</h1>
          <div className="flex items-center space-x-2">
            {onShowRewards && userPoints && (
              <Button 
                onClick={onShowRewards}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Gift className="w-4 h-4" />
                <span>{userPoints.available}P</span>
                {userPoints.available >= 3000 && (
                  <Badge className="bg-yellow-500 text-white ml-1">카페이용가능</Badge>
                )}
              </Button>
            )}
            {onShowMyPage && (
              <Button 
                onClick={onShowMyPage}
                variant="outline" 
                size="icon"
                className="rounded-full"
              >
                <User className="w-4 h-4" />
              </Button>
            )}
            <Button 
              onClick={handleGoHome}
              variant="outline" 
              size="icon"
              className="rounded-full"
            >
              <Home className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">{shareData.courseTitle}</h2>
                <p className="opacity-90">
                  {new Date(shareData.completedAt).toLocaleDateString('ko-KR', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm opacity-90">방문 장소</div>
              <div className="text-lg">
                {shareData.locations.join(' → ')}
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">+{shareData.totalPoints}P</div>
                <div className="text-sm text-gray-600">획득 포인트</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{shareData.badges.length}</div>
                <div className="text-sm text-gray-600">새 배지</div>
              </div>
            </div>
            
            {shareData.badges.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700">획득한 배지</div>
                <div className="flex flex-wrap gap-2">
                  {shareData.badges.map((badge, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {badge.icon} {badge.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Share2 className="w-5 h-5" />
              <span>친구들에게 자랑하기</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700 whitespace-pre-line">{shareText}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => handleShare('kakao')}
                disabled={isSharing}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                카카오톡
              </Button>
              
              <Button
                onClick={() => handleShare('copy')}
                disabled={isSharing}
                variant="outline"
              >
                <Copy className="w-4 h-4 mr-2" />
                복사하기
              </Button>
              
              <Button
                onClick={() => handleShare('native')}
                disabled={isSharing}
                variant="outline"
              >
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            onClick={onBack}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-lg rounded-xl"
          >
            새로운 혼코스 시작하기
          </Button>
        </div>
      </div>
    </div>
  );
};
