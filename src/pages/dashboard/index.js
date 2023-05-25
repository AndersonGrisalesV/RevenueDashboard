import { useState, useEffect } from 'react';

// material-ui
import {
  // Avatar,
  // AvatarGroup,
  Box,
  // Button,
  Grid,
  // List,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemSecondaryAction,
  // ListItemText,
  // MenuItem,
  Stack,
  // TextField,
  Typography
  // Chip
} from '@mui/material';

// project import
// import OrdersTable from './OrdersTable';
// import IncomeAreaChart from './IncomeAreaChart';
// import MonthlyBarChart from './MonthlyBarChart';
// import ReportAreaChart from './ReportAreaChart';
// import SalesColumnChart from './SalesColumnChart';
import MainCard from 'components/MainCard';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { green } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import Papa from 'papaparse';
import data from '../../../src/data/data.csv';
//import data from '../../../src/data/dataCopy.csv';

// import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';

// import { RiseOutlined, FallOutlined } from '@ant-design/icons';

// assets
// import { GiftOutlined, MessageOutlined, SettingOutlined } from '@ant-design/icons';
// import avatar1 from 'assets/images/users/avatar-1.png';
// import avatar2 from 'assets/images/users/avatar-2.png';
// import avatar3 from 'assets/images/users/avatar-3.png';
// import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
// const avatarSX = {
//   width: 36,
//   height: 36,
//   fontSize: '1rem'
// };

// action style
// const actionSX = {
//   mt: 0.75,
//   ml: 1,
//   top: 'auto',
//   right: 'auto',
//   alignSelf: 'flex-start',
//   transform: 'none'
// };

// sales report status
// const status = [
//   {
//     value: 'today',
//     label: 'Today'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
// ];

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
  // const [value, setValue] = useState('today');
  // const [slot, setSlot] = useState('week');

  const [categories, setCategories] = useState([]);

  const [newCustomerRevenue, setNewCustomerRevenue] = useState([]);
  const [existingCustomerRevenue, setExistingCustomerRevenue] = useState([]);

  const [newCustomerOrders, setNewCustomerOrders] = useState([]);

  const [sumRevenues, setSumRevenues] = useState([]);

  const [totalRevenue, setTotalRevenue] = useState();
  const [totalOrders, setTotalOrders] = useState();
  const [totalNewCustomers, setTotalNewCustomers] = useState();
  const [percentNewCustomersRevenue, setPercentNewCustomersRevenue] = useState();

  const [percentChangeTotalRevenue, setPercentChangeTotalRevenue] = useState('');
  const [percentChangeTotalOrders, setPercentChangeTotalOrders] = useState('');
  const [percentChangeTotalNewCustomers, setPercentChangeTotalNewCustomers] = useState('');
  const [percentChangeNewCustomersRevenue, setPercentChangeNewCustomersRevenue] = useState('');

  const [averageRevenuePerDay, setAverageRevenuePerDay] = useState('');
  const [averageOrdersPerDay, setAverageOrdersPerDay] = useState('');
  const [averageItemsPerOrder, setAverageItemsPerOrder] = useState('');
  const [averageOrderValue, setAverageOrderValue] = useState('');
  const [averageNewCustomersPerDay, setAverageNewCustomersPerDay] = useState('');

  const [percentChangeAverageRevenuePerDay, setPercentChangeAverageRevenuePerDay] = useState('');
  const [percentChangeAverageOrdersPerDay, setPercentChangeAverageOrdersPerDay] = useState('');
  const [percentChangeAverageItemsPerOrder, setPercentChangeAverageItemsPerOrder] = useState('');
  const [percentChangeAverageOrderValue, setPercentChangeAverageOrderValue] = useState('');
  const [percentChangeAverageNewCustomersPerDay, setPercentChangeAverageNewCustomersPerDay] = useState('');

  const [OnlineStoreRevenue, setOnlineStoreRevenue] = useState('');
  const [AmazonRevenue, setAmazonRevenue] = useState('');
  const [DraftOrdersRevenue, setDraftOrdersRevenue] = useState('');
  const [ZapierRevenue, setZapierRevenue] = useState('');
  const [FaireWholesaleRevenue, setFaireWholesaleRevenue] = useState('');
  const [CodistoRevenue, setCodistoRevenue] = useState('');
  const [MiraklMarketplacesAppRevenue, setMiraklMarketplacesAppRevenue] = useState('');
  const [CarroRevenue, setCarroRevenue] = useState('');

  const [chartData, setChartData] = useState('');
  const [revenueSources, setRevenueSources] = useState('');

  let labelsLeft = ['0', '20K', '40K', '60K', '80K', '100K'];
  let counterLeftLabel = 0;

  let labelsRight = ['0', '500', '1K', '1.5K', '2K', '2.5K'];
  let counterRightLabel = 0;

  let labelsOptionsPercentageLeft = ['0', '20%', '40%', '60%', '80%', '100%'];
  let counterOptionsPercentageLeftLabel = 0;

  let labelsOptionsRevenueDown = ['0', '200K', '400K', '600K', '800K', '1M', '1.2M', '1.4M', '1.6M'];
  let counterOptionsRevenueDownLabel = 0;

  const options = {
    chart: {
      type: 'column'
    },

    title: {
      text: 'Revenue by Date',
      align: 'left'
    },

    xAxis: {
      categories: categories,
      min: 0,
      max: 29
    },

    yAxis: [
      {
        allowDecimals: false,
        tickAmount: 6,
        labels: {
          formatter: function () {
            if (this.isFirst) {
              counterLeftLabel = -1;
            }
            counterLeftLabel++;
            return labelsLeft[counterLeftLabel];
          }
        },
        lineWidth: 1,
        title: {
          text: 'Existing Customer Revenue'
        },
        stackLabels: {
          enabled: true,
          format: '${total}',
          style: {
            fontWeight: 'bold',
            color:
              // theme
              (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray',
            textOutline: 'none'
          }
        }
      },
      {
        allowDecimals: false,
        tickAmount: 6,
        labels: {
          formatter: function () {
            if (this.isFirst) {
              counterRightLabel = -1;
            }
            counterRightLabel++;
            return labelsRight[counterRightLabel];
          }
        },
        lineWidth: 1,
        opposite: true,
        title: {
          text: 'Total Orders'
        }
      }
    ],

    tooltip: {
      formatter: function () {
        return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y + '<br/>' + 'Total: ' + this.point.stackTotal;
      }
    },

    plotOptions: {
      column: {
        stacking: 'normal'
      }
    },
    colors: ['#ECE033', '#ADAEBA', '#373943', '#ED561B'],
    series: [
      {
        type: 'column',
        name: 'New Customer Revenue',
        data: newCustomerRevenue
      },
      {
        type: 'column',
        name: 'Existing Customer Revenue',
        data: existingCustomerRevenue
      },
      {
        type: 'spline',
        name: 'Total Orders',
        data: sumRevenues
      },
      {
        type: 'spline',
        name: 'New Customer Orders',
        data: newCustomerOrders,
        yAxis: 1
      }
    ]
  };

  const optionsPercentage = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'Revenue By Source'
    },
    xAxis: {
      categories: ['2021/22', '2020/21', '2019/20', '2018/19', '2017/18']
    },
    yAxis: {
      tickAmount: 6,
      labels: {
        formatter: function () {
          if (this.isFirst) {
            counterOptionsPercentageLeftLabel = -1;
          }
          counterOptionsPercentageLeftLabel++;
          return labelsOptionsPercentageLeft[counterOptionsPercentageLeftLabel];
        }
      },
      lineWidth: 1,
      title: {
        text: ''
      }
    },
    tooltip: {
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
      shared: true
    },
    plotOptions: {
      column: {
        stacking: 'percent'
      }
    },
    colors: ['#144274', '#F5E61C', '#257BC5', '#E98A18', '#1F7637', '#7B0015', '#6FAC2E', '#870049'],
    series: [
      {
        name: 'Online Store',
        data: revenueSources
      },
      {
        name: 'Whole Sale - Faire Whol...',
        data: [0, 4, 3, 2, 3]
      },
      {
        name: 'Amazon',
        data: [1, 2, 2, 1, 2]
      },
      {
        name: 'Whole Sate - Online Store',
        data: [4, 4, 2, 4, 4]
      },
      {
        name: 'Whole Slae - Draft Orders',
        data: [0, 4, 3, 2, 3]
      },
      {
        name: 'Codisto',
        data: [1, 2, 2, 1, 2]
      },
      {
        name: 'Whole Sale- Zapier',
        data: [4, 4, 2, 4, 4]
      },
      {
        name: 'Miraki Marketplace App',
        data: [0, 4, 3, 2, 3]
      }
    ]
  };

  const optionsRevenue = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Revenue By Source'
    },
    xAxis: { categories: [''] },
    yAxis: {
      tickAmount: 8,
      labels: {
        formatter: function () {
          if (this.isFirst) {
            counterOptionsRevenueDownLabel = -1;
          }
          counterOptionsRevenueDownLabel++;
          return labelsOptionsRevenueDown[counterOptionsRevenueDownLabel];
        }
      },

      title: {
        text: ''
      }
    },

    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        }
      }
    },

    credits: {
      enabled: false
    },
    colors: ['#144274'],
    series: [
      {
        name: 'Online Store',
        data: [OnlineStoreRevenue]
      },
      {
        name: 'Amazon',
        data: [AmazonRevenue]
      },
      {
        name: 'Whole Sale - Draft Orders',
        data: [DraftOrdersRevenue]
      },
      {
        name: 'Whole Sale- Zapier',
        data: [ZapierRevenue]
      },
      {
        name: 'Whole Sale - Faire Whol...',
        data: [FaireWholesaleRevenue]
      },
      {
        name: 'Codisto',
        data: [CodistoRevenue]
      },
      {
        name: 'Miraki Marketplace App',
        data: [MiraklMarketplacesAppRevenue]
      },
      {
        name: 'Carro',
        data: [CarroRevenue]
      }
    ]
  };

  useEffect(() => {
    const fetchParseData = async () => {
      Papa.parse(data, {
        header: true,
        download: true,
        delimiter: ',',
        complete: (result) => {
          const existingUsersRevenueByDate = [];
          const newUsersRevenueByDate = [];

          // Sort the data by order date in descending order
          const sortedDataByDate = result.data
            .slice(0, 50) // Limit to the first 50 elements
            .sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

          console.log(sortedDataByDate);

          const lastMonthData = [];
          const numberOrdersByNewUser = {};

          // Iterate over each item in the sorted data
          sortedDataByDate.forEach((item) => {
            const date = item.order_date;
            const numOrders = parseFloat(item.num_orders);
            const itemQuantity = parseFloat(item.item_quantity);
            const orderCount = itemQuantity !== numOrders ? itemQuantity : numOrders;

            // Check if the arrays are not full
            if (existingUsersRevenueByDate.length < 30 && newUsersRevenueByDate.length < 30) {
              // Check if the date already exists in the last month's data
              const isDateRepeated = lastMonthData.some((data) => data.order_date === item.order_date);

              if (isDateRepeated) {
                // Update the existing revenue for the date
                const existingIndex = existingUsersRevenueByDate.findIndex((existingItem) => existingItem.date === date);
                const newIndex = newUsersRevenueByDate.findIndex((newItem) => newItem.date === date);

                if (item.customer_type === 'Existing') {
                  // Add revenue to existing user
                  existingUsersRevenueByDate[existingIndex].revenue += parseFloat(item.order_revenue);
                } else if (item.customer_type === 'New') {
                  // Add revenue to new user
                  newUsersRevenueByDate[newIndex].revenue += parseFloat(item.order_revenue);
                  if (numberOrdersByNewUser[date]) {
                    numberOrdersByNewUser[date] += orderCount;
                  } else {
                    numberOrdersByNewUser[date] = orderCount;
                  }
                }
              } else {
                if (item.customer_type === 'Existing') {
                  // Add new entry for existing user
                  existingUsersRevenueByDate.push({ date, revenue: parseFloat(item.order_revenue) });
                  newUsersRevenueByDate.push({ date, revenue: 0 });
                  if (!numberOrdersByNewUser[date]) {
                    numberOrdersByNewUser[date] = 0;
                  }
                } else if (item.customer_type === 'New') {
                  // Add new entry for new user
                  existingUsersRevenueByDate.push({ date, revenue: 0 });
                  newUsersRevenueByDate.push({ date, revenue: parseFloat(item.order_revenue) });
                  if (numberOrdersByNewUser[date]) {
                    numberOrdersByNewUser[date] += orderCount;
                  } else {
                    numberOrdersByNewUser[date] = orderCount;
                  }
                }
              }

              lastMonthData.push(item);
            } else {
              // Arrays are full, exit the loop
              return;
            }
          });

          const uniqueDates = lastMonthData.map((item) => {
            const date = new Date(item.order_date);
            const options = { month: 'short', day: 'numeric' };
            return date.toLocaleString('en-US', options);
          });

          // Filter unique dates by keeping only the first occurrence
          const categories = uniqueDates.filter((date, index) => uniqueDates.indexOf(date) === index);

          setCategories(categories.reverse()); // Reverse the order of categories

          setExistingCustomerRevenue(existingUsersRevenueByDate.reverse().map((item) => item.revenue)); // Reverse and set existing customer revenue

          setNewCustomerRevenue(newUsersRevenueByDate.reverse().map((item) => item.revenue)); // Reverse and set new customer revenue

          setNewCustomerOrders(Object.values(numberOrdersByNewUser).reverse()); // Reverse and set new customer orders

          // console.log(existingUsersRevenueByDate);
          // console.log(newUsersRevenueByDate);
          // console.log(Object.values(numberOrdersByNewUser));

          // Calculate Total Revenue
          const totalRevenue = result.data.reduce((sum, item) => sum + parseFloat(item.order_revenue), 0);

          // Calculate Total Orders
          const totalOrders = result.data.reduce((sum, item) => sum + parseFloat(item.num_orders), 0);

          // Calculate New Customers
          const newCustomers = result.data.filter((item) => item.customer_type === 'New');
          const totalNewCustomers = newCustomers.length;

          // Calculate % New Customers Revenue
          const totalNewCustomersRevenue = newCustomers.reduce((sum, item) => sum + parseFloat(item.order_revenue), 0);
          const percentNewCustomersRevenue = (totalNewCustomersRevenue / totalRevenue) * 100;

          // Format the metrics for display
          const formatMetric = (value) => {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(2) + 'M';
            } else if (value >= 1000) {
              return (value / 1000).toFixed(2) + 'k';
            } else {
              return value.toString();
            }
          };

          // Store the metrics in separate states
          const formattedTotalRevenue = formatMetric(totalRevenue);
          const formattedTotalOrders = formatMetric(totalOrders);
          const formattedTotalNewCustomers = formatMetric(totalNewCustomers);
          const formattedPercentNewCustomersRevenue = percentNewCustomersRevenue.toFixed(2);

          setTotalRevenue(formattedTotalRevenue);
          setTotalOrders(formattedTotalOrders);
          setTotalNewCustomers(formattedTotalNewCustomers);
          setPercentNewCustomersRevenue(formattedPercentNewCustomersRevenue);

          // console.log(totalOrders);
          // console.log(totalNewCustomers);
          // console.log(percentNewCustomersRevenue);

          const last30DaysData = result.data
            .slice(0, 30) // Limit to the first 50 elements
            .sort((a, b) => new Date(b.order_date) - new Date(a.order_date));

          // console.log(last30DaysData);

          //Calculate percentages of General metrics
          const previousTotalRevenue = last30DaysData.reduce((sum, item) => sum + parseInt(item.order_revenue), 0).toFixed(2);
          const previousTotalOrders = last30DaysData.reduce((sum, item) => sum + parseInt(item.num_orders), 0).toFixed(0);
          const previousNewCustomers = last30DaysData.filter((item) => item.customer_type === 'New').length;
          const previousTotalNewCustomersRevenue = last30DaysData
            .filter((item) => item.customer_type === 'New')
            .reduce((sum, item) => sum + parseFloat(item.order_revenue), 0)
            .toFixed(2);

          const percentChangeTotalRevenue = ((totalRevenue - previousTotalRevenue) / previousTotalRevenue) * 100;
          const percentChangeTotalOrders = ((totalOrders - previousTotalOrders) / previousTotalOrders) * 100;
          const percentChangeTotalNewCustomers = ((totalNewCustomers - previousNewCustomers) / previousNewCustomers) * 100;
          const percentChangeNewCustomersRevenue =
            ((totalNewCustomersRevenue - previousTotalNewCustomersRevenue) / previousTotalNewCustomersRevenue) * 100;

          const formattedPercentChangeTotalRevenue = percentChangeTotalRevenue.toFixed(0);
          const formattedPercentChangeTotalOrders = percentChangeTotalOrders.toFixed(0);
          const formattedPercentChangeTotalNewCustomers = percentChangeTotalNewCustomers.toFixed(0);
          const formattedPercentChangeNewCustomersRevenue = percentChangeNewCustomersRevenue.toFixed(0);

          setPercentChangeTotalRevenue(formattedPercentChangeTotalRevenue);
          setPercentChangeTotalOrders(formattedPercentChangeTotalOrders);
          setPercentChangeTotalNewCustomers(formattedPercentChangeTotalNewCustomers);
          setPercentChangeNewCustomersRevenue(formattedPercentChangeNewCustomersRevenue);

          console.log(
            totalRevenue,
            percentChangeTotalRevenue,
            percentChangeTotalOrders,
            percentChangeTotalNewCustomers,
            percentChangeNewCustomersRevenue
          );

          // Average Performance
          // Calculate Average Revenue per day
          const averageRevenuePerDay = (totalRevenue / result.data.length).toFixed(2);

          // Calculate Average Orders per day
          const averageOrdersPerDay = (totalOrders / result.data.length).toFixed(2);

          // Calculate Average Items per order
          const totalItems = result.data.reduce((sum, item) => sum + parseInt(item.item_quantity), 0);
          const averageItemsPerOrder = (totalItems / totalOrders).toFixed(2);

          // Calculate Average Order Value
          const averageOrderValue = (totalRevenue / totalOrders).toFixed(2);

          // Calculate Average New Customers per day
          const averageNewCustomersPerDay = (totalNewCustomers / result.data.length).toFixed(2);

          const avgRevenueDay = formatMetric(averageRevenuePerDay);

          // Store the average metrics in separate states
          setAverageRevenuePerDay(avgRevenueDay);
          setAverageOrdersPerDay(averageOrdersPerDay);
          setAverageItemsPerOrder(averageItemsPerOrder);
          setAverageOrderValue(averageOrderValue);
          setAverageNewCustomersPerDay(averageNewCustomersPerDay);

          // console.log(averageRevenuePerDay, averageOrdersPerDay, averageItemsPerOrder, averageOrderValue, averageNewCustomersPerDay);

          //Calculate percentages of Average Perormance
          const previousAverageRevenuePerDay = lastMonthData.reduce((sum, item) => sum + parseFloat(item.order_revenue), 0);
          const previousAverageOrdersPerDay = lastMonthData.reduce((sum, item) => sum + parseFloat(item.num_orders), 0);
          const previousAverageItemsPerOrder = lastMonthData.filter((item) => item.customer_type === 'New').length;
          const previousAverageOrderValue = lastMonthData.filter((item) => item.customer_type === 'New').length;
          const previousAverageNewCustomersPerDay = lastMonthData
            .filter((item) => item.customer_type === 'New')
            .reduce((sum, item) => sum + parseFloat(item.order_revenue), 0);

          // Calculate the percentage change for each value
          const percentChangeAverageRevenuePerDay =
            ((averageRevenuePerDay - previousAverageRevenuePerDay) / previousAverageRevenuePerDay) * 100;
          const percentChangeAverageOrdersPerDay =
            ((averageOrdersPerDay - previousAverageOrdersPerDay) / previousAverageOrdersPerDay) * 100;
          const percentChangeAverageItemsPerOrder =
            ((averageItemsPerOrder - previousAverageItemsPerOrder) / previousAverageItemsPerOrder) * 100;
          const percentChangeAverageOrderValue = ((averageOrderValue - previousAverageOrderValue) / previousAverageOrderValue) * 100;
          const percentChangeAverageNewCustomersPerDay =
            ((averageNewCustomersPerDay - previousAverageNewCustomersPerDay) / previousAverageNewCustomersPerDay) * 100;

          // Format the percentage changes
          const formattedPercentChangeAverageRevenuePerDay = percentChangeAverageRevenuePerDay.toFixed(0);
          const formattedPercentChangeAverageOrdersPerDay = percentChangeAverageOrdersPerDay.toFixed(0);
          const formattedPercentChangeAverageItemsPerOrder = percentChangeAverageItemsPerOrder.toFixed(0);
          const formattedPercentChangeAverageOrderValue = percentChangeAverageOrderValue.toFixed(0);
          const formattedPercentChangeAverageNewCustomersPerDay = percentChangeAverageNewCustomersPerDay.toFixed(0);

          // Set the percentage change states
          setPercentChangeAverageRevenuePerDay(formattedPercentChangeAverageRevenuePerDay);
          setPercentChangeAverageOrdersPerDay(formattedPercentChangeAverageOrdersPerDay);
          setPercentChangeAverageItemsPerOrder(formattedPercentChangeAverageItemsPerOrder);
          setPercentChangeAverageOrderValue(formattedPercentChangeAverageOrderValue);
          setPercentChangeAverageNewCustomersPerDay(formattedPercentChangeAverageNewCustomersPerDay);

          // console.log(
          //   percentChangeAverageRevenuePerDay,
          //   percentChangeAverageOrdersPerDay,
          //   percentChangeAverageItemsPerOrder,
          //   percentChangeAverageOrderValue,
          //   percentChangeAverageNewCustomersPerDay
          // );

          //Total Revenue
          function calculateSumRevenues(lastMonthData) {
            // Calculate revenue by date
            const revenueByDate = lastMonthData.reduce((accumulator, item) => {
              const date = item.order_date;
              const revenue = parseFloat(item.order_revenue);

              if (accumulator[date]) {
                // If the date already exists in the accumulator, add the revenue
                accumulator[date] += revenue;
              } else {
                // If the date does not exist in the accumulator, set the revenue
                accumulator[date] = revenue;
              }

              return accumulator;
            }, {});

            // Create an array of objects containing date and revenue
            const sumRevenues = Object.entries(revenueByDate)
              .map(([date, revenue]) => ({ date, revenue }))
              .reverse();

            return sumRevenues;
          }

          // Calculate and set the sum of revenues
          setSumRevenues(calculateSumRevenues(lastMonthData).map((item) => item.revenue));

          // function getStartOfWeek(date) {
          //   const currentDate = new Date(date);
          //   const dayOfWeek = currentDate.getDay();
          //   const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday being the first day of the week
          //   return new Date(currentDate.setDate(diff));
          // }

          // Function to get the start of the week for a given date
          function getStartOfWeek(date) {
            const currentDate = new Date(date);
            const dayOfWeek = currentDate.getDay();
            const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for Sunday being the first day of the week
            return new Date(currentDate.getFullYear(), currentDate.getMonth(), diff);
          }

          // Array of revenue sources
          const revenueSources = [
            'Online Store',
            'Amazon',
            'Draft Orders',
            'Zapier',
            'Faire Wholesale',
            'Codisto',
            'Mirakl Marketplaces App',
            'Carro'
          ];

          // Group the data by week and calculate the sum of revenue for each revenue source
          const sumByRevenueSourceWeekly = result.data.reduce((acc, item) => {
            const { order_revenue, order_revenue_source, order_date } = item;

            // Check if the order revenue source is included in the specified sources
            if (revenueSources.includes(order_revenue_source)) {
              const weekStartDate = getStartOfWeek(order_date);
              const weekKey = weekStartDate.toISOString();

              if (!acc[weekKey]) {
                acc[weekKey] = {
                  week: weekKey,
                  totalRevenue: 0,
                  revenueBySource: {}
                };
                revenueSources.forEach((source) => {
                  acc[weekKey].revenueBySource[source] = 0;
                });
              }

              acc[weekKey].revenueBySource[order_revenue_source] += parseFloat(order_revenue);
              acc[weekKey].totalRevenue += parseFloat(order_revenue);
            }

            return acc;
          }, {});

          // Calculate the percentage of revenue for each revenue source
          const chartData = Object.values(sumByRevenueSourceWeekly).map((weekData) => {
            const { week, totalRevenue, revenueBySource } = weekData;

            const percentageData = revenueSources.reduce((acc, source) => {
              const revenue = revenueBySource[source];
              const percentage = (revenue / totalRevenue) * 100 || 0;
              acc[source] = percentage.toFixed(2);
              return acc;
            }, {});

            return {
              week,
              totalRevenue: totalRevenue.toFixed(2),
              ...percentageData
            };
          });

          // Sort the chart data by week
          chartData.sort((a, b) => new Date(a.week) - new Date(b.week));

          // Select the first 8 elements
          const selectedData = chartData.slice(0, 8);

          //  const last30DaysData = result.data
          //   .slice(0, 30) // Limit to the first 50 elements
          //   .sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
          // Set the transformed data and revenue sources for the chart
          setChartData(chartData);
          setRevenueSources(
            selectedData
              .slice(0, 1) // Select the first eight values
              .map((item) => item['Online Store']) // Extract the 'Online Store' value
          );

          // console.log(
          //   selectedData
          //     .slice(0, 1) // Select the first eight values
          //     .map((item) => item['Online Store'])
          // );
          // console.log(
          //   selectedData
          //     .map(
          //       (item) =>
          //         `${item['Online Store']}, ${item['Amazon']}, ${item['Draft Orders']}, ${item['Zapier']}, ${item['Faire Wholesale']}, ${item['Codisto']}, ${item['Mirakl Marketplaces App']}, ${item['Carro']}`
          //     )
          //     .join(', ')
          // );

          // Calculate the sum of revenue for each revenue source
          const sumByRevenueSource = result.data.reduce((acc, item) => {
            const { order_revenue, order_revenue_source } = item;

            // Check if the order revenue source is included in the specified sources
            if (
              [
                'Online Store',
                'Amazon',
                'Draft Orders',
                'Zapier',
                'Faire Wholesale',
                'Codisto',
                'Mirakl Marketplaces App',
                'Carro'
              ].includes(order_revenue_source)
            ) {
              // If the revenue source is valid, add the order revenue to the corresponding accumulator entry
              acc[order_revenue_source] = (acc[order_revenue_source] || 0) + parseFloat(order_revenue);
            }

            return acc;
          }, {});

          // Set the revenue values for each revenue source
          setOnlineStoreRevenue(sumByRevenueSource['Online Store'] || 0);
          setAmazonRevenue(sumByRevenueSource['Amazon'] || 0);
          setDraftOrdersRevenue(sumByRevenueSource['Draft Orders'] || 0);
          setZapierRevenue(sumByRevenueSource['Zapier'] || 0);
          setFaireWholesaleRevenue(sumByRevenueSource['Faire Wholesale'] || 0);
          setCodistoRevenue(sumByRevenueSource['Codisto'] || 0);
          setMiraklMarketplacesAppRevenue(sumByRevenueSource['Mirakl Marketplaces App'] || 0);
          setCarroRevenue(sumByRevenueSource['Carro'] || 0);

          // console.log(
          //   OnlineStoreRevenue,
          //   AmazonRevenue,
          //   DraftOrdersRevenue,
          //   ZapierRevenue,
          //   FaireWholesaleRevenue,
          //   CodistoRevenue,
          //   MiraklMarketplacesAppRevenue,
          //   CarroRevenue
          // );

          console.log(chartData, revenueSources);
        }
      });
    };
    fetchParseData();
  }, []);

  // totalRevenue;
  // totalOrders;
  // totalNewCustomers;
  // percentNewCustomersRevenue;

  // percentChangeTotalRevenue;
  // percentChangeTotalOrders;
  // percentChangeTotalNewCustomers;
  // percentChangeNewCustomersRevenue;

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: 2, mt: -8 }}>
        <Typography variant="h2">Revenue Overview</Typography>
      </Grid>
      <Stack direction="row" spacing={2} ml={2}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <MainCard contentSX={{ p: 2.25 }}>
            <Typography variant="h3" color="textPrimary">
              General Metrics
            </Typography>
            <br />
            <Stack direction="row" spacing={3}>
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }} onew={chartData}>
                      <small style={{ fontSize: '18px' }}>$</small>
                      {totalRevenue}
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeTotalRevenue < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeTotalRevenue < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeTotalRevenue)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Total Revenue
                  </Typography>
                </Box>
              </Stack>
              {/* another item */}
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      {totalOrders}
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeTotalOrders < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeTotalOrders < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeTotalOrders)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Total Orders
                  </Typography>
                </Box>
              </Stack>
              {/* another item */}
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      {totalNewCustomers}
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeTotalNewCustomers < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeTotalNewCustomers < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeTotalNewCustomers)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    New Customers
                  </Typography>
                </Box>
              </Stack>
              {/* another item */}
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      {percentNewCustomersRevenue} <small style={{ fontSize: '18px' }}>%</small>
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeNewCustomersRevenue < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeNewCustomersRevenue < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeNewCustomersRevenue)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    % New Customers Revenue
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>

        {/* Average Performance */}
        <Grid item xs={6} sm={6} md={6} lg={7}>
          <MainCard contentSX={{ p: 2.25 }}>
            <Typography variant="h3" color="textPrimary">
              Average Performance
            </Typography>
            <br />
            <Stack direction="row" spacing={4}>
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      <small>$</small>
                      {averageRevenuePerDay}
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeAverageRevenuePerDay < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeAverageRevenuePerDay < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeAverageRevenuePerDay)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Avg Revenue/Day
                  </Typography>
                </Box>
              </Stack>
              {/* another item */}
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      {averageOrdersPerDay} <small style={{ fontSize: '18px', marginLeft: '-6px' }}></small>
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeAverageOrdersPerDay < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeAverageOrdersPerDay < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeAverageOrdersPerDay)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Avg Orders/Day
                  </Typography>
                </Box>
              </Stack>
              {/* another item */}
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      {averageItemsPerOrder} <small style={{ fontSize: '18px', marginLeft: '-6px' }}></small>
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeAverageItemsPerOrder < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeAverageItemsPerOrder < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeAverageItemsPerOrder)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Avg Items/Order
                  </Typography>
                </Box>
              </Stack>
              {/* another item */}
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      <small>$</small>
                      {averageOrderValue} <small style={{ fontSize: '18px', marginLeft: '-6px' }}></small>
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeAverageOrderValue < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeAverageOrderValue < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeAverageOrderValue)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Avg Order Value
                  </Typography>
                </Box>
              </Stack>
              {/* another item */}
              <Stack spacing={-0.2}>
                <Grid container alignItems="end">
                  <Grid item>
                    <Typography variant="h3" color="inherit" sx={{ fontWeight: '700' }}>
                      {averageNewCustomersPerDay} <small style={{ fontSize: '18px', marginLeft: '-6px' }}></small>
                    </Typography>
                  </Grid>

                  <Grid item ml={0.2}>
                    <Stack direction="row" spacing={-0.6} sx={{ alignItems: 'center' }}>
                      {percentChangeAverageNewCustomersPerDay < 0 ? (
                        <ArrowDropDownIcon style={{ color: `${red[600]}` }} />
                      ) : (
                        <ArrowDropUpIcon style={{ color: `${green[600]}` }} />
                      )}
                      <Typography
                        variant="subtitle2"
                        color={percentChangeAverageNewCustomersPerDay < 0 ? red[600] : green[600]}
                        sx={{ fontWeight: '700' }}
                      >
                        {Math.abs(percentChangeAverageNewCustomersPerDay)} <small style={{ fontSize: '10px' }}>%</small>
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Avg New Customers/Day
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </MainCard>
        </Grid>
      </Stack>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 Revenue By Date*/}
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2, mt: -2 }}>
        <Stack direction="row" spacing={2} ml={0.2}>
          <HighchartsReact highcharts={Highcharts} options={options} containerProps={{ style: { width: '100%' } }} />
        </Stack>
      </Grid>

      {/* row 3 Revenue By Source */}
      <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mb: 2, mt: -2 }}>
        <Stack direction="row" spacing={2} ml={0.2}>
          <Grid item xs={7} sm={7} md={7} lg={7}>
            <HighchartsReact highcharts={Highcharts} options={optionsPercentage} containerProps={{ style: { width: '100%' } }} />
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5}>
            <HighchartsReact highcharts={Highcharts} options={optionsRevenue} containerProps={{ style: { width: '100%' } }} />
          </Grid>
        </Stack>
      </Grid>

      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Unique Visitor</Typography>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" spacing={0}>
              <Button
                size="small"
                onClick={() => setSlot('month')}
                color={slot === 'month' ? 'primary' : 'secondary'}
                variant={slot === 'month' ? 'outlined' : 'text'}
              >
                Month
              </Button>
              <Button
                size="small"
                onClick={() => setSlot('week')}
                color={slot === 'week' ? 'primary' : 'secondary'}
                variant={slot === 'week' ? 'outlined' : 'text'}
              >
                Week
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <MainCard content={false} sx={{ mt: 1.5 }}>
          <Box sx={{ pt: 1, pr: 2 }}>
            <IncomeAreaChart slot={slot} />
          </Box>
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Income Overview</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <Box sx={{ p: 3, pb: 0 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="textSecondary">
                This Week Statistics
              </Typography>
              <Typography variant="h3">$7,650</Typography>
            </Stack>
          </Box>
          <MonthlyBarChart />
        </MainCard>
      </Grid> */}

      {/* row 3 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Recent Orders</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Analytics Report</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
            <ListItemButton divider>
              <ListItemText primary="Company Finance Growth" />
              <Typography variant="h5">+45.14%</Typography>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemText primary="Company Expenses Ratio" />
              <Typography variant="h5">0.58%</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Business Risk Cases" />
              <Typography variant="h5">Low</Typography>
            </ListItemButton>
          </List>
          <ReportAreaChart />
        </MainCard>
      </Grid> */}

      {/* row 4 */}
      {/* <Grid item xs={12} md={7} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Sales Report</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="standard-select-currency"
              size="small"
              select
              value={value}
              onChange={(e) => setValue(e.target.value)}
              sx={{ '& .MuiInputBase-input': { py: 0.5, fontSize: '0.875rem' } }}
            >
              {status.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <MainCard sx={{ mt: 1.75 }}>
          <Stack spacing={1.5} sx={{ mb: -12 }}>
            <Typography variant="h6" color="secondary">
              Net Profit
            </Typography>
            <Typography variant="h4">$1560</Typography>
          </Stack>
          <SalesColumnChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Transaction History</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <List
            component="nav"
            sx={{
              px: 0,
              py: 0,
              '& .MuiListItemButton-root': {
                py: 1.5,
                '& .MuiAvatar-root': avatarSX,
                '& .MuiListItemSecondaryAction-root': { ...actionSX, position: 'relative' }
              }
            }}
          >
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'success.main',
                    bgcolor: 'success.lighter'
                  }}
                >
                  <GiftOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #002434</Typography>} secondary="Today, 2:00 AM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $1,430
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    78%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton divider>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'primary.main',
                    bgcolor: 'primary.lighter'
                  }}
                >
                  <MessageOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #984947</Typography>} secondary="5 August, 1:45 PM" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $302
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    8%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'error.main',
                    bgcolor: 'error.lighter'
                  }}
                >
                  <SettingOutlined />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={<Typography variant="subtitle1">Order #988784</Typography>} secondary="7 hours ago" />
              <ListItemSecondaryAction>
                <Stack alignItems="flex-end">
                  <Typography variant="subtitle1" noWrap>
                    + $682
                  </Typography>
                  <Typography variant="h6" color="secondary" noWrap>
                    16%
                  </Typography>
                </Stack>
              </ListItemSecondaryAction>
            </ListItemButton>
          </List>
        </MainCard>
        <MainCard sx={{ mt: 2 }}>
          <Stack spacing={3}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item>
                <Stack>
                  <Typography variant="h5" noWrap>
                    Help & Support Chat
                  </Typography>
                  <Typography variant="caption" color="secondary" noWrap>
                    Typical replay within 5 min
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  <Avatar alt="Remy Sharp" src={avatar1} />
                  <Avatar alt="Travis Howard" src={avatar2} />
                  <Avatar alt="Cindy Baker" src={avatar3} />
                  <Avatar alt="Agnes Walker" src={avatar4} />
                </AvatarGroup>
              </Grid>
            </Grid>
            <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
              Need Help?
            </Button>
          </Stack>
        </MainCard>
      </Grid> */}
    </Grid>
  );
};

export default DashboardDefault;
