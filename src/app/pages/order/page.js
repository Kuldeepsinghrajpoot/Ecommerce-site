
'use client'

import React, { useContext } from 'react'

// import Layout from '../../components/layout/Layout'
import Loader from '../loader/page'
import myContext from '@/context/myContext'

function Order() {
  const userid = JSON.parse(localStorage.getItem('user')).user.uid
  const context = useContext(myContext)
  const { mode, loading, order } = context

  // console.log("orders here", order);
  return (
    <>
      {loading && <Loader />}
      {order.length > 0 ?
        (<div>

          <section className="text-gray-600 body-font overflow-hidden  h-full pt-10  bg-gray-100  py-11">
            <h2 className="text-2xl mx-56 px-54 font-medium text-gray-900 title-font  sticky top-10">Order Details</h2>
            <div className="container  mx-auto">
              {order.filter(obj => obj.userid == userid).map((order, key) => (
                <div key={key} className="-my-8 divide-y-2  divide-gray-100 shadow-sm   ">

                  {order.cartitmes.map((item, key) => (

                    <div key={key} className="py-8  wo gap-4 place-items-center  justify-center  w-auto grid grid-cols-1 md:grid-cols-4 bg-white">
                      <div className="md my-10 md:mb-0 mb-6 flex-shrink-0 flex flex-col ">
                        <img className=" object-center font-semibold title-font text-gray-700 w-28 h-28" src={item.image} />
                        <span className="text-sm text-gray-500">{order.date}</span>
                      </div>
                      <div className='md:flex-grow'>
                        <h2 className='text-2xl font-medium text-gray-900 title-font mb-2'>

                       {order.date}
                        </h2>
                      </div>
                      <div className='md:flex-grow'>
                        <h2 className='text-2xl font-medium text-gray-900 title-font mb-2'>

                        ₹{item.price}
                        </h2>
                      </div>
                      
                      <div className="md:flex-grow  ">
                        <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.title}</h2>
                        <p className="leading-relaxed flex justify-start">{item.description}</p>

                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>

        </div>)
        :
        (
          <h2 className=' text-center tex-2xl text-white'>Not Order</h2>
        )

      }
    </>
  )
}

export default Order