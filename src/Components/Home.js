import React from 'react';
import { CartState } from '../Context/Context';
import SingleProducts from '../Components/SingleProducts';
import './styles.css';
import Filters from './Filters';

function Home() {

  const { 
    state : { products },
    productState : { sort, byStock, byFastDelievery, byRating, searchQuery}
  }= CartState();

  const transformProducts = () =>{
    let sortedProducts = products;

    if(sort){
      sortedProducts=sortedProducts.sort((a,b)=>(
        sort==='lowToHigh'?a.price-b.price:b.price-a.price
      ));
    }

    if(!byStock){
      sortedProducts= sortedProducts.filter((prod) => prod.inStock);
    }
    if(byFastDelievery){
      sortedProducts=sortedProducts.filter((prod) => prod.fastDelivery)  
    }

    if(byRating){
      sortedProducts=sortedProducts.filter((prod) => prod.ratings >= byRating)
    }

    if(searchQuery){
      sortedProducts=sortedProducts.filter((prod)=> prod.name.toLowerCase().includes(searchQuery))
    }

    return sortedProducts;
  }


  return (
    <div className='home'>
      <Filters/>
        <div className='productContainer'>
            {
              transformProducts().map((prod)=>{
               return <SingleProducts prod={prod} key={prod.id}/>
              })
            }
        </div>
    </div>
  )
}

export default Home