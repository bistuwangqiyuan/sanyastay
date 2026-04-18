import Link from 'next/link';
import { Home, Building, Calendar, BarChart3, CalendarDays, ChevronLeft, Plus } from 'lucide-react';
import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';

const hostLinks = [
  { href: '/host', icon: Home, label: '总览' },
  { href: '/host/properties', icon: Building, label: '我的房源' },
  { href: '/host/bookings', icon: Calendar, label: '预订管理' },
  { href: '/host/analytics', icon: BarChart3, label: '数据分析' },
  { href: '/host/calendar', icon: CalendarDays, label: '日历管理' },
];

export default function HostLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex flex-1">
        <aside className="hidden md:flex w-60 border-r border-border bg-card flex-col p-4 gap-1">
          <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-2 px-3">
            <ChevronLeft className="h-4 w-4" /> 返回首页
          </Link>
          <Link href="/host/properties/new">
            <Button className="w-full mb-4 gap-2 bg-primary hover:bg-primary/90"><Plus className="h-4 w-4" /> 发布新房源</Button>
          </Link>
          {hostLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant="ghost" className="w-full justify-start gap-3 font-normal">
                <link.icon className="h-4 w-4" /> {link.label}
              </Button>
            </Link>
          ))}
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </>
  );
}
