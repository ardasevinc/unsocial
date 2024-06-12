import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type PostProps = {
  content: string;
  author: string;
};

export default function Post({ content, author }: PostProps) {
  return (
    <div className='flex max-w-screen-sm min-w-96 relative bg-muted/40 rounded-md gap-4 py-4 px-2'>
      <Avatar className='text-foreground'>
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className=''>
        <p className='font-bold'>{author}</p>
        <p className='text-gray-300'>{content}</p>
      </div>
    </div>
  );
}
