'use client'

import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/page'
import Footer from '../footer/page'
import { Router } from 'next/router';
import LoadingBar from "react-top-loading-bar";


function Layout({children}) {
  const [progress, setProgress] = useState(0);
  // const router = useRouter();

  useEffect(() => {

    // START VALUE - WHEN LOADING WILL START
     Router.events.on("routeChangeStart", () => {
            setProgress(40);
      });

    // COMPLETE VALUE - WHEN LOADING IS FINISHED
     Router.events.on("routeChangeComplete", () => {
            setProgress(100);
       });

}, []);
  return (
    <div>
 <LoadingBar
        color="rgb(180, 130, 251)"
        progress={progress}
        waitingTime={400}
        onLoaderFinished={() => {
          setProgress(0);
        }}
      />
      <Navbar/>
      <div className="content">
        {children}
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
