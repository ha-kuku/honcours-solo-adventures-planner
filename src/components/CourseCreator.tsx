
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Plus, Minus, MapPin, ArrowLeft } from 'lucide-react';
import { UserCourse, LocationInfo } from '@/types/location';
import { toast } from 'sonner';

interface CourseCreatorProps {
  onBack: () => void;
  onCourseCreated: (course: UserCourse) => void;
}

export const CourseCreator = ({ onBack, onCourseCreated }: CourseCreatorProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'outdoor' | 'home'>('outdoor');
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [isPublic, setIsPublic] = useState(true);
  const [tags, setTags] = useState('');
  const [locations, setLocations] = useState<Partial<LocationInfo>[]>([
    {
      name: '',
      description: '',
      type: 'cafe',
      duration: '1시간',
      address: '',
      hours: '09:00 - 18:00'
    }
  ]);

  const addLocation = () => {
    setLocations([...locations, {
      name: '',
      description: '',
      type: 'cafe',
      duration: '1시간',
      address: '',
      hours: '09:00 - 18:00'
    }]);
  };

  const removeLocation = (index: number) => {
    if (locations.length > 1) {
      setLocations(locations.filter((_, i) => i !== index));
    }
  };

  const updateLocation = (index: number, field: keyof LocationInfo, value: string) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = { ...updatedLocations[index], [field]: value };
    setLocations(updatedLocations);
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      toast.error('코스 제목과 설명을 입력해주세요');
      return;
    }

    if (locations.some(loc => !loc.name?.trim() || !loc.address?.trim())) {
      toast.error('모든 장소의 이름과 주소를 입력해주세요');
      return;
    }

    const newCourse: UserCourse = {
      id: `user-course-${Date.now()}`,
      title,
      description,
      locations: locations.map((loc, index) => ({
        id: `location-${index}`,
        name: loc.name || '',
        description: loc.description || '',
        type: loc.type || 'cafe',
        duration: loc.duration || '1시간',
        time: `${9 + index}:00`,
        congestion: '보통',
        address: loc.address || '',
        hours: loc.hours || '09:00 - 18:00',
        closedDays: [],
        rating: 4.0,
        reviewCount: 0,
        tags: [],
        images: ['/placeholder.svg']
      })),
      createdBy: 'user_123',
      createdAt: new Date().toISOString(),
      reviewCount: 0,
      isPublic,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      duration: `${locations.length * 2}시간`,
      difficulty,
      type
    };

    onCourseCreated(newCourse);
    toast.success('새로운 코스가 생성되었습니다!');
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-6 pt-4">
          <Button onClick={onBack} variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">나만의 코스 만들기</h1>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">코스 제목</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="예: 홍대 카페 투어"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="description">코스 설명</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="이 코스의 매력을 설명해주세요"
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">코스 유형</Label>
                  <Select value={type} onValueChange={(value: 'outdoor' | 'home') => setType(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="outdoor">야외 코스</SelectItem>
                      <SelectItem value="home">집콕 코스</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="difficulty">난이도</Label>
                  <Select value={difficulty} onValueChange={(value: 'beginner' | 'intermediate' | 'advanced') => setDifficulty(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">초급</SelectItem>
                      <SelectItem value="intermediate">중급</SelectItem>
                      <SelectItem value="advanced">고급</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="tags">태그 (쉼표로 구분)</Label>
                <Input
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="예: 카페, 힐링, 사진"
                  className="mt-1"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public">다른 사용자들과 공유하기</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>코스 장소</CardTitle>
                <Button onClick={addLocation} size="sm" className="flex items-center space-x-1">
                  <Plus className="w-4 h-4" />
                  <span>장소 추가</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {locations.map((location, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">장소 {index + 1}</span>
                    </div>
                    {locations.length > 1 && (
                      <Button
                        onClick={() => removeLocation(index)}
                        variant="ghost"
                        size="sm"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>장소명</Label>
                      <Input
                        value={location.name || ''}
                        onChange={(e) => updateLocation(index, 'name', e.target.value)}
                        placeholder="장소 이름"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>유형</Label>
                      <Select 
                        value={location.type || 'cafe'} 
                        onValueChange={(value) => updateLocation(index, 'type', value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cafe">카페</SelectItem>
                          <SelectItem value="restaurant">레스토랑</SelectItem>
                          <SelectItem value="exhibition">전시회</SelectItem>
                          <SelectItem value="park">공원</SelectItem>
                          <SelectItem value="shopping">쇼핑</SelectItem>
                          <SelectItem value="culture">문화시설</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>주소</Label>
                    <Input
                      value={location.address || ''}
                      onChange={(e) => updateLocation(index, 'address', e.target.value)}
                      placeholder="상세 주소"
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>설명</Label>
                    <Textarea
                      value={location.description || ''}
                      onChange={(e) => updateLocation(index, 'description', e.target.value)}
                      placeholder="이 장소에 대한 설명"
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button onClick={onBack} variant="outline" className="flex-1">
              취소
            </Button>
            <Button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500">
              코스 생성하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
