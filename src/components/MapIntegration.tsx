
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface MapIntegrationProps {
  locationName: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export const MapIntegration = ({ locationName, address, latitude, longitude }: MapIntegrationProps) => {
  const handleNaverMap = () => {
    // Mock 데이터로 처리 - 실제로는 Naver Map API 연동
    const mockLatitude = latitude || 37.5665;
    const mockLongitude = longitude || 126.9780;
    
    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(locationName)}?c=${mockLongitude},${mockLatitude},15,0,0,0,dh`;
    
    console.log('Opening Naver Map:', { locationName, address, latitude: mockLatitude, longitude: mockLongitude });
    
    // 모바일에서는 앱으로, 데스크톱에서는 웹으로 열기
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = naverMapUrl;
    } else {
      window.open(naverMapUrl, '_blank');
    }
    
    toast.success('네이버 지도로 이동합니다');
  };

  const handleKakaoMap = () => {
    // Mock 데이터로 처리 - 실제로는 Kakao Map API 연동
    const mockLatitude = latitude || 37.5665;
    const mockLongitude = longitude || 126.9780;
    
    const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(locationName)}`;
    
    console.log('Opening Kakao Map:', { locationName, address, latitude: mockLatitude, longitude: mockLongitude });
    
    // 모바일에서는 앱으로, 데스크톱에서는 웹으로 열기
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = kakaoMapUrl;
    } else {
      window.open(kakaoMapUrl, '_blank');
    }
    
    toast.success('카카오맵으로 이동합니다');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
        <MapPin className="w-4 h-4" />
        <span>{address}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleNaverMap}
          variant="outline"
          className="flex items-center space-x-2 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          <span>네이버지도</span>
        </Button>
        
        <Button
          onClick={handleKakaoMap}
          variant="outline"
          className="flex items-center space-x-2 text-sm"
        >
          <ExternalLink className="w-4 h-4" />
          <span>카카오맵</span>
        </Button>
      </div>
    </div>
  );
};
