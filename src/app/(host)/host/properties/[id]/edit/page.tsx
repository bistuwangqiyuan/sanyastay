import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default async function EditPropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return (
    <div className="max-w-3xl">
      <Link href="/host/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回房源列表
      </Link>
      <h1 className="text-2xl font-bold mb-6">编辑房源</h1>
      <Card>
        <CardContent className="p-8 text-center text-muted-foreground">
          房源编辑功能与新增房源类似，ID: {id}
        </CardContent>
      </Card>
    </div>
  );
}
