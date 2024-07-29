"use client"
import React, { useEffect, useState } from 'react'
import {Ajax, VENDER_URL } from '@/services/ajax'
import Search from '../Search/Search'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Products = () => {

    const [productList, setProductList] = useState([])
    const fnGetProducts = async () =>{
        try{
            const res =  await Ajax.sendGetReq("cust/getProducts")
            setProductList(res.data)
            // console.log(res)                       
        }catch(ex){
            console.error(ex.message)
        }finally{

        }
    }

    useEffect(()=>{
        fnGetProducts()
    },[])

  return (
    <div>
      Products
      <Search />
      <div>
      {
        productList?.map(({name, cost, path}, index)=>{
            return <div key={`product_${index}`}>
                {name}
                <Card sx={{ maxWidth: 345 }}>
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
    </Card>

            </div>    
        })
      }
      </div>
      <div>
      
      </div>
     
    </div>
  )
}

export default Products
