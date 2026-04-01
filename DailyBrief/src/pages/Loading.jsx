import React from 'react'

import { ShimmerPostItem } from "react-shimmer-effects";
   
   const Loading = () => {
      return (
    <div className="w-75 mt-20 mr-6">
      <ShimmerPostItem
        card
        title
        text
        cta
        imageType="thumbnail"
        imageWidth={250}
        imageHeight={180}
      />
    </div>
    );
   }
   
   export default Loading
  