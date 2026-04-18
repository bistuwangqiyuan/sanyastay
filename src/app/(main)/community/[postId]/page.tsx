import { ArrowLeft, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default async function PostDetailPage({ params }: { params: Promise<{ postId: string }> }) {
  const { postId } = await params;

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <Link href="/community" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> 返回社区
      </Link>

      <article>
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary">海</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">海风小筑</p>
            <p className="text-sm text-muted-foreground">2小时前 · 旅居生活</p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-4">分享我在三亚湾旅居三个月的心得体会</h1>

        <div className="prose prose-slate max-w-none text-muted-foreground leading-relaxed space-y-4">
          <p>今年冬天是我第一次来三亚旅居，选了三亚湾的一套公寓住了三个月。从最开始的不适应到后来完全爱上这里的生活节奏，这段经历让我对&ldquo;旅居&rdquo;有了全新的理解。</p>
          <p>首先说选房，我当时在三亚旅居通上比较了很多房源，最后选了一套金牌认证的两居室公寓。面积85平，有全套家电和厨房，最重要的是步行5分钟就能到海边。月租3800元，相比旅游旺季的酒店价格来说非常划算。</p>
          <p>生活配套方面，三亚湾这边比较成熟。旺豪超市步行6分钟，解放军总医院海南医院也不远，日常买菜、看病都很方便。对于候鸟老人来说，这一点非常重要。</p>
          <p>这三个月里，我每天早上去海边散步，白天在家工作或者去附近的咖啡厅，傍晚去公园打太极。周末会和在社区认识的朋友一起出去转转。这种生活节奏让我特别放松。</p>
          <p>如果你也在考虑来三亚旅居，我的建议是：选房一定要看认证等级，生活圈功能很好用，可以看周边配套设施。另外加入旅居社区，能认识很多志同道合的朋友。</p>
        </div>

        <div className="flex items-center gap-6 mt-8 text-sm">
          <Button variant="ghost" className="gap-2"><Heart className="h-4 w-4" /> 156 赞</Button>
          <Button variant="ghost" className="gap-2"><MessageCircle className="h-4 w-4" /> 42 评论</Button>
          <Button variant="ghost" className="gap-2"><Share2 className="h-4 w-4" /> 分享</Button>
        </div>
      </article>

      <Separator className="my-8" />

      {/* Comments */}
      <div>
        <h2 className="font-semibold text-lg mb-4">评论 (42)</h2>
        <div className="flex gap-3 mb-6">
          <Avatar className="h-8 w-8 shrink-0">
            <AvatarFallback className="bg-muted text-xs">我</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea placeholder="写评论..." rows={3} />
            <Button size="sm" className="mt-2 bg-primary hover:bg-primary/90">发布评论</Button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { name: '阳光老李', text: '写得真好！我今年也打算来三亚过冬，请问那套公寓还有空吗？', time: '1小时前', likes: 12 },
            { name: '候鸟一族', text: '同在三亚湾！下次一起去海边散步啊', time: '1小时前', likes: 8 },
            { name: 'TravelBee', text: 'Great sharing! The SanyaStay platform really helped me find my perfect winter home.', time: '2小时前', likes: 5 },
          ].map((comment) => (
            <Card key={comment.name} className="border-0 bg-muted/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{comment.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{comment.name}</p>
                    <p className="text-xs text-muted-foreground">{comment.time}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-10">{comment.text}</p>
                <div className="ml-10 mt-2">
                  <Button variant="ghost" size="sm" className="text-xs gap-1 h-7">
                    <Heart className="h-3 w-3" /> {comment.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs h-7">回复</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
