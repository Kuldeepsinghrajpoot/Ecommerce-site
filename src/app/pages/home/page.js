'use client'

import { add } from '@/Redux/Cartslice'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeroSection from '@/app/components/herosection/page'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
const Home = () => {
  const [products, setproducts] = useState([]);
  const elementsRef = useRef([]);
  const getproducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    setproducts(data);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    getproducts();

  }, [])

  useEffect(() => {
    // Animate the elements when the data changes
    elementsRef.current.forEach((element, index) => {
      if (element) {
        gsap.to(element, {
          opacity: 1, 
          x: 0,
          duration: 1,
          delay: index * 0.1 ,
          ScrollTrigger:element
        });
      }
    });
  }, [products]);

  const handleadd = (products) => {
    dispatch(add(products))
    toast.success("Add to cart")
  }
  const cartitmes = useSelector((state) => state.cart);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartitmes))
  }, [cartitmes]);


  return (
 
<div class="min-h-screen    flex justify-center items-center ">
  <div class="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-6 gap-5 space-y-4 md:space-y-0  my-16">
    {products.map((product, key) => (
    <Link href={`../../pages/${product.id}`} key={key} class=" translate-y-20 opacity-0  transition-opacity-1s transition-transform-1s  cursor-pointer max-w-sm bg-white px-6 pt-6 pb-2 " 
    ref={(el) => (elementsRef.current[product.id] = el)}
  
  >
      <h3 class="mb-3 text-xl font-bold text-indigo-600">New collection</h3>
      <div class="relative  pt-3 overflow-hidden flex flex-wrap justify-center">
        <img class="w-44 max-h-44 object-cover object-center object-fill align-middle border-none rounded-sm" src={product.image} alt="Colors"  />
        <p class="absolute flex flex-wrap justify-start top-0 bg-yellow-300 text-gray-800 font-semibold py-1 px-3 rounded-br-lg rounded-tl-lg">₹{product.price}</p>
      </div>
      <h1 class="mt-4 text-gray-800 text-sm  ">{product.title}</h1>
      <div class="my-4">
       
        
        {/* <button class="mt-4 text-xl w-full text-white bg-indigo-600 py-2 rounded-xl shadow-lg">Buy Lesson</button> */}
      </div>
    </Link>
    ))}
    
  </div>
</div>



  )
}

export default Home;

