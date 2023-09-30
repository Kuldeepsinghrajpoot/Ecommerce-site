'use client'
import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { fireDB } from '@/app/firebase/page';

function MyState(props) {
  const [mode, setMode] = useState('light');
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )

  })

  // ********************** Add Product Section  **********************
  // const addProduct = async () => {
  //   if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
  //     return toast.error('Please fill all fields')
  //   }
  //   const productRef = collection(fireDb, "products")
  //   setLoading(true)
  //   try {
  //     await addDoc(productRef, products)
  //     toast.success("Product Add successfully")
  //     getProductData()
  //     closeModal()
  //     setLoading(false)
  //   } catch (error) {
  //     console.log(error)
  //     setLoading(false)
  //   }
  //   setProducts("")
  // }

  // const [product, setProduct] = useState([]);

  // ****** get product
  const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  // const edithandle = (item) => {
  //   setProducts(item)
  // }
  // // update product
  // const updateProduct = async (item) => {
  //   setLoading(true)
  //   try {
  //     await setDoc(doc(fireDb, "products", products.id), products);
  //     toast.success("Product Updated successfully")
  //     getProductData();
  //     setLoading(false)
  //     window.location.href = '/dashboard'
  //   } catch (error) {
  //     setLoading(false)
  //     console.log(error)
  //   }
  //   setProducts("")
  // }

  // const deleteProduct = async (item) => {

  //   try {
  //     setLoading(true)
  //     await deleteDoc(doc(fireDb, "products", item.id));
  //     toast.success('Product Deleted successfully')
  //     setLoading(false)
  //     getProductData()
  //   } catch (error) {
  //     // toast.success('Product Deleted Falied')
  //     setLoading(false)
  //   }
  // }


  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true)
    try {
      const result = await getDocs(collection(fireDB, "order"))
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false)
      });
      setOrder(ordersArray);
      console.log("order aray",ordersArray)

      setLoading(false);

    } catch (error) {
      console.log("error",error)
      setLoading(false)
    }
  }

console.log("order details",order);
  useEffect(() => {
    // getProductData();
    getOrderData();

  }, []);


  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading,
    
     order
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState