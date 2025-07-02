
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Navigation, CheckCircle, Users, AlertTriangle } from 'lucide-react';
import { AlternativeLocation } from '@/components/AlternativeLocation';
import { LocationInfo } from '@/types/location';

interface LocationGuideProps {
  course: any;
  currentLocation: number;
  onLocationUpdate: (index: number) => void;
}

export const LocationGuide = ({ course, currentLocation, onLocationUpdate }: LocationGuideProps) => {
  const [showAlternatives, setShowAlternatives] = useState(false);
  const [currentLocationData, setCurrentLocationData] = useState<LocationInfo>(course.locations[currentLocation]);
  const [alternativeLocations, setAlternativeLocations] = useState<LocationInfo[]>([]);

  useEffect(() => {
    // Check congestion level and show alternatives if needed
    const location = course.locations[currentLocation];
    setCurrentLocationData(location);
    
    // Simulate congestion check - randomly show alternatives for high congestion
    if (location.congestion === 'high' || Math.random() > 0.7) {
      // Generate mock alternative locations
      const alternatives = [
        {
          ...location,
          id: location.id + '_alt1',
          name: location.name + ' 대안 1',
          description: '비슷한 분위기의 다른 장소',
          congestion: 'low',
          address: location.address + ' 근처'
        },
        {
          ...location,
          id: location.id + '_alt2', 
          name: location.name + ' 대안 2',
          description: '조금 더 한적한 곳',
          congestion: 'medium',
          address: location.address + ' 인근'
        }
      ];
      setAlternativeLocations(alternatives);
      
      // Show alternatives modal after a delay
      setTimeout(() => {
        setShowAlternatives(true);
      }, 2000);
    }
  }, [currentLocation, course.locations]);

  const handleLocationChange = (newLocation: LocationInfo) => {
    setCurrentLocationData(newLocation);
    setShowAlternatives(false);
    // Update the course data with new location
    course.locations[currentLocation] = newLocation;
  };

  const handleKeepOriginal = () => {
    setShowAlternatives(false);
  };

  const handleNextLocation = () => {
    onLocationUpdate(currentLocation + 1);
  };

  const handleCompleteLocation = () => {
    onLocationUpdate(currentLocation + 1);
  };

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
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-gray-800">진행 상황</h2>
            <span className="text-sm text-gray-600">
              {currentLocation + 1} / {course.locations.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentLocation + 1) / course.locations.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Current Location Card */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{currentLocationData.name}</CardTitle>
              <Badge className={`${getCongestionColor(currentLocationData.congestion)} text-white`}>
                {getCongestionText(currentLocationData.congestion)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{currentLocationData.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{currentLocationData.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>예상 소요시간: {currentLocationData.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>영업시간: {currentLocationData.hours}</span>
              </div>
            </div>

            {/* Warning for high congestion */}
            {currentLocationData.congestion === 'high' && (
              <div className="flex items-center space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium text-orange-800">혼잡도 높음</p>
                  <p className="text-xs text-orange-600">대기시간이 길 수 있어요</p>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button 
                onClick={handleCompleteLocation}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                완료
              </Button>
              <Button 
                variant="outline"
                onClick={handleNextLocation}
                className="flex-1"
              >
                <Navigation className="w-4 h-4 mr-2" />
                건너뛰기
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alternative Locations Modal */}
        {showAlternatives && (
          <AlternativeLocation
            originalLocation={course.locations[currentLocation]}
            alternatives={alternativeLocations}
            onLocationChange={handleLocationChange}
            onKeepOriginal={handleKeepOriginal}
          />
        )}

        {/* Tips for current location */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg text-blue-800">
              📍 {currentLocationData.name} 팁
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-blue-700">
              <p>• 사진 촬영하기 좋은 스팟을 찾아보세요</p>
              <p>• 혼자서도 편안하게 즐길 수 있는 자리를 선택하세요</p>
              {currentLocationData.congestion === 'high' && (
                <p>• 붐비는 시간대이니 여유롭게 즐기세요</p>
              )}
              {currentLocationData.type === 'cafe' && (
                <p>• 창가 자리에서 여유로운 시간을 보내보세요</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
