import Image from 'next/image';
import Link from 'next/link';
import { Shield, Clock, Wallet, Users, Star, ChevronRight, Waves, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SearchBar } from '@/components/layout/search-bar';
import { SectionHeading } from '@/components/shared/section-heading';

const stats = [
  { value: '5,000+', label: '精选房源', labelEn: 'Properties' },
  { value: '50,000+', label: '注册用户', labelEn: 'Users' },
  { value: '9', label: '覆盖区域', labelEn: 'Areas' },
  { value: '4.8', label: '平均评分', labelEn: 'Avg Rating' },
];

const whyReasons = [
  {
    icon: Shield,
    title: '品质认证',
    desc: '所有房源经过严格实地验证，真实拍摄，确保入住体验与描述一致。',
    color: 'text-primary bg-primary/10',
  },
  {
    icon: Clock,
    title: '灵活租期',
    desc: '支持日租、月租、季租多种灵活方案，满足不同旅居需求。',
    color: 'text-sand bg-sand/10',
  },
  {
    icon: Wallet,
    title: '资金安全',
    desc: '第三方资金托管，入住确认后才放款给房东，全程保障资金安全。',
    color: 'text-palm bg-palm/10',
  },
  {
    icon: Users,
    title: '旅居社区',
    desc: '加入温暖的旅居社区，结识志同道合的邻居，共享美好旅居生活。',
    color: 'text-coral bg-coral/10',
  },
];

const popularAreas = [
  { name: '三亚湾', nameEn: 'Sanya Bay', properties: 1200, image: '/areas/sanya-bay.jpg', desc: '城市海岸线，生活便利' },
  { name: '亚龙湾', nameEn: 'Yalong Bay', properties: 800, image: '/areas/yalong-bay.jpg', desc: '高端度假区，碧海蓝天' },
  { name: '海棠湾', nameEn: 'Haitang Bay', properties: 650, image: '/areas/haitang-bay.jpg', desc: '免税购物天堂，新兴区域' },
  { name: '大东海', nameEn: 'Dadonghai', properties: 950, image: '/areas/dadonghai.jpg', desc: '旅居热门地，配套成熟' },
];

const testimonials = [
  { name: '张阿姨', role: '候鸟旅居者', text: '在三亚旅居通找到了理想的过冬住所，房源真实可靠，社区也很温暖。', rating: 5 },
  { name: 'Alex', role: 'Digital Nomad', text: 'Perfect platform for long-term stays in Sanya. Great WiFi, verified listings, and a wonderful community.', rating: 5 },
  { name: '李先生', role: '家庭旅居', text: '带父母来三亚过冬，适老化房源筛选功能太贴心了，父母住得很舒适。', rating: 5 },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-sand/5" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-sand/5 blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm bg-sand/10 text-sand-dark border-sand/20">
            <Waves className="h-3.5 w-3.5 mr-1.5" />
            三亚领先旅居平台
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
            在三亚，找到你的
            <br />
            <span className="text-primary">第二个家</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            从短租到季租，探索三亚最优质的旅居房源。品质认证、资金托管、旅居社区——一站式旅居服务平台。
          </p>
          <SearchBar variant="hero" className="mb-8" />
          <div className="flex flex-wrap items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <span>热门搜索：</span>
            {['三亚湾 月租', '亚龙湾 别墅', '海景房', '适老化'].map((tag) => (
              <Link
                key={tag}
                href={`/properties?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4 max-w-2xl mx-auto">
            上表为种子期至 Y1 阶段目标量级示意（对齐商业计划书融资与 MVP 里程碑），非实时运营数据；正式披露以审计与监管报送为准。
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="为什么选择三亚旅居通" subtitle="我们致力于为每一位旅居者提供安全、便捷、温暖的旅居体验" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyReasons.map((reason) => (
              <Card key={reason.title} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4 ${reason.color}`}>
                    <reason.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{reason.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Areas */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeading title="热门旅居区域" subtitle="探索三亚及周边最受欢迎的旅居目的地" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularAreas.map((area) => (
              <Link key={area.name} href={`/properties?district=${area.name}`}>
                <Card className="overflow-hidden group cursor-pointer border-0 shadow-sm hover:shadow-lg transition-all">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={area.image}
                      alt={area.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/35 to-sand/25 mix-blend-multiply" />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Waves className="h-16 w-16 text-white/25" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                      <h3 className="text-white font-bold text-xl">{area.name}</h3>
                      <p className="text-white/80 text-sm">{area.desc}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{area.properties} 套房源</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading title="用户真实评价" subtitle="听听旅居者们怎么说" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-sand text-sand" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-ocean-dark text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">开始你的三亚旅居之旅</h2>
          <p className="text-lg opacity-90 max-w-xl mx-auto mb-8">
            立即注册，探索数千套精选旅居房源，开启你的三亚美好生活。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-sand hover:bg-sand-dark text-foreground font-semibold px-8 h-12 text-base">
                免费注册
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link href="/properties">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 h-12 text-base">
                浏览房源
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
