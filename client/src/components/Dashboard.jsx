import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, ShoppingCart, Star, Eye, Smartphone, Monitor, Tablet, LogOut } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  // Sample data
  const salesData = [
    { month: 'Jan', sales: 65, profit: 45, expenses: 30 },
    { month: 'Feb', sales: 72, profit: 52, expenses: 35 },
    { month: 'Mar', sales: 58, profit: 38, expenses: 28 },
    { month: 'Apr', sales: 85, profit: 65, expenses: 40 },
    { month: 'May', sales: 91, profit: 72, expenses: 45 },
    { month: 'Jun', sales: 78, profit: 58, expenses: 38 },
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Alexandra Chen', amount: 2450, status: 'Delivered', product: 'MacBook Pro 14"', avatar: 'AC' },
    { id: '#ORD-002', customer: 'Marcus Johnson', amount: 856, status: 'Processing', product: 'AirPods Pro', avatar: 'MJ' },
    { id: '#ORD-003', customer: 'Sofia Rodriguez', amount: 3200, status: 'Shipped', product: 'iPad Air', avatar: 'SR' },
    { id: '#ORD-004', customer: 'David Kim', amount: 445, status: 'Cancelled', product: 'Apple Watch', avatar: 'DK' },
    { id: '#ORD-005', customer: 'Emma Thompson', amount: 1678, status: 'Delivered', product: 'iPhone 15', avatar: 'ET' },
  ];

  const topProducts = [
    { name: 'Premium Wireless Headphones', sales: 3247, change: 24.5, revenue: 324700 },
    { name: 'Smart Fitness Watch', sales: 2156, change: -8.2, revenue: 431200 },
    { name: 'Ergonomic Laptop Stand', sales: 1893, change: 15.7, revenue: 189300 },
    { name: 'Wireless Charging Station', sales: 1645, change: 31.8, revenue: 164500 },
    { name: 'Premium Phone Case', sales: 1234, change: -2.1, revenue: 61700 },
  ];

  const deviceData = [
    { name: 'Desktop', value: 45, users: 15420, color: '#6366f1' },
    { name: 'Mobile', value: 35, users: 12350, color: '#ec4899' },
    { name: 'Tablet', value: 20, users: 6890, color: '#10b981' },
  ];

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const hoverCardStyle = {
    ...cardStyle,
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
  };

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        style={isHovered ? hoverCardStyle : cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
          borderRadius: '20px 20px 0 0'
        }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#6b7280',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {title}
          </div>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.3s ease'
          }}>
            <Icon style={{ width: '24px', height: '24px', color: color }} />
          </div>
        </div>

        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '4px',
            lineHeight: '1.2'
          }}>
            {value}
          </div>
          {subtitle && (
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              {subtitle}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '700',
            backgroundColor: change > 0 ? '#dcfce7' : '#fee2e2',
            color: change > 0 ? '#16a34a' : '#dc2626'
          }}>
            {change > 0 ? '+' : ''}{change}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {[15, 25, 20, 30, 35, 28].map((height, i) => (
              <div
                key={i}
                style={{
                  width: '3px',
                  height: `${height * 0.6}px`,
                  backgroundColor: change > 0 ? '#10b981' : '#ef4444',
                  borderRadius: '2px',
                  opacity: '0.7'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ChartCard = ({ title, children, actions, height = 'auto' }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        style={{
          ...cardStyle,
          ...(isHovered ? { boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)' } : {}),
          height: height
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: 0 }}>
            {title}
          </h3>
          {actions}
        </div>
        {children}
      </div>
    );
  };

  const BarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.profit)));

    return (
      <div>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#6366f1' }} />
            <span style={{ color: '#6b7280' }}>Sales</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />
            <span style={{ color: '#6b7280' }}>Profit</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'end',
          justifyContent: 'space-between',
          height: '200px',
          gap: '8px'
        }}>
          {data.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              flex: 1
            }}>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'end', height: '160px' }}>
                <div
                  style={{
                    backgroundColor: '#6366f1',
                    borderRadius: '4px 4px 0 0',
                    width: '24px',
                    height: `${(item.sales / maxValue) * 150}px`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#4f46e5'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#6366f1'}
                  title={`Sales: ${item.sales}`}
                />
                <div
                  style={{
                    backgroundColor: '#10b981',
                    borderRadius: '4px 4px 0 0',
                    width: '24px',
                    height: `${(item.profit / maxValue) * 150}px`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                  title={`Profit: ${item.profit}`}
                />
              </div>
              <div style={{ fontSize: '12px', fontWeight: '500', color: '#6b7280' }}>
                {item.month}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const PieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (percentage / 100) * 360;
              const startAngle = currentAngle;
              currentAngle += angle;

              const startAngleRad = (startAngle * Math.PI) / 180;
              const endAngleRad = ((startAngle + angle) * Math.PI) / 180;

              const x1 = centerX + radius * Math.cos(startAngleRad);
              const y1 = centerY + radius * Math.sin(startAngleRad);
              const x2 = centerX + radius * Math.cos(endAngleRad);
              const y2 = centerY + radius * Math.sin(endAngleRad);

              const largeArcFlag = angle > 180 ? 1 : 0;

              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');

              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  style={{ cursor: 'pointer', transition: 'opacity 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                />
              );
            })}
          </svg>

          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
              {total}%
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Total
            </div>
          </div>
        </div>

        <div style={{ width: '100%' }}>
          {data.map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: item.color
                }} />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  {item.name}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>
                  {item.value}%
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {item.users.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getStatusColor = (status) => {
    const colors = {
      'Delivered': { bg: '#dcfce7', text: '#16a34a' },
      'Processing': { bg: '#dbeafe', text: '#2563eb' },
      'Shipped': { bg: '#fef3c7', text: '#d97706' },
      'Cancelled': { bg: '#fee2e2', text: '#dc2626' },
    };
    return colors[status] || colors['Processing'];
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '20px',
      position: 'relative'
    }}>
      {/* Background Effects */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)'
      }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '24px' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h1 style={{
                fontSize: '48px',
                fontWeight: '900',
                color: 'white',
                margin: '0 0 8px 0',
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                letterSpacing: '-0.02em'
              }}>
                Dashboard
              </h1>
              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '18px',
                fontWeight: '400',
                margin: 0
              }}>
                Welcome back, {user?.name || 'User'}! Here's what's happening with your business today.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {['Today', 'This Week', 'This Month', 'This Quarter'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    border: selectedPeriod === period ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                    backgroundColor: selectedPeriod === period ? 'white' : 'transparent',
                    color: selectedPeriod === period ? '#667eea' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: selectedPeriod === period ? '0 8px 32px rgba(0, 0, 0, 0.2)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedPeriod !== period) {
                      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedPeriod !== period) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    }
                  }}
                >
                  {period}
                </button>
              ))}

              <button
                onClick={onLogout}
                style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  marginLeft: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }}
              >
                <LogOut style={{ width: '16px', height: '16px' }} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Metric Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px'
        }}>
          <MetricCard
            title="Total Revenue"
            value="$847,562"
            change={24.8}
            icon={DollarSign}
            color="#6366f1"
            subtitle="vs last month"
          />
          <MetricCard
            title="Active Orders"
            value="3,247"
            change={12.5}
            icon={ShoppingCart}
            color="#10b981"
            subtitle="orders pending"
          />
          <MetricCard
            title="New Customers"
            value="1,896"
            change={-8.2}
            icon={Users}
            color="#f59e0b"
            subtitle="this period"
          />
          <MetricCard
            title="Satisfaction"
            value="98.5%"
            change={3.1}
            icon={Star}
            color="#ec4899"
            subtitle="customer rating"
          />
        </div>

        {/* Charts Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Revenue Performance */}
          <ChartCard
            title="Revenue Performance"
            actions={
              <div style={{ display: 'flex', gap: '8px' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: '#e0e7ff',
                  color: '#6366f1'
                }}>
                  Revenue
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  backgroundColor: '#fce7f3',
                  color: '#ec4899'
                }}>
                  Target
                </span>
              </div>
            }
            height="400px"
          >
            {/* Revenue Area Chart */}
            <div style={{ height: '250px', display: 'flex', alignItems: 'end', gap: '8px' }}>
              {[165, 159, 180, 195, 176, 205, 225].map((height, index) => (
                <div key={index} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  flex: 1
                }}>
                  <div style={{ display: 'flex', alignItems: 'end', height: '200px' }}>
                    <div
                      style={{
                        background: 'linear-gradient(to top, #6366f1, #a5b4fc)',
                        borderRadius: '8px 8px 0 0',
                        width: '100%',
                        height: `${(height / 225) * 180}px`,
                        opacity: '0.8',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => e.target.style.opacity = '1'}
                      onMouseLeave={(e) => e.target.style.opacity = '0.8'}
                    />
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontWeight: '500' }}>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'][index]}
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Performance Overview */}
          <ChartCard title="Performance Overview" height="400px">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Performance', value: 85, color: '#6366f1' },
                { name: 'Quality', value: 92, color: '#10b981' },
                { name: 'Efficiency', value: 78, color: '#f59e0b' },
                { name: 'Satisfaction', value: 96, color: '#ec4899' },
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                    <span style={{ fontWeight: '500', color: '#374151' }}>{item.name}</span>
                    <span style={{ fontWeight: '700', color: '#111827' }}>{item.value}%</span>
                  </div>
                  <div style={{
                    width: '100%',
                    height: '8px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${item.value}%`,
                        backgroundColor: item.color,
                        borderRadius: '4px',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>

        {/* Second Row Charts */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          {/* Sales Analytics */}
          <ChartCard title="Sales Analytics">
            <BarChart data={salesData} />
          </ChartCard>

          {/* Traffic Sources */}
          <ChartCard title="Traffic Sources">
            <PieChart data={deviceData} />
          </ChartCard>
        </div>

        {/* Bottom Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px'
        }}>
          {/* Recent Orders */}
          <ChartCard
            title="Recent Orders"
            actions={
              <button style={{
                padding: '8px 16px',
                fontSize: '14px',
                fontWeight: '500',
                color: '#6366f1',
                border: '1px solid #6366f1',
                borderRadius: '8px',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#f0f9ff';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'transparent';
                }}
              >
                View All Orders
              </button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {recentOrders.map((order) => {
                const statusColor = getStatusColor(order.status);
                return (
                  <div key={order.id} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '16px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#f9fafb';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '14px'
                      }}>
                        {order.avatar}
                      </div>
                      <div>
                        <div style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}>
                          {order.customer}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {order.product}
                        </div>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', color: '#111827', fontSize: '16px' }}>
                        ${order.amount.toLocaleString()}
                      </div>
                      <div style={{
                        display: 'inline-flex',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '500',
                        backgroundColor: statusColor.bg,
                        color: statusColor.text,
                        textTransform: 'capitalize'
                      }}>
                        {order.status}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ChartCard>

          {/* Top Products */}
          <ChartCard title="Top Products">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {topProducts.map((product, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1, paddingRight: '8px' }}>
                      <div style={{
                        fontWeight: '600',
                        fontSize: '14px',
                        color: '#111827',
                        lineHeight: '1.4',
                        marginBottom: '4px'
                      }}>
                        {product.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b7280' }}>
                        {product.sales.toLocaleString()} sales
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600',
                      backgroundColor: product.change > 0 ? '#dcfce7' : '#fee2e2',
                      color: product.change > 0 ? '#16a34a' : '#dc2626'
                    }}>
                      {product.change > 0 ? '+' : ''}{product.change}%
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {[12, 18, 15, 22, 25, 20, 28, 24].map((height, i) => (
                      <div
                        key={i}
                        style={{
                          width: '3px',
                          height: `${height}px`,
                          backgroundColor: product.change > 0 ? '#10b981' : '#ef4444',
                          borderRadius: '1px',
                          opacity: '0.7'
                        }}
                      />
                    ))}
                  </div>

                  {index < topProducts.length - 1 && (
                    <hr style={{
                      border: 'none',
                      borderTop: '1px solid #e5e7eb',
                      margin: '8px 0'
                    }} />
                  )}
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;