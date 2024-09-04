import React, { useEffect, useState } from 'react'
// import Pagination from '../Pagination/Pagination'
import styles from './AppTable.module.css'
import Image from 'next/image'

const AppTable = (props) => {

  const {hasImage, imageHeader, imageColumn, headings, data, columns, isShowDelete, isShowEdit, isShowBuyNow, handleBuyNow, handleDelete, handleEdit } = props
  const [pageNo, setPageNo] = useState(1)
  const [currentData, setCurrentData] = useState([])
  const perPage = 5

  useEffect( () => {
    // console.log(11, data); // my data not going to the server
    // console.log(11, data?.getVendors); // my data not going to the server
    const end = pageNo * perPage
    const start = end - perPage;
    setCurrentData(data?.slice(start, end) || [] )
  }, [pageNo, data] )

  return (
    <div className={`table-responsive ${styles.appRootDiv}`}>

      <table className={styles.appTable}>
        <thead>
          <tr>
            {/* {
              hasImage && imageHeader.map( (image, index) =>{
                return <th key={`th_${index}`}>{image}</th>
              })
            } */}
            {
              headings.map((value, index) => {
                return <th key={`th_${index}`}>{value}</th>
              })
            }
            {isShowEdit && <th>Edit</th>}
            {isShowDelete && <th>Delete</th>}
            {isShowBuyNow && <th>Buy Now</th>}
          </tr>
        </thead>
        <tbody>
          { 
          currentData.length > 0 
            ?
            currentData?.map((obj,   index) => {
              return <tr key={`tr_${index}`}>
                {/* {
                  hasImage && imageColumn.map( (key,   ind ) =>{
                    return <td key={`td_${ind}`}>
                    <Image alt='image' width={100} height={100} src={`http://localhost:5000${obj[key]}?${new Date().getTime()}`}/></td>
                  })
                } */}
                {
                  columns.map((key, ind) => {
                    return <td key={`td_${ind}`}> {obj[key]} </td>
                  })
                }
                {isShowEdit && <td><i onClick={() => handleEdit(obj)} className='bi bi-pencil-fill'></i></td>}
                {isShowDelete && <td><i onClick={() => handleDelete(obj)} className='bi bi-trash-fill'></i></td>}
                {isShowBuyNow && <td><button  onClick={() => handleBuyNow(obj)} >Buy Now</button></td>}
              </tr>
            })
            :
            <tr><td colSpan={columns.length+2} className='text-center'> No Record Found </td></tr>
          }
        </tbody>
      </table>
      {/* if data{}  [{}, {}, {}, {}, {}] is more than perpage then only pagination show if you have 14 data and perpage is 10 then u need pagination 1-10 and 11-14  */}
      {/* { data?.length > perPage && <Pagination pageNo={pageNo} setPageNo={setPageNo} totalPages={Math.ceil(data.length / perPage)} />} */}

    </div>
  )
}

export default AppTable
