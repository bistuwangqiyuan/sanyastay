import { TrendingUp, DollarSign, Calendar, Star, BarChart3, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const monthlyData = [
  { month: '11月', revenue: 15800, bookings: 4 },
  { month: '12月', revenue: 22400, bookings: 6 },
  { month: '1月', revenue: 38600, bookings: 10 },
  { month: '2月', revenue: 42000, bookings: 11 },
  { month: '3月', revenue: 35200, bookings: 9 },
  { month: '4月', revenue: 46800, bookings: 12 },
];

export default function HostAnalyticsPage() {
  const totalRevenue = monthlyData.reduce((s, m) => s + m.revenue, 0);
  const totalBookings = monthlyData.reduce((s, m) => s + m.bookings, 0);

  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">数据分析</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="h-5 w-5 text-palm" />
              <Badge variant="outline" className="text-xs text-palm">+18%</Badge>
            </div>
            <p className="text-2xl font-bold">¥{(totalRevenue / 10000).toFixed(1)}万</p>
            <p className="text-xs text-muted-foreground">总收入 (6个月)</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="h-5 w-5 text-primary" />
              <Badge variant="outline" className="text-xs text-palm">+15%</Badge>
            </div>
            <p className="text-2xl font-bold">{totalBookings}</p>
            <p className="text-xs text-muted-foreground">总预订数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Users className="h-5 w-5 text-sand" />
            </div>
            <p className="text-2xl font-bold">82%</p>
            <p className="text-xs text-muted-foreground">平均入住率</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Star className="h-5 w-5 text-coral" />
            </div>
            <p className="text-2xl font-bold">4.8</p>
            <p className="text-xs text-muted-foreground">平均评分</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" /> 月度收入趋势</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monthlyData.map((m) => (
              <div key={m.month} className="flex items-center gap-4">
                <span className="text-sm w-10 text-muted-foreground">{m.month}</span>
                <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                  <div className="h-full bg-primary/80 rounded-full flex items-center justify-end px-2" style={{ width: `${(m.revenue / 50000) * 100}%` }}>
                    <span className="text-xs text-primary-foreground font-medium">¥{(m.revenue / 1000).toFixed(1)}k</span>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-16 text-right">{m.bookings} 单</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
