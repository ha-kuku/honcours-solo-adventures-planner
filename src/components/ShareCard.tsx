
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Download, Facebook, Instagram, ArrowLeft, Home } from 'lucide-react';
import { ShareCard as ShareCardType } from '@/types/rewards';
import { toast } from 'sonner';

interface ShareCardProps {
  shareData: ShareCardType;
  onBack: () => void;
}

export const ShareCard = ({ shareData, onBack }: ShareCardProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleShareToSocial = async (platform: 'facebook' | 'instagram') => {
    setIsGenerating(true);
    
    // Simulate card generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const shareText = `혼코스 "${shareData.courseTitle}" 완주! 🎉\n획득 배지: ${shareData.badges.length}개\n포인트: +${shareData.totalPoints}P\n\n#혼코스 #혼행 #나만의시간`;
    
    if (platform === 'facebook') {
      // In real app, use Facebook SDK
      navigator.share?.({
        title: '혼코스 완주!',
        text: shareText,
        url: window.location.href
      });
    } else if (platform === 'instagram') {
      // In real app, generate actual image and open Instagram
      toast.success('이미지가 생성되었습니다!', {
        description: '갤러리에서 확인하고 인스타그램에 공유해보세요'
      });
    }
    
    setIsGenerating(false);
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    
    // Simulate image generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success('요약 카드가 저장되었습니다!', {
      description: '갤러리에서 확인해보세요'
    });
    
    setIsGenerating(false);
  };

  const handleGoHome = () => {
    localStorage.removeItem('honcours-onboarding');
    window.location.reload();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
            <h1 className="text-2xl font-bold text-gray-800">공유하기</h1>
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

        {/* Preview Card */}
        <Card className="mb-6 overflow-hidden bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold">혼코스 완주!</h2>
            <p className="text-purple-100">{formatDate(shareData.completedAt)}</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">{shareData.courseTitle}</h3>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {shareData.locations.map((location, index) => (
                  <Badge key={index} variant="secondary" className="bg-white/20 text-white">
                    {location}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">{shareData.badges.length}</div>
                <div className="text-sm text-purple-100">획득 배지</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-2xl font-bold">+{shareData.totalPoints}</div>
                <div className="text-sm text-purple-100">포인트</div>
              </div>
            </div>

            {shareData.badges.length > 0 && (
              <div className="text-center">
                <p className="text-sm text-purple-100 mb-2">새로 획득한 배지</p>
                <div className="flex justify-center space-x-2">
                  {shareData.badges.slice(0, 3).map((badge, index) => (
                    <div key={index} className="text-2xl">{badge.icon}</div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Share Options */}
        <div className="space-y-4">
          <Button 
            onClick={() => handleShareToSocial('instagram')}
            disabled={isGenerating}
            className="w-full h-12 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
          >
            <Instagram className="w-5 h-5 mr-2" />
            {isGenerating ? '카드 생성 중...' : '인스타그램 스토리 공유'}
          </Button>

          <Button 
            onClick={() => handleShareToSocial('facebook')}
            disabled={isGenerating}
            variant="outline"
            className="w-full h-12"
          >
            <Facebook className="w-5 h-5 mr-2" />
            페이스북 공유
          </Button>

          <Button 
            onClick={handleDownload}
            disabled={isGenerating}
            variant="outline"
            className="w-full h-12"
          >
            <Download className="w-5 h-5 mr-2" />
            이미지로 저장
          </Button>

          <Button 
            onClick={() => {
              navigator.share?.({
                title: '혼코스 완주!',
                text: `혼코스 "${shareData.courseTitle}" 완주했어요! 🎉`,
                url: window.location.href
              });
            }}
            variant="outline"
            className="w-full h-12"
          >
            <Share2 className="w-5 h-5 mr-2" />
            기타 앱으로 공유
          </Button>
        </div>
      </div>
    </div>
  );
};
