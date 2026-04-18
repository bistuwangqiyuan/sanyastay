import { Star, MapPin, Bed, Bath, Maximize, Award, Heart, Share2, Shield, Wifi, Car, Coffee, Waves, Trees, ThermometerSun, User, Calendar, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const amenities = [
  { icon: Wifi, label: '高速WiFi (100Mbps)', category: '基础' },
  { icon: Car, label: '免费停车', category: '基础' },
  { icon: Coffee, label: '全套厨房', category: '厨房' },
  { icon: ThermometerSun, label: '中央空调', category: '基础' },
  { icon: Waves, label: '洗衣机', category: '基础' },
  { icon: Trees, label: '阳台/花园', category: '户外' },
  { icon: Shield, label: '24小时安保', category: '安全' },
];

const lifeCircle = [
  { name: '解放军总医院海南医院', category: '医院', distance: '1.2km', time: '步行15分钟' },
  { name: '旺豪超市', category: '超市', distance: '500m', time: '步行6分钟' },
  { name: '三亚湾海滩', category: '海滩', distance: '300m', time: '步行4分钟' },
  { name: '白鹭公园', category: '公园', distance: '800m', time: '步行10分钟' },
  { name: '三亚湾公交站', category: '公交', distance: '200m', time: '步行3分钟' },
];

const reviews = [
  { name: '王女士', rating: 5, date: '2026-03-15', text: '房源非常干净整洁，海景特别好，步行到海边只要5分钟。房东服务也很贴心，下次还来！' },
  { name: 'Michael', rating: 4, date: '2026-02-28', text: 'Great apartment with beautiful ocean view. Kitchen is well equipped. WiFi was fast and stable.' },
  { name: '李叔叔', rating: 5, date: '2026-01-10', text: '适合老年人居住，有电梯，附近有医院和超市，生活很方便。在这里住了两个月，非常满意。' },
];

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl overflow-hidden mb-8 h-[300px] sm:h-[400px] md:h-[500px]">
        <div className="relative bg-gradient-to-br from-primary/20 to-sand/20 flex items-center justify-center">
          <Waves className="h-24 w-24 text-primary/20" />
          <div className="absolute bottom-4 left-4">
            <Badge className="bg-black/50 text-white border-0">1/12 张照片</Badge>
          </div>
        </div>
        <div className="hidden md:grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="relative bg-gradient-to-br from-primary/10 to-sand/10 flex items-center justify-center">
              <Waves className="h-12 w-12 text-primary/10" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                    <Award className="h-3 w-3 mr-1" /> 金牌认证
                  </Badge>
                  <Badge variant="outline" className="text-palm border-palm/30">适老化</Badge>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold">海景花园精装两居 · 三亚湾一线海景</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> 三亚湾 · 天涯区</span>
                  <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-sand text-sand" /> 4.9 (128条评价)</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon"><Heart className="h-4 w-4" /></Button>
                <Button variant="outline" size="icon"><Share2 className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="flex items-center gap-6 mt-4 text-sm">
              <span className="flex items-center gap-1.5"><Bed className="h-4 w-4 text-muted-foreground" /> 2 卧室</span>
              <span className="flex items-center gap-1.5"><Bath className="h-4 w-4 text-muted-foreground" /> 1 卫生间</span>
              <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4 text-muted-foreground" /> 85 m²</span>
              <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-muted-foreground" /> 最多4人</span>
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h2 className="text-xl font-semibold mb-3">房源描述</h2>
            <p className="text-muted-foreground leading-relaxed">
              坐落于三亚湾一线海景位置，步行5分钟即达海滩。精装修两居室公寓，85平方米宽敞空间，全套品牌家电，适合家庭或情侣旅居。
              小区配套成熟，24小时安保，地下停车场，周边医院、超市、公园步行可达。特别配备适老化设施，包括无障碍卫生间扶手、紧急呼叫按钮等，非常适合老年旅居者。
              高层海景房，阳台可直观三亚湾日落，视野开阔。房源已通过平台金牌认证，品质有保障。
            </p>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-4">设施与服务</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {amenities.map((a) => (
                <div key={a.label} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <a.icon className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Life Circle */}
          <div>
            <h2 className="text-xl font-semibold mb-4">生活圈</h2>
            <div className="space-y-3">
              {lifeCircle.map((poi) => (
                <div key={poi.name} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">{poi.category}</Badge>
                    <span className="text-sm font-medium">{poi.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {poi.distance} · {poi.time}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 h-64 rounded-xl bg-muted flex items-center justify-center text-muted-foreground">
              <MapPin className="h-8 w-8 mr-2" /> 地图展示区域 (Mapbox GL)
            </div>
          </div>

          <Separator />

          {/* Reviews */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 fill-sand text-sand" /> 4.9 · 128 条评价
              </h2>
            </div>
            <div className="space-y-4">
              {reviews.map((r) => (
                <Card key={r.name} className="border-0 shadow-none bg-muted/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary">{r.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-sand text-sand" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary">¥3,800</span>
                <span className="text-muted-foreground">/月</span>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>日租 ¥380/晚</span>
                <span>季租 ¥10,000/季</span>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-2">
                <div className="border border-border rounded-lg p-3">
                  <label className="text-xs text-muted-foreground">入住日期</label>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">选择日期</span>
                  </div>
                </div>
                <div className="border border-border rounded-lg p-3">
                  <label className="text-xs text-muted-foreground">退房日期</label>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">选择日期</span>
                  </div>
                </div>
              </div>
              <div className="border border-border rounded-lg p-3">
                <label className="text-xs text-muted-foreground">住客人数</label>
                <div className="flex items-center gap-1 mt-1">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">2 位客人</span>
                </div>
              </div>
              <Link href={`/properties/${id}/book`}>
                <Button className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90">
                  立即预订
                </Button>
              </Link>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">月租费用</span><span>¥3,800</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">服务费</span><span>¥380</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">清洁费</span><span>¥200</span></div>
                <Separator />
                <div className="flex justify-between font-semibold text-base"><span>总计</span><span className="text-primary">¥4,380</span></div>
              </div>
              <p className="text-xs text-center text-muted-foreground">资金托管保障，入住确认后才放款</p>
            </CardContent>
          </Card>

          {/* Host Info */}
          <Card className="mt-4">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg">陈</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">陈先生</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="h-3 w-3 text-primary" /> 已认证房东
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                <div>
                  <div className="font-semibold">98%</div>
                  <div className="text-xs text-muted-foreground">回复率</div>
                </div>
                <div>
                  <div className="font-semibold">1小时内</div>
                  <div className="text-xs text-muted-foreground">回复速度</div>
                </div>
                <div>
                  <div className="font-semibold">2年</div>
                  <div className="text-xs text-muted-foreground">房东龄</div>
                </div>
              </div>
              <Button variant="outline" className="w-full">联系房东</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
