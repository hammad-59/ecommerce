import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { orderAnalytics, topSellingProducts, totalRevenueAnalytics } from '../../store/reducers/analyticSlice';
import PageLoader from '../../components/PageLoader';
import {
    PieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    Legend, 
    ResponsiveContainer
} from "recharts";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

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

    const chartData = [
  {
    name: "Processing",
    value: statusOfOrders[0]?.processingOrders || 0,
  },
  {
    name: "Shipped",
    value: statusOfOrders[0]?.shippedOrders || 0,
  },
  {
    name: "Delivered",
    value: statusOfOrders[0]?.deliveredOrders || 0,
  },
  {
    name: "Cancelled",
    value: statusOfOrders[0]?.cancelledOrders || 0,
  },
];


const COLORS = [
  "#3b82f6", // Processing
  "#f59e0b", // Shipped
  "#10b981", // Delivered
  "#ef4444", // Cancelled
];
    
return (
  <div className="p-6 space-y-8">

    {/* Revenue Card */}
    <div className="bg-white shadow-lg rounded-2xl p-6 border">
      <h2 className="text-gray-500 text-sm font-medium">
        Total Revenue
      </h2>

      <p className="text-4xl font-bold mt-2">
        Rs.{totalRevenue}
      </p>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Order Status */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">
          Order Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products */}
      <div className="bg-white shadow-lg rounded-2xl p-6 border">
        <h2 className="text-xl font-semibold mb-4">
          Top Selling Products
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            layout="vertical"
            data={topSales}
            margin={{ left: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis type="name" />

            <YAxis
              type="category"
              dataKey="name"
              width={120}
            />

            <Tooltip />

            <Bar
              dataKey="totalSold"
              fill="#16a34a"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>

  </div>
);
}

export default Analytics
