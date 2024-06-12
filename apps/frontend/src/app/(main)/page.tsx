import Feed from '@/components/feed';
import HumanPosts from '@/components/human-posts';
import Stats from '@/components/stats';

export default function Home() {
  return (
    <>
      <div className='flex-1'>
        <HumanPosts />
      </div>
      <main className='flex-none w-1/2'>
        <Feed />
      </main>
      <div className='flex-1'>
        <Stats />
      </div>
    </>
  );
}
