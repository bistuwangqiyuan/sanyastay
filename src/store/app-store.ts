import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Profile, SearchFilters } from '@/types/database';

interface AppState {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  elderMode: boolean;
  toggleElderMode: () => void;
  locale: string;
  setLocale: (locale: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  searchFilters: SearchFilters;
  setSearchFilters: (filters: Partial<SearchFilters>) => void;
  resetSearchFilters: () => void;
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const defaultFilters: SearchFilters = {
  city: '三亚',
  sort_by: 'popular',
  page: 1,
  per_page: 20,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      elderMode: false,
      toggleElderMode: () => set((state) => ({ elderMode: !state.elderMode })),
      locale: 'zh-CN',
      setLocale: (locale) => set({ locale }),
      currency: 'CNY',
      setCurrency: (currency) => set({ currency }),
      searchFilters: defaultFilters,
      setSearchFilters: (filters) =>
        set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters },
        })),
      resetSearchFilters: () => set({ searchFilters: defaultFilters }),
      isMobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ isMobileMenuOpen: open }),
    }),
    {
      name: 'sanyastay-storage',
      partialize: (state) => ({
        elderMode: state.elderMode,
        locale: state.locale,
        currency: state.currency,
      }),
    }
  )
);
