import { createContext, useState ,useEffect} from "react";
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

// Create the context
export const AppContext = createContext();

const AppContextProvider = (props) => {
  // Initialize state variables
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false); // Initialize showLogin correctly
  const [token,setToken]=useState(localStorage.getItem('token'))

  const[credit,setCredit]=useState(false)


  const backendUrl=import.meta.env.VITE_BACKEND_URL

  const navigate = useNavigate();

  const loadCreditsData=async()=>{
    try{
      const {data} =await axios.get(backendUrl+'api/user/credits',{headers:{token}})

      if(data.success){
        setCredit(data.credits)
        setUser(data.user)
      }

    }catch(error){
      console.log(error)
      toast.error(error.message)
    }
  }


  const generateImage = async (prompt) => {
    try {
      const { data } = await axios.post(
          backendUrl+'api/image/generate-image', // Replace with your backend URL
            { prompt },
            {
                headers: { token },
            }
        );

        if (data.success) {
            loadCreditsData(); // Assuming this is defined elsewhere in your context
            return data.resultImage; // Return generated image
        } else {
            toast.error(data.message);
            loadCreditsData();

            if (data.creditBalance === 0) {
                navigate('/buy');
            }
        }
    } catch (error) {
        toast.error(error.message);
    }
};

  const logout=()=>{
    localStorage.removeItem('token');
    setToken('')
    setUser(null)
  }

  useEffect(()=>{
    if(token){
      loadCreditsData()
    }
  },[token])

  // Context value to be passed down
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,token,setToken,credit,setCredit,
    loadCreditsData,
    logout,generateImage
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
