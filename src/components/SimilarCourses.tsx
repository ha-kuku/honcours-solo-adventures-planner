
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, MapPin } from 'lucide-react';

interface SimilarCoursesProps {
  currentCourse: any;
  onCourseSelect: (course: any) => void;
}

export const SimilarCourses = ({ currentCourse, onCourseSelect }: SimilarCoursesProps) => {
  // 비슷한 코스를 찾는 로직 (실제로는 API 호출)
  const similarCourses = [
    {
      id: 'similar-1',
      title: '성수동 감성 카페 투어',
      description: '트렌디한 성수동 카페들을 둘러보는 코스',
      image: '/placeholder.svg',
      rating: 4.6,
      duration: '4시간',
      locations: [
        { name: '대림창고', id: '1' },
        { name: '어니언', id: '2' },
        { name: '카페 온다', id: '3' }
      ],
      tags: ['카페', '감성', '사진'],
      type: 'outdoor',
      congestionLevel: 'medium'
    },
    {
      id: 'similar-2',
      title: '이태원 다국적 문화 체험',
      description: '다양한 문화를 경험할 수 있는 이태원 투어',
      image: '/placeholder.svg',
      rating: 4.4,
      duration: '5시간',
      locations: [
        { name: '이태원 모스크', id: '1' },
        { name: '앤티크 가구 거리', id: '2' },
        { name: '세계음식 거리', id: '3' }
      ],
      tags: ['문화', '다국적', '체험'],
      type: 'outdoor',
      congestionLevel: 'high'
    }
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span>이런 코스는 어떠세요?</span>
        </CardTitle>
        <p className="text-sm text-gray-600">
          비슷한 취향의 사용자들이 높게 평가한 코스예요
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {similarCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <div className="relative">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <Badge 
                  className={`absolute top-2 right-2 ${
                    course.congestionLevel === 'low' ? 'bg-green-500' :
                    course.congestionLevel === 'medium' ? 'bg-yellow-500' : 'bg-red-500'
                  } text-white`}
                >
                  {course.congestionLevel === 'low' ? '한산함' :
                   course.congestionLevel === 'medium' ? '보통' : '붐빔'}
                </Badge>
              </div>
              
              <CardContent className="p-4">
                <h4 className="font-semibold text-lg mb-2">{course.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{course.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 mb-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    {course.locations.map((loc: any) => loc.name).join(' → ')}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {course.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
                
                <Button 
                  onClick={() => onCourseSelect(course)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  size="sm"
                >
                  이 코스 보기
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
