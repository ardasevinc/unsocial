import { Skeleton } from '@/components/ui/skeleton';

export default function Stats() {
  return (
    <section className='space-y-8'>
      <h1 className='text-center text-xl'>Live Stats</h1>
      <div className='space-y-4'>
        <Skeleton className='size-60' />
        <Skeleton className='size-60' />
        <Skeleton className='size-60' />
        <Skeleton className='size-60' />
      </div>
    </section>
  );
}
