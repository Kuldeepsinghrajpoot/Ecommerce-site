'use client'

import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../../context/myContext';
import { useDispatch, useSelector } from 'react-redux';
import { remove } from '@/Redux/Cartslice';
import Modal from '../Modal/page';
import { getCookies } from 'cookies-next';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '@/app/firebase/page';


function Cart() {
  // cookies

  // const ui = getCookies('authToken');
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("user id", user.user.uid);




  // const item  = useSelecter  
  const context = useContext(myContext)
  const { mode } = context;

  // const useDispatch
  const dispatch = useDispatch();
  const cartitmes = useSelector((state) => state.cart);

  const deleteItem = (id) => {
    dispatch(remove(id));

  }
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartitmes))
  }, [cartitmes]);


  const [price, setprice] = useState([]);

  useEffect(() => {

    let temp = 0;
    cartitmes.forEach((cartItem) => {
      temp = temp + parseFloat(cartItem.price);
    });
    setprice(temp.toFixed(3));
  }, [cartitmes]);


  const [name, setName] = useState("")
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")

  const item = useSelector((state) => state.cart)
  const BuyNow = async () => {


    // validation 
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    }
    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
    }
    console.log(addressInfo)

    var options = {
      key: "",
      key_secret: "",
      amount: parseInt(price * 100),
      currency: "INR",
      order_receipt: 'order_rcptid_' + name,
      name: "India Store",
      description: "for testing purpose",
      handler: function (response) {

        // console.log(response)
        toast.success('Payment Successful')

        const paymentId = response.razorpay_payment_id
        // store in firebase 
        const orderInfo = {
          cartitmes,
          addressInfo,
          date: new Date().toLocaleString(
            "en-US",
            {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }
          ),
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,


          paymentId
        }

        console.log("uid cart", JSON.parse(localStorage.getItem("user")).user.uid);

        try {
          const orderRef = collection(fireDB, "order");
          addDoc(orderRef, orderInfo);

        } catch (error) {
          console.log(error)
        }
      },

      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
    console.log(pay)
  }

  return (

    <div className="  pt-5   " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      {item.length > 0 ? (
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
          <div className="rounded-lg md:w-2/3 ">
            {
              cartitmes.map((item, key) => (

                <div key={key.id} className="justify-between mb-6 rounded-sm    bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                  <img src={item.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.title}</h2>
                      <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{item.description}</h2>
                      <p className="mt-3 text-lg font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{item.price}</p>
                    </div>
                    <button type='button' onClick={() => deleteItem(item.id)} className=" top-0 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>

                    </button>
                  </div>
                </div>

              ))
            }


          </div>

          <div className="mt-6 h-full sticky  top-32 rounded-sm  bg-white p-6 md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{price}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
              <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹20</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-3">
              <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
              <div className>
                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{(parseFloat(price) + 20).toFixed(3)}</p>
              </div>
            </div>
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={BuyNow}
            />

            {/* <button
              type="button"
              className="w-full  bg-violet-600 py-2 text-center rounded-lg text-white font-bold "
            >
              Buy Now
            </button> */}
          </div>
        </div>
      ) : <div className="container-fluid  mt-100">
        <div className="row">

          <div className="col-md-12">

            <div className="card">
              <div className="card-header">
                <h5>Cart</h5>
              </div>
              <div className="card-body cart">
                <div className="col-sm-12 empty-cart-cls text-center">
                  <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                  <h3><strong>Your Cart is Empty</strong></h3>
                  <h4>Add something to make me happy :)</h4>
                  <a href="#" className="btn btn-primary cart-btn-transform m-3" data-abc="true">continue shopping</a>


                </div>
              </div>
            </div>


          </div>

        </div>

      </div>
      }
    </div>

  )
}

export default Cart