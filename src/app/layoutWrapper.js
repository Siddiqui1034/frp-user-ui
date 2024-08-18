import React from 'react'
import Header from '@/components/Header';
// import Loader from "@/reusableComponents/Loader";
import Loader from '@/components/reusableComponents/Loader';

import Footer from '@/components/Footer';


// import Footer from "@/components/Footer/Footer";
import { useSelector } from 'react-redux';

export const LayoutWrapper = ({ children }) => {
  const store = useSelector((state) => state);
  const isShowLoader = useSelector(state => state?.appReducer?.isShowLoader);
  return (
    <div>
      <Header />
      {children}
      {/* {store?.appReducer?.isShowLoader && <Loader />} */}
      <Footer />
      {isShowLoader && <Loader />}
      
    </div>
  )
}

 
