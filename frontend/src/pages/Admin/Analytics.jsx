import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderAnalytics, topSellingProducts, totalRevenueAnalytics } from '../../store/reducers/analyticSlice';
import PageLoader from '../../components/PageLoader';

const Analytics = () => {

    const {totalRevenue, loading, topSales, statusOfOrders} = useSelector(state => state.analytics)

    console.log(topSales);
    console.log(statusOfOrders);
    

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(totalRevenueAnalytics()) 
        dispatch(orderAnalytics()) 
        dispatch(topSellingProducts()) 
    }, [])

    if (loading) return <PageLoader/>

    console.log();
    
    
  return (
    <>
      <h1>{totalRevenue}</h1>

      <div>
        <ul>
            {
                topSales.map((t) => {
                    return(
                        <li key={t._id}>
                            {t.name}
                            {t.totalSold}
                        </li>
                    )
                })
            }
        </ul>
      </div>


      <div>
        <ul>
            {
                statusOfOrders.map((s) => {
                    return (
                        <li key={s._id}>
                            <p>Processing: {s.processingOrders}</p>
                            <p>Shipped: {s.shippedOrders}</p>
                            <p>Delivered: {s.deliveredOrders}</p>
                            <p>Cancelled: {s.cancelledOrders}</p>
                        </li>
                    )
                })
            }
        </ul>
      </div>
    </>
  )
}

export default Analytics
