import Link from 'next/link';
import { Plus, MoreHorizontal, Eye, Edit, Trash2, Star, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const properties = [
  { id: '1', title: '海景花园精装两居', district: '三亚湾', status: 'active', rating: 4.9, reviews: 128, bookings: 45, price: '¥3,800/月', occupancy: '85%' },
  { id: '2', title: '亚龙湾豪华别墅', district: '亚龙湾', status: 'active', rating: 4.8, reviews: 56, bookings: 23, price: '¥12,000/月', occupancy: '72%' },
  { id: '3', title: '大东海温馨公寓', district: '大东海', status: 'draft', rating: 0, reviews: 0, bookings: 0, price: '¥2,500/月', occupancy: '0%' },
];

const statusMap: Record<string, { label: string; class: string }> = {
  active: { label: '已上线', class: 'bg-palm/10 text-palm' },
  draft: { label: '草稿', class: 'bg-muted text-muted-foreground' },
  inactive: { label: '已下架', class: 'bg-sand/10 text-sand-dark' },
};

export default function HostPropertiesPage() {
  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">我的房源</h1>
        <Link href="/host/properties/new">
          <Button className="gap-2 bg-primary hover:bg-primary/90"><Plus className="h-4 w-4" /> 发布新房源</Button>
        </Link>
      </div>

      <div className="space-y-4">
        {properties.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-4">
                <div className="w-24 h-18 rounded-lg bg-gradient-to-br from-primary/10 to-sand/10 shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{p.title}</h3>
                    <Badge className={`${statusMap[p.status].class} border-0 text-xs`}>{statusMap[p.status].label}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{p.district} · {p.price}</p>
                  <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                    {p.rating > 0 && <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-sand text-sand" /> {p.rating} ({p.reviews})</span>}
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {p.bookings} 次预订</span>
                    <span>入住率 {p.occupancy}</span>
                  </div>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> 查看</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2"><Edit className="h-4 w-4" /> 编辑</DropdownMenuItem>
                  <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> 删除</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
