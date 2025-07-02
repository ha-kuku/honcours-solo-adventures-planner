
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Users, AlertTriangle } from 'lucide-react';
import { LocationInfo } from '@/types/location';

interface AlternativeLocationProps {
  originalLocation: LocationInfo;
  alternatives: LocationInfo[];
  onLocationChange: (newLocation: LocationInfo) => void;
  onKeepOriginal: () => void;
}

export const AlternativeLocation = ({ 
  originalLocation, 
  alternatives, 
  onLocationChange, 
  onKeepOriginal 
}: AlternativeLocationProps) => {
  const getCongestionColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCongestionText = (level: string) => {
    switch (level) {
      case 'low': return '한산함';
      case 'medium': return '보통';
      case 'high': return '붐빔';
      default: return '정보없음';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">혼잡도 알림</h2>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              <strong>{originalLocation.name}</strong>이 현재 혼잡합니다.
            </p>
            <p className="text-sm text-gray-500">
              비슷한 분위기의 다른 장소를 추천드릴게요!
            </p>
          </div>

          {/* 원래 장소 */}
          <Card className="mb-4 border-orange-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{originalLocation.name}</CardTitle>
                <Badge className={`${getCongestionColor(originalLocation.congestion)} text-white`}>
                  {getCongestionText(originalLocation.congestion)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span>{originalLocation.address}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{originalLocation.duration}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 대안 장소들 */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-800">추천 대안 장소</h3>
            {alternatives.map((location) => (
              <Card key={location.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-800">{location.name}</h4>
                    <Badge className={`${getCongestionColor(location.congestion)} text-white`}>
                      {getCongestionText(location.congestion)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{location.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{location.address}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{location.duration}</span>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => onLocationChange(location)}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      여기로 변경
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 액션 버튼 */}
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={onKeepOriginal}
              className="flex-1"
            >
              원래 장소 유지
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
