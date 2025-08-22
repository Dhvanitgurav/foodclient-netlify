import axios from "axios";

const API_URL="https://foodrestapi-production-5593.up.railway.app/api/cart";
export const  addToCart = async(foodId, token) =>{
    try{
await axios.post(API_URL, {foodId}, {headers: {"Authorization": `Bearer ${token}`}});
    }catch(error){
console.error('Error while adding the cart data');
    }

}

export const  removeQtyFromCart = async(foodId, token) =>{
    try{
axios.post(API_URL+"/remove", {foodId}, {headers: {"Authorization": `Bearer ${token}`}});
    }catch(error){
        console.error('Error while removing the  cart data');
    }

}
export const getCartData = async(token) => {
  try {
    const response = await axios.get(API_URL, { headers: { "Authorization": `Bearer ${token}` } });
    return response.data?.items || [];
  } catch (error) {
    console.error('Error while fetching the cart data');
    return []; // return empty array if API fails
  }
}
