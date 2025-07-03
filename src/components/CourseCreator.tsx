import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Plus, X, MapPin } from 'lucide-react';
import { UserCourse } from '@/types/location';
import { toast } from 'sonner';

interface CourseCreatorProps {
  onBack: () => void;
  onCourseCreated: (course: UserCourse) => void;
  editingCourse?: UserCourse | null;
}

export const CourseCreator = ({ onBack, onCourseCreated, editingCourse }: CourseCreatorProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [locations, setLocations] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (editingCourse) {
      setTitle(editingCourse.title);
      setDescription(editingCourse.description);
      setLocations(editingCourse.locations);
      setTags(editingCourse.tags);
      setIsPublic(editingCourse.isPublic);
    }
  }, [editingCourse]);

  const addLocation = () => {
    setLocations([...locations, '']);
  };

  const removeLocation = (index: number) => {
    const newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  const updateLocation = (index: number, value: string) => {
    const newLocations = [...locations];
    newLocations[index] = value;
    setLocations(newLocations);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || locations.filter(loc => loc.trim()).length === 0) {
      toast.error('제목, 설명, 장소를 모두 입력해주세요');
      return;
    }

    const courseData: UserCourse = {
      id: editingCourse?.id || `course_${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
      locations: locations.filter(loc => loc.trim()),
      tags,
      isPublic,
      createdAt: editingCourse?.createdAt || new Date().toISOString(),
      reviewCount: editingCourse?.reviewCount || 0
    };

    onCourseCreated(courseData);
    toast.success(editingCourse ? '코스가 수정되었습니다!' : '새 코스가 생성되었습니다!');
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-4 mb-6 pt-4">
          <Button onClick={onBack} variant="outline" size="icon" className="rounded-full">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">
            {editingCourse ? '코스 수정' : '새 코스 만들기'}
          </h1>
        </div>

        <div className="space-y-6">
          {/* 제목 */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">제목</label>
            <div className="mt-1">
              <Input
                type="text"
                name="title"
                id="title"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* 설명 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">설명</label>
            <div className="mt-1">
              <Textarea
                id="description"
                name="description"
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          {/* 장소 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">장소</label>
            <div className="mt-1 space-y-2">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="flex-1">
                    <Input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={location}
                      onChange={(e) => updateLocation(index, e.target.value)}
                    />
                  </div>
                  {locations.length > 1 && (
                    <Button
                      onClick={() => removeLocation(index)}
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                onClick={addLocation}
                variant="outline"
                className="w-full justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                장소 추가
              </Button>
            </div>
          </div>

          {/* 태그 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">태그</label>
            <div className="mt-1 flex items-center space-x-2">
              <Input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="새 태그"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addTag();
                    e.preventDefault();
                  }
                }}
              />
              <Button onClick={addTag} variant="outline">
                추가
              </Button>
            </div>
            <div className="mt-2">
              {tags.map((tag) => (
                <Badge
                  key={tag}
                  className="mr-2 mb-2 cursor-pointer"
                  onClick={() => removeTag(tag)}
                >
                  {tag} <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>

          {/* 공개 설정 */}
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="public" className="block text-sm font-medium text-gray-700">
                공개 코스로 설정
              </label>
              <Switch
                id="public"
                checked={isPublic}
                onCheckedChange={(checked) => setIsPublic(checked)}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              공개 코스로 설정하면 다른 사용자들도 당신의 코스를 볼 수 있습니다.
            </p>
          </div>

          <div className="sticky bottom-4 bg-white p-4 rounded-xl shadow-lg border">
            <Button onClick={handleSubmit} className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              {editingCourse ? '수정 완료' : '코스 생성하기'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
