
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Clock, Star, Users, Edit, Play, Share2 } from 'lucide-react';
import { UserCourse } from '@/types/location';

interface CourseDetailModalProps {
  course: UserCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (course: UserCourse) => void;
  onPlay: (course: UserCourse) => void;
}

export const CourseDetailModal = ({ course, isOpen, onClose, onEdit, onPlay }: CourseDetailModalProps) => {
  if (!course) return null;

  const handleEdit = () => {
    onEdit(course);
    onClose();
  };

  const handlePlay = () => {
    onPlay(course);
    onClose();
  };

  const handleShare = () => {
    // 공유 기능 구현
    if (navigator.share) {
      navigator.share({
        title: course.title,
        text: course.description,
        url: window.location.href
      });
    } else {
      // 클립보드에 복사
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{course.title}</span>
            <div className="flex items-center space-x-2">
              <Badge variant={course.isPublic ? "default" : "secondary"}>
                {course.isPublic ? "공개" : "비공개"}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 코스 정보 */}
          <div>
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{course.locations.length}개 장소</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>약 {course.locations.length * 1.5}시간</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4" />
                <span>{course.reviewCount}개 후기</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>조회수 {Math.floor(Math.random() * 500) + 100}</span>
              </div>
            </div>
          </div>

          {/* 태그 */}
          <div className="flex flex-wrap gap-2">
            {course.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>

          {/* 장소 목록 */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">코스 일정</h3>
            <div className="space-y-3">
              {course.locations.map((location, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{location}</h4>
                      <p className="text-sm text-gray-600">예상 소요시간: 1-2시간</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* 액션 버튼들 */}
          <div className="flex space-x-3">
            <Button onClick={handlePlay} className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              이 코스로 출발
            </Button>
            <Button onClick={handleEdit} variant="outline" className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              수정하기
            </Button>
            <Button onClick={handleShare} variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
