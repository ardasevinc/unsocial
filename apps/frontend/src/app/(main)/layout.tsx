export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div className='flex pt-10 px-4'>{children}</div>;
}
