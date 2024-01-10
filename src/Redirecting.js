import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Redirecting = () => {
  const navigate = useNavigate();

  useEffect(() => 
      navigate('/login'),
    [ navigate]);

  return;
};

export default Redirecting;
