import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './FoodItem.css';
const FoodItem = ({name, description, id, imageUrl, price}) => {
  const {increaseQuantity, decreaseQuantity, quantities}=useContext(StoreContext);
  return (
    <div  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">
    <div className="card h-100 hover-card" style={{"maxWidth": "320px", "width": "100%"}}>
    <Link to={`/food/${id}`}>
    <img src={imageUrl}
  className="card-img-top"
  alt="Product"
  style={{ height: "200px", width: "100%", objectFit: "cover" }} // uniform height and cropping
/> 
</Link>

    <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0">&#8377;{price}</span>
            <div>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-half text-warning"></i>
                <small className="text-muted">(4.5)</small>
            </div>
        </div>
    </div>
    <div className="card-footer d-flex justify-content-between bg-light">
   <Link
    to={`/food/${id}`}
    className="btn btn-dark btn-sm px-3 rounded-pill"
    style={{ fontWeight: '500' }}
  >
    View Food
  </Link>
       {quantities[id] > 0 ? (
          <div className="d-flex align-items-center gap-2">
    <button
    className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
    style={{ width: '36px', height: '36px' }}
    onClick={() => decreaseQuantity(id)}
  >
    <i className="bi bi-dash"></i>
  </button>
            <span className='fw-bold'>{quantities[id]}</span>
<button
    className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
    style={{ width: '36px', height: '36px' }}
    onClick={() => increaseQuantity(id)}
  >
    <i className="bi bi-plus"></i>
  </button>
          </div>
        ) : (<button
    className="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
    style={{ width: '36px', height: '36px' }}
    onClick={() => increaseQuantity(id)}
  >
    <i className="bi bi-plus"></i>
  </button>
       )}
    </div>
</div>
</div>
  )
}

export default FoodItem;