import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  username: string;
  isDarkMode: boolean;
  setUsername: (username: string) => void;
  setDarkMode: (isDarkMode: boolean) => void;
}

const useUserPreferences = create<UserPreferences>()(
  persist(
    (set) => ({
      username: '',
      isDarkMode: false,
      setUsername: (username) => set({ username }),
      setDarkMode: (isDarkMode) => set({ isDarkMode }),
    }),
    {
      name: 'study-buddy-preferences',
    }
  )
);

export default useUserPreferences; 