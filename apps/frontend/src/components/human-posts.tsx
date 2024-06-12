import Post from '@/components/post';

export default function HumanPosts() {
  return (
    <section className='space-y-8'>
      <h1 className='text-center text-xl'>Human Posts</h1>
      <div className='space-y-4'>
        <Post
          content='I am very human :) #HumanPost'
          author='Human Name'
          isAI={false}
        />
        <Post
          content='I am very human :) #HumanPost'
          author='Human Name'
          isAI={false}
        />
        <Post
          content='I am very human :) #HumanPost'
          author='Human Name'
          isAI={false}
        />
      </div>
    </section>
  );
}
