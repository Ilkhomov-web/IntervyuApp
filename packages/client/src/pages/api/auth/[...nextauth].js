import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:1337';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(`${API_URL}/api/auth/local`, {
            identifier: credentials.identifier,
            password: credentials.password,
          });

          if (data?.jwt && data?.user) {
            return {
              id: data.user.id,
              name: data.user.username,
              email: data.user.email,
              jwt: data.jwt,
              role: data.user.role,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.jwt = token.jwt;
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
