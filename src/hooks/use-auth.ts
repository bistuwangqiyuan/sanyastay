'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useAppStore } from '@/store/app-store';
import type { Profile } from '@/types/database';

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  const { user, setUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
        setUser(profile as Profile | null);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setUser(profile as Profile | null);
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, setUser]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  }, [supabase, setUser, router]);

  return { user, loading, signOut };
}
