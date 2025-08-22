import React, { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const PaymentSuccess = () => {
  const { setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const sessionId = query.get("session_id");

    if (!sessionId) {
      navigate('/');
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/payment/verify-session`,
          {
            params: { sessionId }, // replace "me" with actual userId if needed
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        if (res.status === 200) {
          toast.success("Payment successful!");
          setQuantities({}); // clear frontend cart
          navigate("/myorders");
        } else {
        
          navigate("/");
        }
      } catch (err) {
     
        navigate("/");
      }
    };

    verifyPayment();
  }, [location, navigate, setQuantities, token]);

  return <div>Processing your payment...</div>;
};

export default PaymentSuccess;
