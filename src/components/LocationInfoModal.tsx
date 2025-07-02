
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Phone, Globe, Star, Calendar, X } from 'lucide-react';
import { LocationInfo } from '@/types/location';

interface LocationInfoModalProps {
  location: LocationInfo | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LocationInfoModal = ({ location, isOpen, onClose }: LocationInfoModalProps) => {
  if (!location) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{location.name}</span>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* 이미지 갤러리 */}
          <div className="grid grid-cols-2 gap-2">
            {location.images.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${location.name} ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>

          {/* 기본 정보 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{location.rating}</span>
                <span className="text-sm text-gray-600">({location.reviewCount}개 후기)</span>
              </div>
              <Badge variant="outline">{location.type}</Badge>
            </div>
            
            <p className="text-gray-600">{location.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {location.tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* 위치 및 연락처 정보 */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">주소</p>
                <p className="text-sm text-gray-600">{location.address}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">영업시간</p>
                <p className="text-sm text-gray-600">{location.hours}</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">휴무일</p>
                <p className="text-sm text-gray-600">
                  {location.closedDays.length > 0 ? location.closedDays.join(', ') : '연중무휴'}
                </p>
              </div>
            </div>
            
            {location.phone && (
              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">전화번호</p>
                  <p className="text-sm text-gray-600">{location.phone}</p>
                </div>
              </div>
            )}
            
            {location.website && (
              <div className="flex items-start space-x-3">
                <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">웹사이트</p>
                  <a 
                    href={location.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    {location.website}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
