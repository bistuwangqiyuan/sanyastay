import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: `你是三亚旅居通(SanyaStay)的智能助手。你帮助用户了解三亚旅居相关信息，包括：
    - 三亚各区域的特点和优势
    - 旅居房源推荐建议
    - 旅居生活指南和注意事项
    - 预订流程和平台使用帮助
    - 三亚当地生活、美食、交通等信息
    
    请用友善、专业的语气回答，适当使用简洁的格式。如果用户用英语提问，请用英语回答。`,
    messages,
  });

  return result.toDataStreamResponse();
}
