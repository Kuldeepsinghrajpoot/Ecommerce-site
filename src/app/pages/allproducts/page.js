'use client'

import React, { useContext } from 'react'
// import mycontext from '@/context/myContext'
import Layout from '../../components/layout/layout'
import HeroSection from '@/app/components/herosection/page'
import Filter from '@/app/pages/Filter/page'

function AllProducts() {
  // const a = useContext(mycontext);
  // console.log(a);

  return (
    // <Layout>
   <>
     <HeroSection/>
     <Filter/>
   </>
   
  )
}
export default AllProducts
