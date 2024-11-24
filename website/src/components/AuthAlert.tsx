import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

const AuthAlert = ({ children }: { children: React.ReactNode }) => {
  const { username } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthAlert useEffect");
    if(username){
        navigate('/');
    }else {
        console.log("No username in alert");
    }
    setShow(true);
  }, [username, navigate]);

  return <>{show && children}</>;
};

export default AuthAlert;
