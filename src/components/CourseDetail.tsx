import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, MapPin, Star, Users, Camera, Coffee, Film, Home } from 'lucide-react';

interface CourseDetailProps {
  course: any;
  onStartPlan: () => void;
  onBack: () => void;
}

export const CourseDetail = ({ course, onStartPlan, onBack }: CourseDetailProps) => {
  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'exhibition': return <Camera className="w-5 h-5" />;
      case 'cafe': return <Coffee className="w-5 h-5" />;
      case 'cinema': return <Film className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
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

        <div className="space-y-6">
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
                <div key={location.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white">
                    {getLocationIcon(location.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{location.name}</h4>
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

          <Card>
            <CardHeader>
              <h3 className="text-xl font-semibold text-gray-800">혼행 팁</h3>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                {course.tips.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="sticky bottom-4 bg-white p-4 rounded-xl shadow-lg border">
            <Button 
              onClick={handleStartPlan}
              className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-lg rounded-xl"
            >
              이대로 출발할래요!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
