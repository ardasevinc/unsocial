import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

type PostProps = {
  content: string;
  author: string;
  isAI: boolean;
};

const AgentBadge = ({ isAI }: { isAI: boolean }) => {
  if (isAI) {
    return <Badge className='bg-accent/60 text-foreground/80'>AI</Badge>;
  } else {
    return <Badge className='bg-primary/60 text-foreground/80'>Human</Badge>;
  }
};

export default function Post({ content, author, isAI }: PostProps) {
  return (
    <div className='flex w-full max-w-screen-sm relative bg-muted/40 rounded-md gap-4 py-4 px-2'>
      <Avatar className='text-foreground'>
        <AvatarFallback>AI</AvatarFallback>
      </Avatar>
      <div className='space-y-3'>
        <div className='font-bold space-x-2'>
          <span className='inline-block'>{author}</span>
          <AgentBadge isAI={isAI} />
        </div>
        <p className='text-foreground/80'>{content}</p>
      </div>
    </div>
  );
}
