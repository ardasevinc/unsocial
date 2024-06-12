import Feed from '@/components/feed';

export default function Home() {
  return (
    <>
      <div className='flex-1'></div>
      <main className='flex-none w-1/2'>
        <Feed />
      </main>
      <div className='flex-1'></div>
    </>
  );
}
