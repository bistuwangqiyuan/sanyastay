'use client';

import { useState } from 'react';
import { ArrowLeft, Upload, MapPin, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PROPERTY_TYPES, DISTRICTS } from '@/lib/constants';
import Link from 'next/link';

export default function NewPropertyPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div className="max-w-3xl">
      <Link href="/host/properties" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回房源列表
      </Link>
      <h1 className="text-2xl font-bold mb-6">发布新房源</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="location">位置</TabsTrigger>
          <TabsTrigger value="pricing">价格</TabsTrigger>
          <TabsTrigger value="photos">照片</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader><CardTitle>基本信息</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>房源标题</Label>
                <Input className="mt-1.5" placeholder="例如：三亚湾海景精装两居" />
              </div>
              <div>
                <Label>房源描述</Label>
                <Textarea className="mt-1.5" placeholder="详细描述房源特色..." rows={5} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>房源类型</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="选择类型" /></SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((t) => (<SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>面积 (m²)</Label>
                  <Input type="number" className="mt-1.5" placeholder="85" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><Label>卧室数</Label><Input type="number" className="mt-1.5" defaultValue={2} min={0} /></div>
                <div><Label>卫生间</Label><Input type="number" className="mt-1.5" defaultValue={1} min={1} /></div>
                <div><Label>最多住客</Label><Input type="number" className="mt-1.5" defaultValue={4} min={1} /></div>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div><Label>适老化设施</Label><p className="text-xs text-muted-foreground">无障碍设施、扶手等</p></div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div><Label>有电梯</Label></div>
                  <Switch />
                </div>
              </div>
              <Button onClick={() => setActiveTab('location')} className="w-full bg-primary hover:bg-primary/90">下一步：位置信息</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader><CardTitle>位置信息</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>城市</Label>
                  <Input className="mt-1.5" defaultValue="三亚" />
                </div>
                <div>
                  <Label>区域</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="选择区域" /></SelectTrigger>
                    <SelectContent>
                      {DISTRICTS.map((d) => (<SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>详细地址</Label>
                <Input className="mt-1.5" placeholder="小区名称、楼栋号" />
              </div>
              <div className="h-64 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
                <MapPin className="h-8 w-8 mr-2" /> 地图选择位置 (Mapbox GL)
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab('basic')}>上一步</Button>
                <Button onClick={() => setActiveTab('pricing')} className="flex-1 bg-primary hover:bg-primary/90">下一步：价格设置</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader><CardTitle>价格设置</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div><Label>日租价格 (¥)</Label><Input type="number" className="mt-1.5" placeholder="380" /></div>
                <div><Label>月租价格 (¥)</Label><Input type="number" className="mt-1.5" placeholder="3800" /></div>
                <div><Label>季租价格 (¥)</Label><Input type="number" className="mt-1.5" placeholder="10000" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>入住时间</Label><Input type="time" className="mt-1.5" defaultValue="14:00" /></div>
                <div><Label>退房时间</Label><Input type="time" className="mt-1.5" defaultValue="12:00" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>最短入住天数</Label><Input type="number" className="mt-1.5" defaultValue={1} /></div>
                <div><Label>最长入住天数</Label><Input type="number" className="mt-1.5" placeholder="不限" /></div>
              </div>
              <div>
                <Label>取消政策</Label>
                <Select>
                  <SelectTrigger className="mt-1.5"><SelectValue placeholder="选择政策" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">灵活 (入住前1天免费取消)</SelectItem>
                    <SelectItem value="moderate">温和 (入住前7天免费取消)</SelectItem>
                    <SelectItem value="strict">严格 (入住前14天可退50%)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>入住须知</Label>
                <Textarea className="mt-1.5" placeholder="如：不允许宠物、禁止吸烟等" rows={3} />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab('location')}>上一步</Button>
                <Button onClick={() => setActiveTab('photos')} className="flex-1 bg-primary hover:bg-primary/90">下一步：上传照片</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader><CardTitle>房源照片</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium">点击或拖放照片到这里</p>
                <p className="text-xs text-muted-foreground mt-1">支持 JPG, PNG, WebP，每张最大 10MB</p>
                <p className="text-xs text-muted-foreground">建议上传至少 8 张照片</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab('pricing')}>上一步</Button>
                <Button variant="outline" className="flex-1">保存草稿</Button>
                <Button className="flex-1 bg-primary hover:bg-primary/90">发布房源</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
