import { Calendar, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

const bookings = [
  { id: '1', title: '海景花园精装两居', district: '三亚湾', dates: '2026-01-15 ~ 2026-04-15', type: '月租', status: 'confirmed', price: '¥3,800/月' },
  { id: '2', title: '亚龙湾豪华别墅', district: '亚龙湾', dates: '2026-05-01 ~ 2026-05-07', type: '日租', status: 'pending', price: '¥1,200/晚' },
  { id: '3', title: '大东海阳光套房', district: '大东海', dates: '2025-11-01 ~ 2026-01-31', type: '季租', status: 'completed', price: '¥10,000/季' },
];

const statusMap: Record<string, { label: string; class: string }> = {
  pending: { label: '待确认', class: 'bg-sand/10 text-sand-dark' },
  confirmed: { label: '已确认', class: 'bg-primary/10 text-primary' },
  completed: { label: '已完成', class: 'bg-palm/10 text-palm' },
  cancelled: { label: '已取消', class: 'bg-muted text-muted-foreground' },
};

export default function BookingsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">我的预订</h1>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">全部</TabsTrigger>
          <TabsTrigger value="active">进行中</TabsTrigger>
          <TabsTrigger value="past">已完成</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4 space-y-4">
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-20 h-16 rounded-lg bg-gradient-to-br from-primary/10 to-sand/10 shrink-0" />
                  <div>
                    <h3 className="font-semibold">{b.title}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {b.district}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5"><Calendar className="h-3 w-3" /> {b.dates} · {b.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                  <Badge className={`${statusMap[b.status].class} border-0`}>{statusMap[b.status].label}</Badge>
                  <span className="font-semibold text-primary">{b.price}</span>
                  <Button variant="outline" size="sm">查看详情</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="active" className="mt-4">
          <Card><CardContent className="p-8 text-center text-muted-foreground">进行中的预订将显示在这里</CardContent></Card>
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          <Card><CardContent className="p-8 text-center text-muted-foreground">已完成的预订将显示在这里</CardContent></Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
