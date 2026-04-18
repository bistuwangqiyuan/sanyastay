import { Clock, MapPin, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/shared/section-heading';

const events = [
  { id: '1', title: '三亚湾候鸟太极晨练', desc: '每周一/三/五早上7点在海月广场集合，专业老师带领太极晨练。', date: '每周一/三/五 7:00', location: '三亚湾海月广场', attendees: 45, maxAttendees: 60, category: '健身', free: true },
  { id: '2', title: '海棠湾社区读书会', desc: '一起阅读分享，本周主题：《人生下半场》', date: '每周六 15:00', location: '海棠湾万达茂咖啡厅', attendees: 20, maxAttendees: 30, category: '文化', free: true },
  { id: '3', title: '大东海摄影采风活动', desc: '带上你的相机，一起记录三亚最美的光影。', date: '4月20日 16:00', location: '大东海沙滩', attendees: 32, maxAttendees: 50, category: '兴趣', free: true },
  { id: '4', title: '海鲜美食品鉴会', desc: '资深美食达人带你品尝正宗三亚海鲜，教你辨别海鲜品质。', date: '4月22日 18:00', location: '第一市场附近', attendees: 18, maxAttendees: 25, category: '美食', free: false },
  { id: '5', title: '候鸟健康讲座', desc: '三甲医院专家主讲：冬季养生与慢病管理', date: '4月25日 10:00', location: '三亚湾社区中心', attendees: 50, maxAttendees: 80, category: '健康', free: true },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <SectionHeading title="社区活动" subtitle="参与丰富多彩的旅居活动，结识志同道合的朋友" align="left" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="outline">{event.category}</Badge>
                {event.free ? (
                  <Badge className="bg-palm/10 text-palm border-palm/20">免费</Badge>
                ) : (
                  <Badge className="bg-sand/10 text-sand-dark border-sand/20">付费</Badge>
                )}
              </div>
              <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{event.desc}</p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {event.date}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {event.location}</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {event.attendees}/{event.maxAttendees} 人报名</div>
              </div>
              <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                {event.attendees >= event.maxAttendees ? '已满' : '我要参加'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
