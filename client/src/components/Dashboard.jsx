import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Avatar,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Badge,
  Divider,
  Stack,
  useTheme,
  alpha
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar
} from 'recharts';

const Dashboard = () => {
  const theme = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Enhanced data with more realistic values
  const salesData = [
    { month: 'Jan', sales: 65000, profit: 24000, expenses: 16000, growth: 12 },
    { month: 'Feb', sales: 72000, profit: 28000, expenses: 18000, growth: 15 },
    { month: 'Mar', sales: 58000, profit: 22000, expenses: 15000, growth: -8 },
    { month: 'Apr', sales: 85000, profit: 35000, expenses: 20000, growth: 25 },
    { month: 'May', sales: 91000, profit: 38000, expenses: 22000, growth: 18 },
    { month: 'Jun', sales: 78000, profit: 32000, expenses: 19000, growth: 10 },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 165000, target: 150000 },
    { month: 'Feb', revenue: 159000, target: 155000 },
    { month: 'Mar', revenue: 180000, target: 160000 },
    { month: 'Apr', revenue: 195000, target: 170000 },
    { month: 'May', revenue: 176000, target: 175000 },
    { month: 'Jun', revenue: 205000, target: 180000 },
    { month: 'Jul', revenue: 225000, target: 190000 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, color: '#6366f1', users: 15420 },
    { name: 'Mobile', value: 35, color: '#ec4899', users: 12350 },
    { name: 'Tablet', value: 20, color: '#10b981', users: 6890 },
  ];

  const performanceData = [
    { name: 'Performance', value: 85, fill: '#6366f1' },
    { name: 'Quality', value: 92, fill: '#10b981' },
    { name: 'Efficiency', value: 78, fill: '#f59e0b' },
    { name: 'Customer Satisfaction', value: 96, fill: '#ec4899' },
  ];

  const recentOrders = [
    { 
      id: '#ORD-2024-001', 
      customer: 'Alexandra Chen', 
      amount: 2450, 
      status: 'Delivered', 
      date: '2024-01-15',
      avatar: 'AC',
      product: 'MacBook Pro 14"',
      priority: 'high'
    },
    { 
      id: '#ORD-2024-002', 
      customer: 'Marcus Johnson', 
      amount: 856, 
      status: 'Processing', 
      date: '2024-01-14',
      avatar: 'MJ',
      product: 'AirPods Pro',
      priority: 'medium'
    },
    { 
      id: '#ORD-2024-003', 
      customer: 'Sofia Rodriguez', 
      amount: 3200, 
      status: 'Shipped', 
      date: '2024-01-13',
      avatar: 'SR',
      product: 'iPad Air + Accessories',
      priority: 'high'
    },
    { 
      id: '#ORD-2024-004', 
      customer: 'David Kim', 
      amount: 445, 
      status: 'Cancelled', 
      date: '2024-01-12',
      avatar: 'DK',
      product: 'Apple Watch Band',
      priority: 'low'
    },
    { 
      id: '#ORD-2024-005', 
      customer: 'Emma Thompson', 
      amount: 1678, 
      status: 'Delivered', 
      date: '2024-01-11',
      avatar: 'ET',
      product: 'iPhone 15 Case Set',
      priority: 'medium'
    },
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 3247, change: 24.5, revenue: 324700, trend: [20, 35, 28, 42, 38, 45] },
    { name: 'Smart Fitness Watch', sales: 2156, change: -8.2, revenue: 431200, trend: [45, 38, 35, 28, 32, 30] },
    { name: 'Ergonomic Laptop Stand', sales: 1893, change: 15.7, revenue: 189300, trend: [15, 22, 28, 35, 42, 48] },
    { name: 'Wireless Charging Station', sales: 1645, change: 31.8, revenue: 164500, trend: [10, 15, 25, 35, 38, 42] },
    { name: 'Premium Phone Case', sales: 1234, change: -2.1, revenue: 61700, trend: [25, 22, 20, 18, 19, 18] },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      'Delivered': { color: 'success', bg: alpha('#10b981', 0.1), text: '#059669' },
      'Processing': { color: 'info', bg: alpha('#3b82f6', 0.1), text: '#2563eb' },
      'Shipped': { color: 'warning', bg: alpha('#f59e0b', 0.1), text: '#d97706' },
      'Cancelled': { color: 'error', bg: alpha('#ef4444', 0.1), text: '#dc2626' },
    };
    return configs[status] || configs['Processing'];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': '#ef4444',
      'medium': '#f59e0b',
      'low': '#6b7280'
    };
    return colors[priority] || colors['low'];
  };

  const MetricCard = ({ title, value, change, icon, color, trend, subtitle }) => (
    <Card sx={{ 
      borderRadius: 4,
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      border: `1px solid ${alpha(color, 0.1)}`,
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 20px 40px ${alpha(color, 0.15)}`,
        border: `1px solid ${alpha(color, 0.2)}`,
      },
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.5)} 100%)`,
      }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body2" sx={{ 
            color: 'text.secondary', 
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.75rem'
          }}>
            {title}
          </Typography>
          <Box sx={{ 
            width: 48, 
            height: 48, 
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            {icon}
          </Box>
        </Box>
        
        <Typography variant="h3" sx={{ 
          fontWeight: 800, 
          mb: 1,
          background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}>
          {value}
        </Typography>
        
        {subtitle && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            {subtitle}
          </Typography>
        )}
        
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Chip 
            label={`${change > 0 ? '+' : ''}${change}%`}
            size="small"
            sx={{
              backgroundColor: change > 0 ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
              color: change > 0 ? '#059669' : '#dc2626',
              fontWeight: 700,
              fontSize: '0.75rem',
              borderRadius: 2,
              height: 24
            }}
          />
          {trend && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {trend.map((point, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 3,
                    height: point * 0.8,
                    backgroundColor: alpha(color, 0.6),
                    borderRadius: 1,
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );

  const ChartCard = ({ title, children, actions }) => (
    <Card sx={{ 
      borderRadius: 4,
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      '&:hover': {
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
      }
    }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
            {title}
          </Typography>
          {actions}
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }
    }}>
      <Box sx={{ position: 'relative', zIndex: 1, p: 4 }}>
        {/* Enhanced Header */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box>
              <Typography variant="h2" sx={{ 
                fontWeight: 900,
                color: 'white',
                mb: 1,
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.02em'
              }}>
                Dashboard
              </Typography>
              <Typography variant="h6" sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 400
              }}>
                Welcome back, here's what's happening with your business today.
              </Typography>
            </Box>
            
            <Stack direction="row" spacing={2}>
              {['Today', 'This Week', 'This Month', 'This Quarter'].map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? 'contained' : 'outlined'}
                  onClick={() => setSelectedPeriod(period)}
                  sx={{
                    borderRadius: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    color: selectedPeriod === period ? '#667eea' : 'white',
                    backgroundColor: selectedPeriod === period ? 'white' : 'transparent',
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    boxShadow: selectedPeriod === period ? '0 8px 32px rgba(0, 0, 0, 0.2)' : 'none',
                    '&:hover': {
                      backgroundColor: selectedPeriod === period ? 'white' : 'rgba(255, 255, 255, 0.1)',
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                    }
                  }}
                >
                  {period}
                </Button>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Enhanced Metrics Cards */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Total Revenue"
              value="$847,562"
              change={24.8}
              icon="💰"
              color="#6366f1"
              trend={[15, 25, 35, 28, 42, 38, 45]}
              subtitle="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Active Orders"
              value="3,247"
              change={12.5}
              icon="📦"
              color="#10b981"
              trend={[20, 18, 25, 30, 35, 40, 38]}
              subtitle="orders pending"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="New Customers"
              value="1,896"
              change={-8.2}
              icon="👥"
              color="#f59e0b"
              trend={[40, 35, 30, 25, 28, 22, 20]}
              subtitle="this period"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MetricCard
              title="Satisfaction"
              value="98.5%"
              change={3.1}
              icon="⭐"
              color="#ec4899"
              trend={[25, 28, 32, 35, 38, 42, 45]}
              subtitle="customer rating"
            />
          </Grid>
        </Grid>

        {/* Enhanced Charts Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Revenue vs Target */}
          <Grid item xs={12} lg={8}>
            <ChartCard title="Revenue Performance" actions={
              <Stack direction="row" spacing={1}>
                <Chip label="Revenue" size="small" sx={{ backgroundColor: alpha('#6366f1', 0.1), color: '#6366f1' }} />
                <Chip label="Target" size="small" sx={{ backgroundColor: alpha('#ec4899', 0.1), color: '#ec4899' }} />
              </Stack>
            }>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05}/>
                    </linearGradient>
                    <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="target" stroke="#ec4899" strokeWidth={2} strokeDasharray="5 5" fill="url(#colorTarget)" />
                </AreaChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>

          {/* Performance Metrics */}
          <Grid item xs={12} lg={4}>
            <ChartCard title="Performance Overview">
              <ResponsiveContainer width="100%" height={350}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={performanceData}>
                  <RadialBar dataKey="value" cornerRadius={10} />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* Sales Analytics */}
          <Grid item xs={12} lg={8}>
            <ChartCard title="Sales Analytics">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData} barGap={10}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="sales" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </Grid>

          {/* Device Usage */}
          <Grid item xs={12} lg={4}>
            <ChartCard title="Traffic Sources">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={deviceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                    >
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                <Box sx={{ width: '100%', mt: 2 }}>
                  {deviceData.map((item, index) => (
                    <Box key={item.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: item.color }} />
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{item.name}</Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.value}%</Typography>
                        <Typography variant="caption" color="text.secondary">{item.users.toLocaleString()}</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </ChartCard>
          </Grid>
        </Grid>

        {/* Enhanced Tables Section */}
        <Grid container spacing={4}>
          {/* Recent Orders */}
          <Grid item xs={12} lg={8}>
            <ChartCard title="Recent Orders" actions={
              <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                View All Orders
              </Button>
            }>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Order</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Priority</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => {
                      const statusConfig = getStatusConfig(order.status);
                      return (
                        <TableRow key={order.id} sx={{ 
                          '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' },
                          transition: 'background-color 0.2s ease'
                        }}>
                          <TableCell>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: '#6366f1' }}>
                                {order.id}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {order.product}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar 
                                sx={{ 
                                  width: 40, 
                                  height: 40, 
                                  fontSize: '0.875rem',
                                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                  fontWeight: 600
                                }}
                              >
                                {order.avatar}
                              </Avatar>
                              <Box>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {order.customer}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                  {order.date}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                              ${order.amount.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={order.status}
                              size="small"
                              sx={{
                                backgroundColor: statusConfig.bg,
                                color: statusConfig.text,
                                fontWeight: 600,
                                borderRadius: 2,
                                textTransform: 'capitalize'
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box 
                              sx={{ 
                                width: 8, 
                                height: 8, 
                                borderRadius: '50%', 
                                backgroundColor: getPriorityColor(order.priority) 
                              }} 
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </ChartCard>
          </Grid>

          {/* Top Products */}
          <Grid item xs={12} lg={4}>
            <ChartCard title="Top Products">
              <Stack spacing={3}>
                {topProducts.map((product, index) => (
                  <Box key={product.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {product.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {product.sales.toLocaleString()} sales • ${product.revenue.toLocaleString()} revenue
                        </Typography>
                      </Box>
                      <Chip 
                        label={`${product.change > 0 ? '+' : ''}${product.change}%`}
                        size="small"
                        sx={{
                          backgroundColor: product.change > 0 ? alpha('#10b981', 0.1) : alpha('#ef4444', 0.1),
                          color: product.change > 0 ? '#059669' : '#dc2626',
                          fontWeight: 700,
                          borderRadius: 2,
                          minWidth: 60
                        }}
                      />
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                      {product.trend.map((point, i) => (
                        <Box
                          key={i}
                          sx={{
                            width: 4,
                            height: point * 0.6,
                            backgroundColor: product.change > 0 ? '#10b981' : '#ef4444',
                            borderRadius: 1,
                            opacity: 0.7,
                          }}
                        />
                      ))}
                    </Box>
                    {index < topProducts.length - 1 && <Divider sx={{ mt: 2 }} />}
                  </Box>
                ))}
              </Stack>
            </ChartCard>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;