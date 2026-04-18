import { Building, Calendar, TrendingUp, Star, ArrowUp, ArrowDown, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stats = [
  { icon: Building, label: '活跃房源', value: '5', change: '+1', trend: 'up', color: 'text-primary bg-primary/10' },
  { icon: Calendar, label: '本月预订', value: '12', change: '+3', trend: 'up', color: 'text-sand bg-sand/10' },
  { icon: DollarSign, label: '本月收入', value: '¥46,800', change: '+18%', trend: 'up', color: 'text-palm bg-palm/10' },
  { icon: Star, label: '平均评分', value: '4.8', change: '+0.1', trend: 'up', color: 'text-coral bg-coral/10' },
];

const pendingBookings = [
  { guest: '王女士', property: '海景花园精装两居', dates: '5月1日-5月7日', price: '¥2,660' },
  { guest: 'Alex K.', property: '亚龙湾豪华别墅', dates: '5月10日-6月10日', price: '¥12,000' },
];

export default function HostDashboardPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-1">房东管理中心</h1>
      <p className="text-muted-foreground mb-6">管理您的房源、预订和收入</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-4 w-4" />
                </div>
                <Badge variant="outline" className="text-xs text-palm">
                  {stat.trend === 'up' ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                  {stat.change}
                </Badge>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">待处理预订</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {pendingBookings.map((b, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
              <div>
                <p className="font-medium text-sm">{b.guest} 预订了 {b.property}</p>
                <p className="text-xs text-muted-foreground">{b.dates} · {b.price}</p>
              </div>
              <div className="flex gap-2">
                <Badge className="bg-primary/10 text-primary border-0 cursor-pointer hover:bg-primary hover:text-primary-foreground">接受</Badge>
                <Badge variant="outline" className="cursor-pointer hover:bg-destructive hover:text-white hover:border-destructive">拒绝</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
