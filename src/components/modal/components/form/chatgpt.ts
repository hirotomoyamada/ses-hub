import OpenAI from 'openai';
import { APIError } from 'openai/error';
import { CreateChatCompletionRequestMessage } from 'openai/resources/chat';
import { Matter, Resource } from 'types/post';
import {
  adjustment,
  approval,
  area,
  belong,
  costs,
  createPrompt,
  distribution,
  handle,
  industry,
  interviews,
  parallel,
  position,
  sex,
  span,
  tool,
} from './prompt';
import { CompletionUsage } from 'openai/resources';

type Posts = Matter[] | Resource[];

export const openai = new OpenAI({
  organization: 'org-HfOLmKRL8HbzYbEBNnsvwr2y',
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

export const completePost = async ({
  index,
  content,
}: {
  index: 'matters' | 'resources';
  content: string;
}) => {
  let errors: any[] = [];

  const contents = content
    .split(/(\S)\1{4,}/)
    .filter((v) => v.trim() !== '' && v.length > 1)
    .map((v) => v.trim());

  const data = await Promise.all(
    contents.map(async (content, i) => {
      try {
        const { posts, usage } = await createData({ index, content });

        return { posts, usage };
      } catch (e) {
        const n = i + 1;
        const label = index === 'matters' ? '案件' : '人材';

        if (e instanceof APIError) {
          console.log(e);

          if (e.error) errors = [...errors, e.error];

          if (e.code === 'context_length_exceeded') {
            throw new Error(`${n}件目の${label}情報の文字数が上限を超えました`);
          } else {
            throw new Error(`${n}件目の${label}情報の作成に失敗しました`);
          }
        }

        return undefined;
      }
    }),
  );

  const { posts, usages } = data.filter(Boolean).reduce(
    (prev, { posts, usage } = { posts: [], usage: undefined }) => {
      prev.posts = [...prev.posts, ...posts] as Posts;
      prev.usages = [...prev.usages, usage];

      return prev;
    },
    { posts: [], usages: [] } as { posts: Posts; usages: (CompletionUsage | undefined)[] },
  );

  return { data: { index, posts, usages, errors } };
};

const createData = async ({
  index,
  content,
}: {
  index: 'matters' | 'resources';
  content: string;
}) => {
  const location = new Date().toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
  });

  const date = new Date(location);

  const messages: CreateChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: createPrompt(index, date),
    },
    { role: 'user', content },
  ];

  const { choices, usage } = await openai.chat.completions.create({
    model: 'gpt-4-0125-preview',
    messages,
    temperature: 0,
  });

  let data = choices[0].message?.content;

  data = data?.replace(/^```(.*)?\s|\s```$/g, '') ?? null;

  let posts: Posts = JSON.parse(data ?? '[]');

  const defaultValues = { display: 'public', status: '新規' };

  posts = posts.map((values) =>
    formatPost({ index, post: { ...defaultValues, ...values } }),
  ) as Posts;

  console.log('usage', usage);
  console.log('posts', posts);

  return { posts, usage };
};

const formatPost = ({ index, post }: { index: 'matters' | 'resources'; post: any }) => {
  Object.keys(post).forEach((key) => {
    if (index === 'matters') {
      switch (key) {
        case 'industry':
          if (!industry.includes(post[key])) post[key] = '';
          break;

        case 'position':
          if (!position.includes(post[key])) post[key] = '';
          break;

        case 'location':
          if (!area.includes(post[key].area)) post[key].area = 'その他';
          break;

        case 'times':
          post[key].start = formatTime(post[key].start);
          post[key].end = formatTime(post[key].end);
          break;

        case 'handles':
          post[key] = (post[key] as any[]).filter((v) => handle.includes(v));

          if (!(post[key] as any[]).length) post[key] = ['その他'];

          break;

        case 'tools':
          post[key] = (post[key] as any[]).filter((v) => tool.includes(v));
          break;

        case 'interviews':
          if (!interviews.type.includes(post[key].type)) post[key].type = 'その他';
          if (!interviews.count.includes(post[key].count)) post[key].count = 'その他';
          if (!interviews.setting.includes(post[key].setting)) post[key].setting = '';
          break;

        case 'costs':
          if (!costs.type.includes(post[key].type)) post[key].type = 'スキル見合';
          break;

        case 'adjustment':
          if (!adjustment.includes(post[key])) post[key] = 'その他';
          break;

        case 'distribution':
          if (!distribution.includes(post[key])) post[key] = 'その他';
          break;

        case 'span':
          if (!span.includes(post[key])) post[key] = 'その他';
          break;

        case 'approval':
          if (!approval.includes(post[key])) post[key] = '不明';
          break;

        default:
          break;
      }
    } else {
      switch (key) {
        case 'position':
          if (!position.includes(post[key])) post[key] = '';
          break;

        case 'sex':
          if (!sex.includes(post[key])) post[key] = 'その他';
          break;

        case 'belong':
          if (!belong.includes(post[key])) post[key] = 'その他';
          break;

        case 'handles':
          post[key] = (post[key] as any[]).filter((v) => handle.includes(v));

          if (!(post[key] as any[]).length) post[key] = ['その他'];

          break;

        case 'tools':
          post[key] = (post[key] as any[]).filter((v) => tool.includes(v));
          break;

        case 'costs':
          if (!costs.type.includes(post[key].type)) post[key].type = '応談';
          break;

        case 'parallel':
          if (!parallel.includes(post[key])) post[key] = 'その他';
          break;

        default:
          break;
      }
    }
  });

  return post as Matter | Resource;
};

const formatTime = (time: string) =>
  time.replace(
    /^(\d{1,2}):(\d{2})$/,
    (_, hour: string, minute: string) => `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`,
  );
