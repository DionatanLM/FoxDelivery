import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import authService from '../../../services/auth.service';

export const authOptions = {
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: 'foxdelivery',
      name: 'foxdelivery',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
        cnpj: { label: 'CNPJ', type: 'text' },
        cellphone: { label: 'Cellphone', type: 'text' },
        name: { label: 'Name', type: 'text' },
      },
      async authorize({ username, password, cnpj, cellphone, name }) {
        if (cnpj && cellphone) {
          try {
            const data = { username, password, cnpj, cellphone, name };
            const res = await authService.register(data);
            if (res.error) {
              throw new Error(res.error.message);
            }
            const userData = {
              id: res.user.uuid,
              email: res.user.username,
              image: res.user.imgUrl,
              name: res.user.name,
              access_token: res.token,
            };
            if (userData) {
              return userData;
            }
            return null;
          } catch (error) {
            throw new Error(error.message);
          }
        } else {
          //RegularLogin
          try {
            const data = {
              username,
              password,
            };
            const res = await authService.login(data);
            if (res.error) {
              if (res.error.status === 403) {
                const unauthenticatedUser = {
                  username: username,
                  name: 'Guest',
                };
                return unauthenticatedUser;
              } else if (res.error.status != 200) {
                throw new Error(res.error.message);
              }
            }

            const userData = {
              id: res.user.uuid,
              email: res.user.username,
              image: res.user.imgUrl,
              name: res.user.name,
              access_token: res.token,
            };
            if (userData) {
              return userData;
            }
          } catch (error) {
            throw new Error(error.message);
          }
          return null;
        }
      },
    }),
  ],
  jwt: { maxAge: 60 * 60 * 24 * 30 },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (trigger === 'update' && session) {
        if (session?.image) {
          token.picture = session.image;
        }
      }
      if (user) {
        token.bju = user.id;
        token.accessToken = user.access_token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session) {
        session.accessToken = token.accessToken;
        session.bju = token.bju;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);
