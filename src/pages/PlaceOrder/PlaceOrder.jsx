import React, { useContext, useState } from 'react';
import { StoreContext } from "../../context/StoreContext";
import './PlaceOrder.css';
import { assets } from "../../assets/assets";
import { calculateCartTotals } from '../../util/cartUtils';
import axios from 'axios';
import { toast } from "react-toastify";
import { stripe_key } from '../../util/constants';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(stripe_key);

const PlaceOrder = () => {
  const { foodList, quantities, setQuantities, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    state: '',
    city: '',
    zip: ''
  });

  const cartItems = foodList.filter(food => quantities[food.id] > 0);
  const { subTotal, shipping, tax, total } = calculateCartTotals(cartItems, quantities);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const clearCart = async () => {
    try {
      await axios.delete('https://foodrestapi-production-5593.up.railway.app/api/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setQuantities({});
    } catch (error) {
      toast.error('Error while clearing the cart');
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`https://foodrestapi-production-5593.up.railway.app/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      toast.error('Something went wrong. Contact support team');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const orderData = {
      userAddress: `${data.firstName} ${data.lastName} ${data.address} ${data.city} ${data.state} ${data.zip}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map(item => ({
        foodId: item.foodId,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        imageUrl: item.imageUrl,
        description: item.description,
        name: item.name
      })),
      amount: Math.round(total * 100), // Stripe expects amount in paise/cents
      orderStatus: "Preparing"
    };

    try {
      // 1️⃣ Create order in backend
      const response = await axios.post(
        'https://foodrestapi-production-5593.up.railway.app/api/orders/create',
        orderData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 && response.data.id) {
        const orderId = response.data.id;

        // 2️⃣ Create Stripe Checkout session
        const sessionResponse = await axios.post(
          "https://foodrestapi-production-5593.up.railway.app/api/payment/create-checkout-session",
          { orderId, amount: orderData.amount },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (sessionResponse.status === 200 && sessionResponse.data.id) {
          // 3️⃣ Redirect to Stripe Checkout
          const stripe = await stripePromise;
          const result = await stripe.redirectToCheckout({ sessionId: sessionResponse.data.id });

          if (result.error) {
            toast.error(result.error.message);
            // If redirect fails, delete order
            await deleteOrder(orderId);
          }
        } else {
          toast.error("Failed to create Stripe session");
          await deleteOrder(orderId);
        }
      } else {
        toast.error("Unable to place order. Try again.");
      }
    } catch (err) {
      toast.error("Something went wrong. Try again.");
    }
  };

  return (
    <div className="place-order-page">
      <div className="container mt-4">
        <div className="py-5 text-center">
          <img className="d-block mx-auto" src={assets.logo} alt="" width="98" height="98"/>
        </div>

        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span>Your cart</span>
              <span className="badge rounded-pill bg-primary">{cartItems.length}</span>
            </h4>
            <ul className="list-group mb-3">
              {cartItems.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6>{item.name}</h6>
                    <small>Qty: {quantities[item.id]}</small>
                  </div>
                  <span>&#8377;{item.price * quantities[item.id]}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between">
                <div>Shipping</div>
                <span>&#8377;{subTotal === 0 ? 0 : shipping.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <div>Tax (10%)</div>
                <span>&#8377;{tax.toFixed(2)}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between">
                <strong>Total</strong>
                <strong>&#8377;{total.toFixed(2)}</strong>
              </li>
            </ul>
          </div>

          <div className="col-md-8 order-md-1">
            <h4>Billing address</h4>
            <form onSubmit={onSubmitHandler}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>First name</label>
                  <input type="text" className="form-control" required name="firstName" onChange={onChangeHandler} value={data.firstName}/>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Last name</label>
                  <input type="text" className="form-control" required name="lastName" onChange={onChangeHandler} value={data.lastName}/>
                </div>
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" required name="email" onChange={onChangeHandler} value={data.email}/>
              </div>
              <div className="mb-3">
                <label>Phone Number</label>
                <input type="number" className="form-control" required name="phoneNumber" onChange={onChangeHandler} value={data.phoneNumber}/>
              </div>
              <div className="mb-3">
                <label>Address</label>
                <input type="text" className="form-control" required name="address" onChange={onChangeHandler} value={data.address}/>
              </div>
              <div className="row">
                <div className="col-md-5 mb-3">
                  <label>State</label>
                  <select className="custom-select d-block w-100" required name="state" onChange={onChangeHandler} value={data.state}>
                    <option value="">Choose...</option>
                    <option>Maharashtra</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label>City</label>
                  <select className="custom-select d-block w-100" required name="city" onChange={onChangeHandler} value={data.city}>
                    <option value="">Choose...</option>
                    <option>Sangli</option>
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label>Zip</label>
                  <input type="number" className="form-control" required name="zip" onChange={onChangeHandler} value={data.zip}/>
                </div>
              </div>
              <hr className="mb-4"/>
              <button className="btn btn-primary btn-lg w-100" type="submit" disabled={cartItems.length === 0}>
                Continue to Payment
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
