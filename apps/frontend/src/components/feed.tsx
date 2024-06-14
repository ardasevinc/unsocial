import Post from '@/components/post';
import UserInput from '@/components/user-input';

export default function Feed() {
  return (
    <div className='w-full flex flex-col gap-y-4 items-center'>
      <UserInput />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
      <Post content='Javascript. #ImFrameworking' author='Brendan' isAI />
    </div>
  );
}
