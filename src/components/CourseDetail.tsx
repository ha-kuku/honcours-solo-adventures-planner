import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, MapPin, Star, Users, Camera, Coffee, Film, Home, Info } from 'lucide-react';
import { LocationInfoModal } from '@/components/LocationInfoModal';
import { TipsPanel } from '@/components/TipsPanel';
import { SimilarCourses } from '@/components/SimilarCourses';
import { LocationInfo } from '@/types/location';

interface CourseDetailProps {
  course: any;
  onStartPlan: () => void;
  onBack: () => void;
}

export const CourseDetail = ({ course, onStartPlan, onBack }: CourseDetailProps) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'exhibition': return <Camera className="w-5 h-5" />;
      case 'cafe': return <Coffee className="w-5 h-5" />;
      case 'cinema': return <Film className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  const handleLocationClick = (location: any) => {
    // Mock detailed location data
    const detailedLocation: LocationInfo = {
      ...location,
      address: '서울시 마포구 홍익로 123',
      hours: '09:00 - 22:00',
      closedDays: ['일요일'],
      phone: '02-1234-5678',
      website: 'https://example.com',
      rating: 4.5,
      reviewCount: 128,
      tags: ['카페', '힐링', '인스타'],
      images: ['/placeholder.svg', '/placeholder.svg']
    };
    
    setSelectedLocation(detailedLocation);
    setIsLocationModalOpen(true);
  };

  const handleStartPlan = () => {
    // Simulate saving plan
    const planData = {
      courseId: course.id,
      userId: 'user_123',
      startTime: new Date().toISOString(),
      status: 'active'
    };
    
    console.log('Saving plan:', planData);
    // In real app: POST /users/{userId}/courses
    
    onStartPlan();
  };

  const handleGoHome = () => {
    // Reset onboarding and go back to start
    localStorage.removeItem('honcours-onboarding');
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
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
            <h1 className="text-2xl font-bold text-gray-800">코스 상세</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full h-64 object-cover"
              />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{course.title}</h2>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                  <Badge className={`${
                    course.congestionLevel === 'low' ? 'bg-green-500' :
                    course.congestionLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}>
                    {course.congestionLevel === 'low' ? '한산함' :
                     course.congestionLevel === 'medium' ? '보통' : '붐빔'}
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating} ({course.reviewCount}개 후기)</span>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-800">코스 일정</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                {course.locations.map((location: any, index: number) => (
                  <div 
                    key={location.id} 
                    className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => handleLocationClick(location)}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                      {getLocationIcon(location.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-gray-800">{location.name}</h4>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Info className="w-3 h-3" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600">{location.description}</p>
                      <p className="text-xs text-gray-500 mt-1">예상 소요시간: {location.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">{location.time}</div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {location.congestion}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <SimilarCourses 
              currentCourse={course}
              onCourseSelect={onStartPlan}
            />

            <div className="sticky bottom-4 bg-white p-4 rounded-xl shadow-lg border">
              <Button 
                onClick={handleStartPlan}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-lg rounded-xl"
              >
                이대로 출발할래요!
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <TipsPanel 
              tips={course.tips}
              courseType={course.type}
            />
          </div>
        </div>

        <LocationInfoModal 
          location={selectedLocation}
          isOpen={isLocationModalOpen}
          onClose={() => setIsLocationModalOpen(false)}
        />
      </div>
    </div>
  );
};
