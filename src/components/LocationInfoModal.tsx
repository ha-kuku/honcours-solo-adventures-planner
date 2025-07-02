
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Clock, Phone, Globe, Star, Users, MapPin } from 'lucide-react';
import { LocationInfo } from '@/types/location';
import { MapIntegration } from './MapIntegration';

interface LocationInfoModalProps {
  location: LocationInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LocationInfoModal = ({ location, isOpen, onClose }: LocationInfoModalProps) => {
  if (!location) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{location.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* 이미지 */}
          {location.images && location.images.length > 0 && (
            <div className="relative">
              <img 
                src={location.images[0]} 
                alt={location.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-3 right-3">
                <Badge className={`${getCongestionColor(location.congestion)} text-white`}>
                  {getCongestionText(location.congestion)}
                </Badge>
              </div>
            </div>
          )}

          {/* 기본 정보 */}
          <div className="space-y-3">
            <p className="text-gray-600">{location.description}</p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{location.rating}</span>
                <span className="text-sm text-gray-500">({location.reviewCount})</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{location.duration}</span>
              </div>
            </div>

            {/* 태그 */}
            <div className="flex flex-wrap gap-2">
              {location.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="space-y-3 border-t pt-4">
            <div className="grid grid-cols-1 gap-3 text-sm">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                <div>
                  <span className="font-medium">영업시간</span>
                  <p className="text-gray-600">{location.hours}</p>
                  {location.closedDays.length > 0 && (
                    <p className="text-red-600 text-xs">휴무: {location.closedDays.join(', ')}</p>
                  )}
                </div>
              </div>

              {location.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">전화번호</span>
                  <span className="text-gray-600">{location.phone}</span>
                </div>
              )}

              {location.website && (
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-gray-400" />
                  <span className="font-medium">웹사이트</span>
                  <a href={location.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    방문하기
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* 지도 연동 */}
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">위치 정보</h4>
            <MapIntegration 
              locationName={location.name}
              address={location.address}
              latitude={37.5665 + Math.random() * 0.1}
              longitude={126.9780 + Math.random() * 0.1}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
