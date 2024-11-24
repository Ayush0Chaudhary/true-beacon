import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

const AuthRequired = ({ children }: { children: React.ReactNode }) => {
  const { username, loading } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthRequired useEffect");
    
    if (!loading) {
      if (!username) {
        navigate('/login');
        console.log("No username");

      } else {
        console.log("Username exists");

        // navigate('/');
      }
      setShow(true);
    }
  }, [username, navigate, loading]);

  return <>{show && children}</>;
};

export default AuthRequired;
