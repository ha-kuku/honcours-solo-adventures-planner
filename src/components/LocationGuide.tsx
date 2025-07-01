import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Clock, CheckCircle, Camera, Coffee, Film, Home, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface LocationGuideProps {
  course: any;
  currentLocation: number;
  onLocationUpdate: (locationIndex: number) => void;
}

export const LocationGuide = ({ course, currentLocation, onLocationUpdate }: LocationGuideProps) => {
  const [arrivedAt, setArrivedAt] = useState<number[]>([]);
  
  const currentLocationData = course.locations[currentLocation];
  const isLastLocation = currentLocation === course.locations.length - 1;

  useEffect(() => {
    // Simulate GPS arrival detection
    const checkArrival = () => {
      if (currentLocationData && !arrivedAt.includes(currentLocation)) {
        // Simulate arrival after 3 seconds
        setTimeout(() => {
          setArrivedAt(prev => [...prev, currentLocation]);
          toast.success(`${currentLocationData.name}에 도착했습니다!`, {
            description: currentLocationData.arrivalTip,
            duration: 5000
          });
        }, 3000);
      }
    };

    checkArrival();
  }, [currentLocation, currentLocationData, arrivedAt]);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'exhibition': return <Camera className="w-5 h-5" />;
      case 'cafe': return <Coffee className="w-5 h-5" />;
      case 'cinema': return <Film className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const handleNextLocation = () => {
    if (isLastLocation) {
      onLocationUpdate(currentLocation + 1);
    } else {
      onLocationUpdate(currentLocation + 1);
    }
  };

  const handleLocationArrival = (locationIndex: number) => {
    // Simulate manual check-in
    if (!arrivedAt.includes(locationIndex)) {
      setArrivedAt(prev => [...prev, locationIndex]);
      toast.success(`${course.locations[locationIndex].name}에 체크인했습니다!`);
    }
  };

  const handleGoHome = () => {
    // Reset onboarding and go back to start
    localStorage.removeItem('honcours-onboarding');
    window.location.reload();
  };

  const handleGoBack = () => {
    if (currentLocation > 0) {
      onLocationUpdate(currentLocation - 1);
    }
  };

  if (!currentLocationData) {
    return null;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center space-x-4">
            {currentLocation > 0 && (
              <Button 
                onClick={handleGoBack}
                variant="outline" 
                size="icon"
                className="rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">혼코스 진행중</h1>
              <div className="flex items-center justify-center space-x-2">
                <Badge variant="outline" className="text-sm">
                  {currentLocation + 1} / {course.locations.length}
                </Badge>
                <span className="text-gray-600">• {course.title}</span>
              </div>
            </div>
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

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {course.locations.map((location: any, index: number) => (
              <div key={location.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentLocation 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' 
                    : 'bg-gray-200 text-gray-400'
                }`}>
                  {arrivedAt.includes(index) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    getLocationIcon(location.type)
                  )}
                </div>
                {index < course.locations.length - 1 && (
                  <div className={`h-0.5 w-16 mt-4 ${
                    index < currentLocation ? 'bg-purple-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Location Card */}
        <Card className="mb-6 overflow-hidden shadow-lg">
          <div className="relative">
            <img 
              src={currentLocationData.image || course.image} 
              alt={currentLocationData.name}
              className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 right-4">
              <Badge className="bg-purple-500 text-white">
                현재 위치
              </Badge>
            </div>
          </div>
          
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">{currentLocationData.name}</h2>
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{currentLocationData.time}</span>
              </div>
            </div>
            <p className="text-gray-600">{currentLocationData.description}</p>
          </CardHeader>
          
          <CardContent>
            <div className="space-y-4">
              {currentLocationData.tip && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">💡 혼행 팁</h4>
                  <p className="text-sm text-purple-700">{currentLocationData.tip}</p>
                </div>
              )}
              
              <div className="flex space-x-2">
                {!arrivedAt.includes(currentLocation) && (
                  <Button 
                    onClick={() => handleLocationArrival(currentLocation)}
                    variant="outline"
                    className="flex-1"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    도착 체크인
                  </Button>
                )}
                
                <Button 
                  onClick={handleNextLocation}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  disabled={!arrivedAt.includes(currentLocation)}
                >
                  {isLastLocation ? '코스 완료' : '다음 장소로'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Locations */}
        {!isLastLocation && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-800">다음 일정</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {course.locations.slice(currentLocation + 1).map((location: any, index: number) => (
                  <div key={location.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      {getLocationIcon(location.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{location.name}</h4>
                      <p className="text-sm text-gray-600">{location.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
