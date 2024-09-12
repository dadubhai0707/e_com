import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';

const Graph = () => {
  const orders = useSelector((state) => state.order.order);
  const products = useSelector((state) => state.product.product);

  const data = [
    { name: 'January', TotalSale: 0, totalProducts: 0 },
    { name: 'February', TotalSale: 0, totalProducts: 0 },
    { name: 'March', TotalSale: 0, totalProducts: 0 },
    { name: 'April', TotalSale: 0, totalProducts: 0 },
    { name: 'May', TotalSale: 0, totalProducts: 0 },
    { name: 'June', TotalSale: 0, totalProducts: 0 },
    { name: 'July', TotalSale: 0, totalProducts: 0 },
    { name: 'August', TotalSale: 0, totalProducts: 0 },
    { name: 'September', TotalSale: 0, totalProducts: 0 },
    { name: 'October', TotalSale: 0, totalProducts: 0 },
    { name: 'November', TotalSale: 0, totalProducts: 0 },
    { name: 'December', TotalSale: 0, totalProducts: 0 },
  ];

  // Iterate over each user's orders
  orders.forEach(userOrder => {
    userOrder.orders.forEach(order => {
      // Find the order's date and extract the month
      const orderDate = userOrder.time.find(t => t.date)?.date;
      if (orderDate) {
        const orderMonth = new Date(orderDate).toLocaleString('default', { month: 'long' });
        const monthIndex = data.findIndex(month => month.name === orderMonth);
        if (monthIndex >= 0) {
          data[monthIndex].TotalSale += order.quntity;
        }
      }
    });
  });

  // Iterate over each product and categorize by month added
  products.forEach(product => {
    const productMonth = new Date(product.dateAdded).toLocaleString('default', { month: 'long' });
    const monthIndex = data.findIndex(month => month.name === productMonth);
    if (monthIndex >= 0) {
      data[monthIndex].totalProducts += 1;
    }
  });

  return (
    <Card sx={{ margin: '40px 20px', padding: 2 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Monthly Sales
        </Typography>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalSale" fill="#8884d8" name="Total Sold Products" />
            <Bar dataKey="totalProducts" fill="#82ca9d" name="Total Added Products" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Graph;
