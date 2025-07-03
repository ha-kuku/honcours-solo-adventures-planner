
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';
import { toast } from 'sonner';

interface MapIntegrationProps {
  locationName: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export const MapIntegration = ({ locationName, address, latitude, longitude }: MapIntegrationProps) => {
  const handleNaverMap = () => {
    const mockLatitude = latitude || 37.5665;
    const mockLongitude = longitude || 126.9780;
    
    const naverMapUrl = `https://map.naver.com/v5/search/${encodeURIComponent(locationName)}?c=${mockLongitude},${mockLatitude},15,0,0,0,dh`;
    
    console.log('Opening Naver Map:', { locationName, address, latitude: mockLatitude, longitude: mockLongitude });
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = naverMapUrl;
    } else {
      window.open(naverMapUrl, '_blank');
    }
    
    toast.success('네이버 지도로 이동합니다');
  };

  const handleKakaoMap = () => {
    const mockLatitude = latitude || 37.5665;
    const mockLongitude = longitude || 126.9780;
    
    const kakaoMapUrl = `https://map.kakao.com/link/search/${encodeURIComponent(locationName)}`;
    
    console.log('Opening Kakao Map:', { locationName, address, latitude: mockLatitude, longitude: mockLongitude });
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = kakaoMapUrl;
    } else {
      window.open(kakaoMapUrl, '_blank');
    }
    
    toast.success('카카오맵으로 이동합니다');
  };

  const handleNaverDirections = () => {
    // 현재 위치에서 목적지로의 길찾기
    const mockLatitude = latitude || 37.5665;
    const mockLongitude = longitude || 126.9780;
    
    // 네이버 지도 길찾기 URL (현재위치 → 목적지)
    const directionsUrl = `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(locationName)}/-/-/${mockLongitude},${mockLatitude}/-/transit`;
    
    console.log('Opening Naver Directions:', { locationName, address, latitude: mockLatitude, longitude: mockLongitude });
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = directionsUrl;
    } else {
      window.open(directionsUrl, '_blank');
    }
    
    toast.success('네이버 지도 길찾기로 이동합니다');
  };

  const handleKakaoDirections = () => {
    // 현재 위치에서 목적지로의 길찾기
    const mockLatitude = latitude || 37.5665;
    const mockLongitude = longitude || 126.9780;
    
    // 카카오맵 길찾기 URL
    const directionsUrl = `https://map.kakao.com/link/to/${encodeURIComponent(locationName)},${mockLatitude},${mockLongitude}`;
    
    console.log('Opening Kakao Directions:', { locationName, address, latitude: mockLatitude, longitude: mockLongitude });
    
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      window.location.href = directionsUrl;
    } else {
      window.open(directionsUrl, '_blank');
    }
    
    toast.success('카카오맵 길찾기로 이동합니다');
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
        <MapPin className="w-4 h-4" />
        <span>{address}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-3">
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

      {/* 길찾기 버튼들 */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={handleNaverDirections}
          className="flex items-center space-x-2 text-sm bg-green-600 hover:bg-green-700"
        >
          <Navigation className="w-4 h-4" />
          <span>네이버 길찾기</span>
        </Button>
        
        <Button
          onClick={handleKakaoDirections}
          className="flex items-center space-x-2 text-sm bg-yellow-500 hover:bg-yellow-600"
        >
          <Navigation className="w-4 h-4" />
          <span>카카오 길찾기</span>
        </Button>
      </div>
    </div>
  );
};
