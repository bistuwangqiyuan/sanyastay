import { Calendar, Heart, MessageCircle, Star, ArrowRight, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const statCards = [
  { icon: Calendar, label: '进行中预订', value: '2', color: 'text-primary bg-primary/10' },
  { icon: Heart, label: '收藏房源', value: '8', color: 'text-coral bg-coral/10' },
  { icon: MessageCircle, label: '未读消息', value: '3', color: 'text-sand bg-sand/10' },
  { icon: Star, label: '待评价', value: '1', color: 'text-palm bg-palm/10' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-1">欢迎回来</h1>
      <p className="text-muted-foreground mb-6">管理您的旅居行程和账户信息</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">进行中的预订</CardTitle>
            <Link href="/dashboard/bookings"><Button variant="ghost" size="sm" className="gap-1 text-xs">查看全部 <ArrowRight className="h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded-lg border border-border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">海景花园精装两居</h4>
                <Badge className="bg-primary/10 text-primary border-0 text-xs">已确认</Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> 三亚湾</p>
              <p className="text-xs text-muted-foreground mt-1">2026-01-15 ~ 2026-04-15 · 月租</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-sm">亚龙湾豪华别墅</h4>
                <Badge className="bg-sand/10 text-sand-dark border-0 text-xs">待确认</Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> 亚龙湾</p>
              <p className="text-xs text-muted-foreground mt-1">2026-05-01 ~ 2026-05-07 · 日租</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base">最近消息</CardTitle>
            <Link href="/dashboard/messages"><Button variant="ghost" size="sm" className="gap-1 text-xs">查看全部 <ArrowRight className="h-3 w-3" /></Button></Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {['陈先生: 欢迎入住！有任何问题随时联系我。', '系统通知: 您的预订已确认', '李房东: 房间已准备好，期待您的到来！'].map((msg, i) => (
              <div key={i} className="p-3 rounded-lg border border-border flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{msg}</p>
                  <p className="text-xs text-muted-foreground">{i === 0 ? '2分钟前' : i === 1 ? '1小时前' : '昨天'}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
