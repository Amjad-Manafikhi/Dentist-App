import { parse } from 'cookie';
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookieHeader = context.req.headers.cookie || '';
  const cookies = parse(cookieHeader);

  console.log('Server-side cookies:', cookies); // This will include HTTP-only cookies like "session"

  return {
    props: {
      session: cookies.session || null,
    },
  };
};

export default function Home({ session }: { session: string | null }) {
  return <div>Session Cookie: {session || 'None found'}</div>;
}
