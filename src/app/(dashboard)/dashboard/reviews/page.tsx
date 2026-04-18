import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EmptyState } from '@/components/shared/empty-state';

const reviews = [
  { id: '1', property: '海景花园精装两居', host: '陈先生', rating: 5, date: '2026-03-15', text: '非常棒的旅居体验！房源干净整洁，位置便利，房东人很好。' },
  { id: '2', property: '大东海阳光套房', host: '李房东', rating: 4, date: '2025-12-20', text: '整体不错，设施齐全。海景很漂亮，生活配套完善。' },
];

export default function ReviewsPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">我的评价</h1>
      <div className="space-y-4">
        {reviews.map((r) => (
          <Card key={r.id}>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-sm">{r.property}</h3>
                  <p className="text-xs text-muted-foreground">房东：{r.host} · {r.date}</p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-sand text-sand" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
