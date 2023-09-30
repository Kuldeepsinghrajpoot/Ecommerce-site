// components/LoadingBarWithNext.js
'use client'

import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

const Loading = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(50);
    setTimeout(() => {
      setProgress(100)
    }, 2000);
  }, [setProgress]);
  return (
    <div>
      <LoadingBar
        color='#f11946'
        waitingTime={2000}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
     
    </div>
  )
}

export default Loading
