import { MessageCircle, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const conversations = [
  { id: '1', name: '陈先生', lastMessage: '欢迎入住！有任何问题随时联系我。', time: '2分钟前', unread: 1, avatar: '陈' },
  { id: '2', name: '李房东', lastMessage: '房间已准备好，期待您的到来！', time: '昨天', unread: 0, avatar: '李' },
  { id: '3', name: '系统通知', lastMessage: '您的预订已确认', time: '2天前', unread: 2, avatar: '系' },
];

export default function MessagesPage() {
  return (
    <div className="max-w-5xl">
      <h1 className="text-2xl font-bold mb-6">消息</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
        {/* Conversation List */}
        <Card className="md:col-span-1 overflow-hidden">
          <CardContent className="p-0">
            <div className="p-3 border-b border-border">
              <Input placeholder="搜索对话..." className="h-9" />
            </div>
            <div className="divide-y divide-border">
              {conversations.map((c) => (
                <div key={c.id} className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer transition-colors">
                  <Avatar className="h-10 w-10 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">{c.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{c.name}</span>
                      <span className="text-xs text-muted-foreground">{c.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{c.lastMessage}</p>
                  </div>
                  {c.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">{c.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="md:col-span-2 flex flex-col">
          <div className="p-4 border-b border-border flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">陈</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">陈先生</h3>
              <p className="text-xs text-muted-foreground">海景花园精装两居 · 房东</p>
            </div>
          </div>
          <div className="flex-1 p-4 space-y-4 overflow-y-auto">
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
                <p className="text-sm">您好！感谢您预订我的房源。入住前有任何问题都可以问我。</p>
                <p className="text-xs text-muted-foreground mt-1">10:30</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2">
                <p className="text-sm">您好！请问公寓有停车位吗？</p>
                <p className="text-xs opacity-70 mt-1">10:32</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
                <p className="text-sm">有的，小区地下停车场有免费车位。入住时我会给您门禁卡。</p>
                <p className="text-xs text-muted-foreground mt-1">10:33</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-muted rounded-2xl rounded-tl-sm px-4 py-2">
                <p className="text-sm">欢迎入住！有任何问题随时联系我。</p>
                <p className="text-xs text-muted-foreground mt-1">10:35</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-border flex gap-2">
            <Input placeholder="输入消息..." className="flex-1" />
            <Button size="icon" className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
