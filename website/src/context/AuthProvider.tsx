import Loader from '@/components/ui/loader';
import { API_ENDPOINTS } from '@/const';
import { basicAxios } from '@/services/basicAxios';
import { createContext, useContext, useState, useEffect } from 'react';

interface _AUTH_CONTEXT {
  username: string | undefined;
}

const AuthContext = createContext<_AUTH_CONTEXT>({
  username: undefined,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getSession() {
      try {
        // const res = await basicAxios(API_ENDPOINTS.STATUS, undefined, undefined, 'GET');
        const at = localStorage.getItem('access_token');
        if (at !== null) {
          setUsername(at); // Update based on API response
        } else {
          setUsername(undefined);
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
        setUsername(undefined);
      } finally {
        setLoading(false);
      }
    }

    getSession();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const authValue = { username };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}
