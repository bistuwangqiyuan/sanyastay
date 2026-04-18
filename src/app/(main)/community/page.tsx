'use client';

import { useState } from 'react';
import { MessageCircle, Heart, Share2, Plus, Calendar as CalendarIcon, Users, TrendingUp, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { SectionHeading } from '@/components/shared/section-heading';
import { COMMUNITY_CATEGORIES } from '@/lib/constants';
import Link from 'next/link';

const mockPosts = [
  { id: '1', author: '海风小筑', avatar: '海', category: 'life', title: '分享我在三亚湾旅居三个月的心得体会', content: '今年冬天是我第一次来三亚旅居，选了三亚湾的一套公寓住了三个月。从最开始的不适应到后来完全爱上这里的生活节奏...', likes: 156, comments: 42, time: '2小时前', images: 3 },
  { id: '2', author: 'SunnyDays', avatar: 'S', category: 'food', title: '三亚本地人推荐的10家海鲜餐厅', content: '在三亚住了半年，终于整理出一份靠谱的海鲜餐厅攻略。这些都是本地朋友带我去的，不是旅游区的坑...', likes: 298, comments: 87, time: '5小时前', images: 5 },
  { id: '3', author: '养生达人', avatar: '养', category: 'health', title: '三亚冬季养生指南：温泉、太极、食疗', content: '退休后每年来三亚过冬已经三年了。总结了一些适合候鸟老人的养生方式，希望对大家有帮助...', likes: 89, comments: 23, time: '1天前', images: 0 },
  { id: '4', author: '旅居小王', avatar: '王', category: 'travel', title: '周末去蜈支洲岛，附超详细攻略', content: '上周末终于去了蜈支洲岛！景色真的太美了，分享一下我的经验和拍照攻略...', likes: 445, comments: 112, time: '2天前', images: 8 },
  { id: '5', author: '邻居老张', avatar: '张', category: 'social', title: '下周六组织海边烧烤，有人来吗？', content: '在大东海住的邻居们！下周六下午准备在附近海滩搞一次烧烤聚会，欢迎旅居的朋友们一起来！', likes: 67, comments: 31, time: '3天前', images: 0 },
];

const mockEvents = [
  { id: '1', title: '三亚湾候鸟太极晨练', date: '每周一/三/五 7:00', location: '三亚湾海月广场', attendees: 45, category: '健身' },
  { id: '2', title: '海棠湾社区读书会', date: '每周六 15:00', location: '海棠湾万达茂', attendees: 20, category: '文化' },
  { id: '3', title: '大东海摄影爱好者聚会', date: '4月20日 16:00', location: '大东海沙滩', attendees: 32, category: '兴趣' },
];

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = activeCategory === 'all'
    ? mockPosts
    : mockPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">旅居社区</h1>
          <p className="text-sm text-muted-foreground mt-1">分享你的三亚旅居生活</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus className="h-4 w-4" /> 发布动态
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant={activeCategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setActiveCategory('all')}
            >
              全部
            </Badge>
            {COMMUNITY_CATEGORIES.map((cat) => (
              <Badge
                key={cat.value}
                variant={activeCategory === cat.value ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </Badge>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">{post.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.time}</p>
                      </div>
                      <Badge variant="outline" className="ml-auto text-xs">
                        {COMMUNITY_CATEGORIES.find((c) => c.value === post.category)?.label}
                      </Badge>
                    </div>
                    <h3 className="font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.content}</p>
                    {post.images > 0 && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                        <ImageIcon className="h-3.5 w-3.5" /> {post.images} 张图片
                      </div>
                    )}
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5 hover:text-coral"><Heart className="h-4 w-4" /> {post.likes}</span>
                      <span className="flex items-center gap-1.5 hover:text-primary"><MessageCircle className="h-4 w-4" /> {post.comments}</span>
                      <span className="flex items-center gap-1.5 hover:text-primary"><Share2 className="h-4 w-4" /> 分享</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Upcoming Events */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <CalendarIcon className="h-4 w-4 text-primary" /> 近期活动
              </h3>
              <div className="space-y-3">
                {mockEvents.map((event) => (
                  <div key={event.id} className="p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer">
                    <h4 className="font-medium text-sm">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    <p className="text-xs text-muted-foreground">{event.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">{event.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="h-3 w-3" /> {event.attendees}人参加
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/community/events">
                <Button variant="ghost" className="w-full mt-3 text-sm">查看全部活动</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Trending */}
          <Card>
            <CardContent className="p-5">
              <h3 className="font-semibold flex items-center gap-2 mb-4">
                <TrendingUp className="h-4 w-4 text-sand" /> 热门话题
              </h3>
              <div className="space-y-2">
                {['#三亚旅居攻略', '#候鸟生活', '#海南美食', '#养生健康', '#邻居社交'].map((tag, i) => (
                  <div key={tag} className="flex items-center justify-between py-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground w-5">{i + 1}</span>
                      <span className="text-sm text-primary hover:underline cursor-pointer">{tag}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {100 + ((i * 97 + tag.length * 13) % 401)}讨论
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
