import { Skeleton } from '@/components/ui/skeleton';

export default function Stats() {
  return (
    <section className='space-y-8 w-full'>
      <h1 className='text-center text-xl'>Live Stats</h1>
      <div className='w-full flex flex-col items-center gap-y-4'>
        <Skeleton className='w-full h-40' />
        <Skeleton className='w-full h-40' />
        <Skeleton className='w-full h-40' />
        <Skeleton className='w-full h-40' />
      </div>
    </section>
  );
}
