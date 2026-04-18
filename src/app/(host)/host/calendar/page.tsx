import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function HostCalendarPage() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const bookedDays = [3, 4, 5, 6, 7, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
  const blockedDays = [10, 11, 12];

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">日历管理</h1>
        <Select defaultValue="all">
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">所有房源</SelectItem>
            <SelectItem value="1">海景花园精装两居</SelectItem>
            <SelectItem value="2">亚龙湾豪华别墅</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">2026年4月</CardTitle>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronLeft className="h-4 w-4" /></Button>
              <Button variant="outline" size="icon" className="h-8 w-8"><ChevronRight className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {[0, 0, 0].map((_, i) => (<div key={`empty-${i}`} />))}
            {days.map((day) => {
              const isBooked = bookedDays.includes(day);
              const isBlocked = blockedDays.includes(day);
              return (
                <div
                  key={day}
                  className={`aspect-square flex flex-col items-center justify-center rounded-lg text-sm cursor-pointer transition-colors
                    ${isBooked ? 'bg-primary/10 text-primary font-medium' : ''}
                    ${isBlocked ? 'bg-muted text-muted-foreground line-through' : ''}
                    ${!isBooked && !isBlocked ? 'hover:bg-accent' : ''}
                  `}
                >
                  {day}
                  {isBooked && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
                </div>
              );
            })}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-primary/10" /> 已预订</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-muted" /> 已屏蔽</span>
            <span className="flex items-center gap-1"><div className="w-3 h-3 rounded border border-border" /> 可预订</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
