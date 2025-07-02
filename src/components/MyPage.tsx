
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Calendar, 
  Star, 
  MapPin, 
  Trophy, 
  Heart,
  PlusCircle,
  Settings
} from 'lucide-react';
import { MyPageData } from '@/types/location';

interface MyPageProps {
  myPageData: MyPageData;
  onBack: () => void;
  onCreateCourse: () => void;
}

export const MyPage = ({ myPageData, onBack, onCreateCourse }: MyPageProps) => {
  const [activeTab, setActiveTab] = useState('completed');

  const getBadgeIcon = (badgeId: string) => {
    switch (badgeId) {
      case 'first-solo': return '🎯';
      case 'cafe-hopper': return '☕';
      case 'exhibition-lover': return '🎨';
      case 'home-master': return '🏠';
      default: return '🏆';
    }
  };

  const getBadgeName = (badgeId: string) => {
    switch (badgeId) {
      case 'first-solo': return '첫 혼행';
      case 'cafe-hopper': return '카페 순례자';
      case 'exhibition-lover': return '전시 애호가';
      case 'home-master': return '홈 마스터';
      default: return '달성';
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 pt-4">
          <div className="flex items-center space-x-4">
            <Button onClick={onBack} variant="outline" size="icon" className="rounded-full">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">마이페이지</h1>
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="w-4 h-4" />
          </Button>
        </div>

        {/* 사용자 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{myPageData.totalPoints}</div>
              <div className="text-sm opacity-90">총 포인트</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{myPageData.completedCourses.length}</div>
              <div className="text-sm opacity-90">완주한 코스</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500 to-teal-500 text-white">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 mx-auto mb-2" />
              <div className="text-2xl font-bold">{myPageData.badges.length}</div>
              <div className="text-sm opacity-90">획득한 배지</div>
            </CardContent>
          </Card>
        </div>

        {/* 획득한 배지 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>획득한 배지</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {myPageData.badges.map((badgeId, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-lg">
                  <div className="text-2xl">{getBadgeIcon(badgeId)}</div>
                  <div>
                    <div className="font-semibold text-sm">{getBadgeName(badgeId)}</div>
                    <div className="text-xs text-gray-600">배지 획득</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 탭 메뉴 */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="completed">완주한 코스</TabsTrigger>
            <TabsTrigger value="created">내가 만든 코스</TabsTrigger>
          </TabsList>

          <TabsContent value="completed" className="space-y-4">
            {myPageData.completedCourses.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">아직 완주한 코스가 없어요</p>
                  <p className="text-sm text-gray-500">첫 혼행을 시작해보세요!</p>
                </CardContent>
              </Card>
            ) : (
              myPageData.completedCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{course.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(course.completedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{course.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 mt-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">
                            {course.locations.join(' → ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="created" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={onCreateCourse} className="flex items-center space-x-2">
                <PlusCircle className="w-4 h-4" />
                <span>새 코스 만들기</span>
              </Button>
            </div>
            
            {myPageData.createdCourses.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <PlusCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">아직 만든 코스가 없어요</p>
                  <p className="text-sm text-gray-500">나만의 특별한 코스를 만들어보세요!</p>
                </CardContent>
              </Card>
            ) : (
              myPageData.createdCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-lg">{course.title}</h3>
                          <Badge variant={course.isPublic ? "default" : "secondary"}>
                            {course.isPublic ? "공개" : "비공개"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{course.description}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{course.locations.length}개 장소</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span>{course.reviewCount}개 후기</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-3">
                          {course.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
