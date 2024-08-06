import {useToast}  from "native-base";
import React, { useEffect } from 'react';


const CustomToast = ( {title, description, duration, variant} : ToastContent) => {
    const toast = useToast();

    toast.show({
      title: title,
      description: description,
      duration: duration,
      variant: variant,
    });
    
  };
  export default CustomToast;