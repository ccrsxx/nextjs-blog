import Link from 'next/link';

export function BackHome() {
  return (
    <Link href='/'>
      <a className='text-lg'>← Back to home</a>
    </Link>
  );
}
