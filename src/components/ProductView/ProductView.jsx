"use client"
import React, { useState, useEffect } from 'react'
import styles from './ProductView.module.css'
import { Ajax, VENDER_URL } from '@/services/ajax'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { Grid } from '@mui/material'
import { AppCookie } from '@/services/cookies'
import { usePathname } from 'next/navigation'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation'


const ProductView = (props) => {  

  const pathName = usePathname();
  const router = useRouter();
  const [product, setProduct] = useState({})
  const { id } = props?.params
  const dispatch = useDispatch();

  const getProductDetails = async () => {
    try {
      dispatch({ type: "LOADER", payload: true })
      const res = await Ajax.sendGetReq(`cust/getProductById?id=${id}`)
      setProduct(res?.data)
    } catch (ex) {
      setProduct({})
    } finally {
      dispatch({ type: "LOADER", payload: false })
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [])

  // const fnIsLoggedIn = () =>{
  //   const token = sessionStorage.token
  //   if(!token){
  //     sessionStorage.pathName = pathName;
  //     return false;
  //   }
  //   return true;  
  // }

  const fnIsLoggedIn = () => {
    // const res = await AppCookie.isLoggedIn()
    const token = sessionStorage.token
    // if (!res) {
    if (!token){
      sessionStorage.pathName = pathName
      router.push("/login")
      return false;
      }
      return true;
  }

  const handleBuyNow = async () => {
    try{
      if(!fnIsLoggedIn()){
        router.push('/login')
        return;
      }
      router.push(`/buy-now/${id}`) 
    }
    catch(ex){
      console.error(ex.message,);      
    }
    finally{

    }
    // fnIsLoggedIn();

    // alert("hi")
    // const res = await AppCookie.isLoggedIn()
    // console.log(22, res)
    // if (!res) {
    //   sessionStorage.pathName = pathName
    //   router.push("/login") 
    // }
  }

//   const handleBuyNow = async () => {
//     try {
//         if (!fnIsLoggedIn()) {
//             router.push('/login');
//             alert("not login got to login page")
//             return;
//         }
//         router.push(`/buy-now/${id}`)
//         alert("logged in and go to buy now page")
//     } catch (ex) {
// console.error(ex.message)
// // return ex.message
//     } finally {
//     }
// }

  const handleAddToCart = async () => {
    try{
      if(!fnIsLoggedIn()){
        router.push('/login');
        return;
      }       
      dispatch({type: "LOADER", payload: true })   
      
      const id = await AppCookie.getCookie("id")
      // console.log(product);      
      const dataObj = { productId: product._id, uid: id} //22:53 here uid is uid , uid is user Id or customer Id;
      // console.log(113, dataObj);
      const res = await Ajax.sendPostReq('cust/saveToCart', { data: dataObj})
      // console.log(220, res)
      const { acknowledged, insertedId, message, count } = res.data 
      if(acknowledged && insertedId ){
        // dispatch({ type: "TOASTER", payload: { isShowToaster: true, toasterMessage: 'Added to the cart', toasterBG: 'green' } })
        handleToaster(dispatch, "Added to the Cart", " green " )
        sessionStorage.cartCount = count; 
        dispatch({type: "AUTH", payload: {cartCount: count } })
        router.push('/cart')
      }else{
        handleToaster(dispatch, message, 'red');
      }
    }
   catch(ex){ 
    console.error(ex.message);

   }
   finally{
    dispatch({type: "LOADER", payload: false }) 
   }
    
  //   try {
  //     if (!fnIsLoggedIn()) {
  //         router.push('/login');
  //         return;
  //     }
  //     dispatch({ type: "LOADER", payload: true })
  //     const id = await AppCookie.getCookie("id")
  //     const dataObj = { productId: product._id, uid: id }
  //     const res = await Ajax.sendPostReq('cust/saveToCart', { data: dataObj })
  //     const { acknowledged, insertedId, message } = res.data;
  //     if (acknowledged && insertedId) {
  //         handleToaster(dispatch, 'Added to the cart', 'green')
  //         router.push('/cart')
  //     } else {
  //         handleToaster(dispatch, message, 'red')
  //     }
  // } catch (ex) {
  //     handleToaster(dispatch, ex.message, 'red')
  // } finally {
  //     dispatch({ type: "LOADER", payload: false })
  // }

  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item="true" xs={6}>
          {product?.path && <Image src={`${VENDER_URL}${product?.path}`} alt="product image" width={500} height={400} />}
        </Grid>
        <Grid item="true" xs={6}>
          <h1>Product Name:{product?.name} </h1>
          <h3>Product Cost:{product?.cost} </h3>
          <Button onClick={handleBuyNow} variant="contained" size="large">Buy Now</Button>
          <Button onClick={handleAddToCart} variant="outlined" size="large">Add to Cart</Button>
        </Grid>
      </Grid>
      {/* <Card className="product-card" sx={{ width: 500 }}>
                <CardActionArea>
                  <CardMedia
                    sx={{ height: 140 }}
                    // image={"/static/images/cards/contemplative-reptile.jpg"}
                    image={`${VENDER_URL}${product?.path}`}
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {name}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {cost}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lizards are a widespread group of squamate reptiles, with over 6,000
                      species, ranging across all continents except Antarctica
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </ CardActionArea>
               
              </Card> */}
    </div>
  )
}

export default ProductView
