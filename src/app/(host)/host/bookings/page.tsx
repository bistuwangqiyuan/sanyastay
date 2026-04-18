import { Calendar, MapPin, User, Check, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const bookings = [
  { id: '1', guest: '王女士', property: '海景花园精装两居', dates: '2026-05-01 ~ 2026-05-07', type: '日租', status: 'pending', price: '¥2,660', guests: 2 },
  { id: '2', guest: 'Alex K.', property: '亚龙湾豪华别墅', dates: '2026-05-10 ~ 2026-06-10', type: '月租', status: 'pending', price: '¥12,000', guests: 4 },
  { id: '3', guest: '李叔叔', property: '海景花园精装两居', dates: '2026-01-15 ~ 2026-04-15', type: '季租', status: 'confirmed', price: '¥10,000', guests: 2 },
];

const statusMap: Record<string, { label: string; class: string }> = {
  pending: { label: '待确认', class: 'bg-sand/10 text-sand-dark' },
  confirmed: { label: '已确认', class: 'bg-primary/10 text-primary' },
  completed: { label: '已完成', class: 'bg-palm/10 text-palm' },
};

export default function HostBookingsPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">预订管理</h1>
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">待处理 (2)</TabsTrigger>
          <TabsTrigger value="confirmed">已确认</TabsTrigger>
          <TabsTrigger value="all">全部</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4 space-y-4">
          {bookings.filter((b) => b.status === 'pending').map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">{b.guest[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{b.guest}</h3>
                        <Badge className={`${statusMap[b.status].class} border-0 text-xs`}>{statusMap[b.status].label}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{b.property}</p>
                      <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {b.dates}</span>
                        <span>{b.type}</span>
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {b.guests}人</span>
                      </div>
                      <p className="font-semibold text-primary mt-2">{b.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-primary hover:bg-primary/90 gap-1"><Check className="h-3.5 w-3.5" /> 接受</Button>
                    <Button size="sm" variant="outline" className="gap-1 text-destructive hover:bg-destructive hover:text-white"><X className="h-3.5 w-3.5" /> 拒绝</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="confirmed" className="mt-4 space-y-4">
          {bookings.filter((b) => b.status === 'confirmed').map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{b.guest[0]}</AvatarFallback></Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{b.guest} · {b.property}</h3>
                    <p className="text-xs text-muted-foreground">{b.dates} · {b.type} · {b.price}</p>
                  </div>
                  <Badge className="ml-auto bg-primary/10 text-primary border-0 text-xs">已确认</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="all" className="mt-4 space-y-4">
          {bookings.map((b) => (
            <Card key={b.id}>
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10"><AvatarFallback className="bg-primary/10 text-primary text-sm">{b.guest[0]}</AvatarFallback></Avatar>
                  <div>
                    <h3 className="font-semibold text-sm">{b.guest} · {b.property}</h3>
                    <p className="text-xs text-muted-foreground">{b.dates} · {b.type} · {b.price}</p>
                  </div>
                  <Badge className={`ml-auto ${statusMap[b.status].class} border-0 text-xs`}>{statusMap[b.status].label}</Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
