import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Star, Users, Home, Gift, User } from 'lucide-react';
import { mockCourses } from '@/lib/mockData';
import { UserMode } from '@/pages/Index';

interface CourseRecommendationProps {
  userMode: UserMode;
  onCourseSelect: (course: any) => void;
  onShowRewards: () => void;
  onShowMyPage: () => void;
  userPoints: { available: number };
}

export const CourseRecommendation = ({ 
  userMode, 
  onCourseSelect, 
  onShowRewards, 
  onShowMyPage, 
  userPoints 
}: CourseRecommendationProps) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchCourses = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredCourses;
      if (userMode === 'novice') {
        filteredCourses = mockCourses.filter(course => course.difficulty === 'beginner' && course.type === 'outdoor');
      } else if (userMode === 'home') {
        filteredCourses = mockCourses.filter(course => course.type === 'home');
      } else {
        filteredCourses = mockCourses.filter(course => course.type === 'outdoor');
      }
      
      setCourses(filteredCourses);
      setLoading(false);
    };

    fetchCourses();
  }, [userMode]);

  const handleGoHome = () => {
    // Reset onboarding and go back to start
    localStorage.removeItem('honcours-onboarding');
    localStorage.removeItem('honcours-user-mode');
    window.location.reload();
  };

  const getTitle = () => {
    switch (userMode) {
      case 'novice':
        return '혼행 입문 코스';
      case 'home':
        return '집콕 힐링 코스';
      default:
        return '추천 코스';
    }
  };

  const getDescription = () => {
    switch (userMode) {
      case 'novice':
        return '처음 혼자 떠나는 여행을 위한 검증된 코스예요';
      case 'home':
        return '집에서 편안하게 즐길 수 있는 알찬 활동들이에요';
      default:
        return '당신만을 위한 특별한 하루를 만들어보세요';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600">맞춤 코스를 찾고 있어요...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {getTitle()}
          </h1>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={onShowRewards}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Gift className="w-4 h-4" />
              <span>{userPoints.available}P</span>
            </Button>
            <Button 
              onClick={onShowMyPage}
              variant="outline" 
              size="icon"
              className="rounded-full"
            >
              <User className="w-4 h-4" />
            </Button>
            <Button 
              onClick={handleGoHome}
              variant="outline" 
              size="icon"
              className="rounded-full"
            >
              <Home className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <p className="text-gray-600">
            {getDescription()}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${
                    course.type === 'home' ? 'bg-green-500' :
                    course.congestionLevel === 'low' ? 'bg-green-500' :
                    course.congestionLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}>
                    {course.type === 'home' ? '집콕' :
                     course.congestionLevel === 'low' ? '한산함' :
                     course.congestionLevel === 'medium' ? '보통' : '붐빔'}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="text-sm text-gray-600">
                      {course.locations.map((location: any, index: number) => (
                        <span key={location.id}>
                          {location.name}
                          {index < course.locations.length - 1 && ' → '}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      onClick={() => onCourseSelect(course)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      코스 자세히 보기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
