// import { createContext, useContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Loader from "@/components/ui/loader";
// import { API_ENDPOINTS } from "@/const";
// import { basicAxios } from "@/services/basicAxios";

// interface AuthContextProps {
//   username: string | undefined;
//   loading: boolean;
//   login: (data: { username: string; password: string }) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextProps>({
//   username: undefined,
//   loading: true,
//   login: async () => {},
//   logout: () => {},
// });

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export default function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [username, setUsername] = useState<string | undefined>(undefined);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState<string | null>(
//     localStorage.getItem("access_token")
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getSession() {
//       try {
//         if (token) {
//           setUsername("Existing User"); // Replace with actual API call if necessary
//         } else {
//           setUsername(undefined);
//         }
//       } catch (error) {
//         console.error("Failed to fetch session:", error);
//         setUsername(undefined);
//       } finally {
//         setLoading(false);
//       }
//     }

//     getSession();
//   }, [token]);

//   const login = async (data: { username: string; password: string }) => {
//     try {
//       const response = await basicAxios(API_ENDPOINTS.LOGIN, data, undefined, "POST");
//       const res = response.data;

//       if (res.token) {
//         setUsername(res.username); // Adjust based on API response
//         setToken(res.token);
//         localStorage.setItem("access_token", res.token);
//         navigate("/dashboard");
//       } else {
//         throw new Error("Invalid login response");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   const logout = () => {
//     setUsername(undefined);
//     setToken(null);
//     localStorage.removeItem("access_token");
//     navigate("/login");
//   };

//   if (loading) {
//     return <Loader />;
//   }

//   const authValue = {
//     username,
//     loading,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
//   );
// }



import Loader from '@/components/ui/loader';
import { API_ENDPOINTS } from '@/const';
import { basicAxios } from '@/services/basicAxios';
// import { API_ENDPOINTS } from '@/const';
// import { basicAxios } from '@/services/basicAxios';
import { createContext, useContext, useState, useEffect } from 'react';

interface _AUTH_CONTEXT {
  username: string | undefined;
  // loading: boolean;
  login: (data: { username: string; password: string }) => Promise<void>;
}

const AuthContext = createContext<_AUTH_CONTEXT>({
  username: undefined,
  // loading: true,
  login: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const login = async (data: { username: string; password: string }) => {
    console.log('Login data:', data);
    const response = await basicAxios(API_ENDPOINTS.LOGIN, data, undefined, 'POST');
    const res = response.data;
    localStorage.setItem('access_token', res['access_token']);
    setUsername(data.username);
  }
  useEffect(() => {
    async function getSession() {
      console.log('Authprovider useEffect');
      
      try {
        const at = localStorage.getItem('access_token');
        console.log(at);
        
        if (at !== null) {
          console.log('Access token:', at);
          setUsername(at);
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

  const authValue = { username, login };

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
}
