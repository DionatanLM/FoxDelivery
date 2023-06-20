import HomePage from '@/views/HomePage';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]';
import userService from '@/services/user.service';

export default function Home({ userStore }) {
  return <HomePage userStore={userStore} />;
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const userStore = await userService.findStoreByUserUuid(
      session?.bju,
      session?.accessToken
    );

    return {
      props: { userStore },
    };
  } catch (e) {
    return {
      props: {},
    };
  }
}
