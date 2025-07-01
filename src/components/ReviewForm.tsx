import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Star, Heart, Camera, Home } from 'lucide-react';
import { toast } from 'sonner';

interface ReviewFormProps {
  course: any;
  onComplete: () => void;
}

export const ReviewForm = ({ course, onComplete }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error('별점을 선택해주세요');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    const reviewData = {
      courseId: course.id,
      rating,
      comment: comment.trim(),
      userId: 'user_123',
      createdAt: new Date().toISOString()
    };
    
    console.log('Submitting review:', reviewData);
    // In real app: POST /courses/{courseId}/reviews
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show points and badge earned
      toast.success('후기가 등록되었습니다!', {
        description: '100 포인트와 새로운 배지를 획득했어요! 🎉'
      });
      
      setTimeout(() => {
        onComplete();
      }, 1000);
    } catch (error) {
      toast.error('후기 등록에 실패했습니다');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoHome = () => {
    // Reset onboarding and go back to start
    localStorage.removeItem('honcours-onboarding');
    window.location.reload();
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-end pt-4 mb-4">
          <Button 
            onClick={handleGoHome}
            variant="outline" 
            size="icon"
            className="rounded-full"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">혼코스 완주!</h1>
          <p className="text-gray-600">오늘의 혼행은 어떠셨나요?</p>
        </div>

        <Card className="mb-6 overflow-hidden">
          <div className="relative">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-32 object-cover opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-sm opacity-90">{course.duration} • {course.locations.length}개 장소</p>
            </div>
          </div>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <h3 className="text-xl font-semibold text-gray-800">이 코스는 어떠셨나요?</h3>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rating */}
            <div className="text-center">
              <div className="flex justify-center space-x-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoveredRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {rating === 0 && '별점을 선택해주세요'}
                {rating === 1 && '아쉬웠어요'}
                {rating === 2 && '그저 그랬어요'}
                {rating === 3 && '괜찮았어요'}
                {rating === 4 && '좋았어요'}
                {rating === 5 && '최고였어요!'}
              </p>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                한 줄 코멘트 (선택사항)
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="오늘의 혼행은 어떠셨나요? 다른 혼행러들을 위해 경험을 공유해주세요!"
                className="min-h-[100px]"
                maxLength={200}
              />
              <div className="text-right text-xs text-gray-500 mt-1">
                {comment.length}/200
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-3">
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0}
            className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-lg rounded-xl"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>등록 중...</span>
              </div>
            ) : (
              '후기 등록하기'
            )}
          </Button>
          
          <Button 
            onClick={onComplete}
            variant="outline"
            className="w-full h-12 text-gray-600"
          >
            나중에 할래요
          </Button>
        </div>
      </div>
    </div>
  );
};
