import React, { useRef } from 'react'
import { categories } from '../../assets/assets';
import './ExploreMenu.css';
function ExploreMenu({category, setCategory}) {
  const menuRef=useRef(null);
  const scrollLeft = () =>{
    if(menuRef.current){
      menuRef.current.scrollBy({left: -200, behavior: 'smooth'});

    }
  }
    const scrollRight = () =>{
    if(menuRef.current){
      menuRef.current.scrollBy({left: 200, behavior: 'smooth'});
      
    }
  }
  return (
    <div className="explore-menu position-relative">
      <h1 className="d-flex align-items-center justify-content-between fw-bold">
       Explore Our Food
        <div className="d-flex">
        <i className='bi bi-arrow-left-circle scroll-icon' onClick={scrollLeft}></i>
                <i className='bi bi-arrow-right-circle scroll-icon ' onClick={scrollRight}></i>
      </div>
      </h1>
      <p className='text-muted fs-5 mb-4'>Enjoy a variety of dishes curated to satisfy every craving</p>
      <div className='d-flex justify-content-between gap-5 overflow-auto explore-menu-list' ref={menuRef}>
        {
          categories.map((item, index) => {
          return (
            <div key={index} className="text-center explore-menu-list-item" onClick={() =>setCategory(prev => prev===item.category ? 'All' : item.category)}>
            <img src={item.icon} alt="" className={item.category===category ? 'rounded-circle-active' : 'rounded-circle'} height={128} width={128} />
            <p className='mt-2 fw-bold'>{item.category}</p>
            </div>
  )
        })
        }
      </div>
    </div>
  )
}

export default ExploreMenu;