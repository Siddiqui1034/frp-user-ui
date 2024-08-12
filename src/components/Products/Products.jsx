"use client"
import React, { useEffect, useState } from 'react'
import styles from './Products.module.css'
import { Ajax, VENDER_URL } from '@/services/ajax'
import Search from '../Search/Search'
import { useDispatch } from 'react-redux'
import Link from 'next/link'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea} from '@mui/material';
const Products = () => {

  const dispatch = useDispatch()
  const [productList, setProductList] = useState([])
  const [searchProduct, setSearchProducts] = useState([])

  const fnGetProducts = async () => {
    try {
      dispatch({
        type: "LOADER",
        payload: true
      })
      const res = await Ajax.sendGetReq("cust/getProducts")
      setProductList(res.data)
      setSearchProducts(res.data)
      // console.log(res)                       
    } catch (ex) {
      console.error(ex.message)
    } finally {
      dispatch({
        type: "LOADER",
        payload: false
      })
    }
  }

  useEffect(() => {
    fnGetProducts()
  }, [])

  const handleSearch = (eve) => {
    const filteredItems = productList?.filter((obj) => {
      let searchItem = eve.target.value
      console.log(eve.target.value)
      // return obj?.name?.includes(searchItem.toLowerCase());
    })
    setSearchProducts(filteredItems)
  }

  return (
    <div>
      <Search handleSearch={handleSearch} />

      <div className={`${styles.productList}`}>
        {
          searchProduct?.length > 0 ? searchProduct?.map(({ name, cost, path, _id }, index) => {
            return <div key={`product_${index}`}>
              {/* {name} */}
              {/* <Card sx={{ maxWidth: 345 }}> */}
              <Card sx={{ width: 200 }}>
              <Link href={`/product-view/${_id}`}>
                <CardActionArea>
                  <CardMedia
                    sx={{ height: 140 }}
                    // image={"/static/images/cards/contemplative-reptile.jpg"}
                    image={`${VENDER_URL}${path}`}
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
                </Link>
              </Card>                            
            </div>
          })
            :
            <h1>No Product Found</h1>
        }
      </div>
    </div>
  )
}

export default Products
