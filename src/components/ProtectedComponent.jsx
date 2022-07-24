import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";

const ProtectedComponent = ({ children, isLoggin = true }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(()=> {
    if(!user && isLoggin) {
      navigate('/login')
    }
    if(user && !isLoggin) {
      navigate('/')
    }
  },[user, isLoggin, navigate])

  
  return loading ? <div>loading ...</div> : children

};

export default ProtectedComponent;
