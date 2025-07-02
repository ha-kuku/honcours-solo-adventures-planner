
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, Clock, Heart, MapPin } from 'lucide-react';

interface TipsPanelProps {
  tips: string[];
  courseType?: 'outdoor' | 'home';
}

export const TipsPanel = ({ tips, courseType = 'outdoor' }: TipsPanelProps) => {
  const getTipIcon = (tip: string) => {
    if (tip.includes('시간') || tip.includes('시각')) return <Clock className="w-4 h-4" />;
    if (tip.includes('위치') || tip.includes('장소')) return <MapPin className="w-4 h-4" />;
    if (tip.includes('마음') || tip.includes('힐링')) return <Heart className="w-4 h-4" />;
    return <Lightbulb className="w-4 h-4" />;
  };

  const getTipCategory = (tip: string) => {
    if (tip.includes('시간') || tip.includes('시각')) return '시간 관리';
    if (tip.includes('위치') || tip.includes('장소')) return '장소 정보';
    if (tip.includes('마음') || tip.includes('힐링')) return '마음가짐';
    return '일반 팁';
  };

  return (
    <Card className="sticky top-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-purple-800">
          <Lightbulb className="w-5 h-5" />
          <span>혼행 팁</span>
          <Badge variant="secondary" className="ml-2">
            {courseType === 'home' ? '집콕' : '야외'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 flex-shrink-0">
              {getTipIcon(tip)}
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <Badge variant="outline" className="text-xs">
                  {getTipCategory(tip)}
                </Badge>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">{tip}</p>
            </div>
          </div>
        ))}
        
        <div className="mt-4 p-3 bg-purple-100 rounded-lg">
          <p className="text-xs text-purple-700 text-center">
            💡 혼행을 더 즐겁게! 각 장소에서 사진을 찍어 추억을 남겨보세요
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
