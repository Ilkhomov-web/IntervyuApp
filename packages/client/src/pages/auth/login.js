import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { routes } from '@config';

// Auth bu shaxsiy platforma uchun majburiy emas.
// Eski URL'larni saqlash uchun bosh sahifaga redirect qilamiz.
export default function LoginPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(routes.home);
  }, [router]);
  return null;
}
