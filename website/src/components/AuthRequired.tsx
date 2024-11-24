import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

const AuthRequired = ({ children }: { children: React.ReactNode }) => {
  const { username} = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthRequired useEffect");
    
    setTimeout(() => {
      if (!username) {
        navigate('/login');
        console.log("No username");

      } else {
        console.log("Username exists");

        // navigate('/');
      }
      setShow(true);
    }, 3000);

  }, [username, navigate]);

  return <>{show && children}</>;
};

export default AuthRequired;
