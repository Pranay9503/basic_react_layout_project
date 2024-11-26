import React, { useState, useEffect } from 'react';
import Link from 'antd/es/typography/Link';
import { useNavigate } from 'react-router-dom';
import '../css/RO.css';
import qs from 'qs';
import {
  DesktopOutlined,
  RetweetOutlined,
  TruckOutlined,
  DatabaseOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  QuestionCircleOutlined,
  LineChartOutlined,
  CodeSandboxOutlined,
  GlobalOutlined,
  EllipsisOutlined,
  SwitcherOutlined,
  ShoppingCartOutlined,
  FileAddOutlined,
  SearchOutlined,
  HomeOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Layout, Menu, theme, Button, Input, Table } from 'antd';
import {Select} from 'antd';
import Title from 'antd/es/skeleton/Title';
import { DatePicker } from 'antd';
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
    Title
  };
}
const items = [
    getItem('','0',<img style={{width:'150px',marginTop:'20px',marginBottom:'20px'}} src="https://earbor.com/assets/images/logos/logo-1.png" alt=""/>),
  getItem('Dashboard', '1', <DesktopOutlined />),
  getItem('Inward RO Management', '2', <TruckOutlined />,[
    getItem('RO', '14')
  ]),
  getItem('Location Management', 'sub1', <GlobalOutlined />, [
    getItem('Location/Cart Dashboard', '3'),
    getItem('Create Location/Cart', '4'),
    getItem('Location Upload', '5'),
    getItem('Other Locations','15'),
    getItem('Print Locations','16')
  ]),
  getItem('Order Management', 'sub2', <DatabaseOutlined />, [
    getItem('Order Dashboard', '6'), 
    getItem('Batch Job Printing', '8'),
    getItem('Batch Allocation', '17'),
    getItem('Batch Print','18'),
    getItem('KIT Dashboard','19'),
    getItem('Returns','20'),
    getItem('Manual Returns','21'),
    getItem('Shipping Dashboard','22')
  ]),
  getItem('Move Management', '9', <RetweetOutlined />,[
    getItem('Move Items','23'),
    getItem('Move Pallet','24')
  ]),
  getItem('Warehouse Management','10',<CodeSandboxOutlined />,[
    getItem('Adjustments','25'),
    getItem('Product Replenishment','26'),
    getItem('Product Expire','27'),
    getItem('UPC/QR Code','28'),
    getItem('Package Dimensions','29'),
    getItem('SKU Management','30'),
    getItem('Cycle Counts','31')
  ]),
  getItem('Reports','11',<LineChartOutlined />,[
    getItem('Order Report','32'),
    getItem('Inventory Report','33'),
    getItem('Other Reports','34'),
    getItem('Inbound Reports','35'),
    getItem('Productivity Reports','36'),
    getItem('Stock Movement Report','37')
  ]),
  getItem('Admin','12',<UserOutlined />,[
    getItem('User Management','38'),
    getItem('Client Management','39')
  ]),
  getItem('Help Desk','13',<QuestionCircleOutlined />,[
    getItem('Help Desk','40')
  ])
];

const columns = [
  {
    title: 'Client',
    dataIndex: 'name',
    sorter: true,
    //render: (name) => `${name.first} ${name.last}`,
    width: '20%',
  },
  {
    title: 'RO',
    dataIndex: 'number',
  },
  {
    title: 'Reference#',
    dataIndex: 'name',
  },
  {
    title:'PO#',
    dataIndex:'number'
  },
  {
    title:'Status',
    dataIndex:'name'
  },
  {
    title:'Actions'
  },
  {
    title:'SKU/Count'
  },
  {
    title:'Created Date'
  },
  {
    title:'Scheduled'
  },
  {
    title:'Arrived'
  },
  {
    title:'Unload Start'
  },
  {
    title:'Finalized'
  },
  {
    title:'Completed'
  },
  {
    title:'KPI'
  },
  {
    title:'Container Type'
  },
  {
    title:'Container#'
  },
];
const getRandomuserParams = (params) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const openItems = [
    {
      label:'All',
      value:1000
    },
    {
      label:'Open-All',
      value:2000
    },
    {
      label:'Open',
      value:3000
    },
    {
      label:'Scheduled',
      value:4000
    },
    {
      label:'Arrived',
      value:5000
    },
    {
      label:'Unloaded',
      value:6000
    },
    {
      label:'Completed',
      value:7000
    },
    {
      label:'Putaway',
      value:8000
    },
    {
      label:'Finalized',
      value:9000
    },
    {
      label:'Hold',
      value:10000
    },
]

const RO = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [token,setToken] = useState();
  const [warehouseItems, setWarehouseItems] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [dashboardClassname, setDashboardClassname] = useState('dashboard-selected');
  const [searchClassname, setSearchClassname] = useState('search-btn');
  const [uploadClassname, setUploadClassname] = useState('upload-btn');
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [ClientData, setClientData] = useState([{
    label:'Please Select Client',
    value:1000
  }]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const fetchData = () => {
    setLoading(true);
    fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
      .then((res) => res.json())
      .then(({ results }) => {
        setData([]);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
          },
        });
      });
  };
  useEffect(() => {
    fetchData();
  }, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([filters]);
    }
  };
  
  useEffect(() => {
      if(!localStorage.getItem('user-token')){
          navigate('/signin');
      } else {
          let tok = JSON.parse(localStorage.getItem('user-token'));
          setToken(tok.token);
      }
  },[]);

  useEffect(() => {
    fetch('http://82.197.95.187:6024/api/Base/LoadWarehouse', {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }).then(response => response.json())
    .then(data => {
      const formatedItems = data.data.map(item => ({
          label: item.name,
          value:item.uniqueid
      }));
      setWarehouseItems([{
        label:'Please Select Warehouse',
        value:''
      },...formatedItems]);
    });
  },[]);

  const handleChangeClient = (value) => {
    fetch(`http://82.197.95.187:6024/api/RO/GetClients?warehouseId=${value}`, {
      method:'GET',
      headers:{
          'Accept':'application/json',
          'Authorization':`Bearer ${token}`
      }
    }).then(response => response.json())
      .then(data => {
        if(data.status === 400){
          setClientData([{
            label:'Please Select Client',
            value:1000
          }]);
        } else {
          const formatedItems = data.data.map(item => ({
            label: item.name,
            value:item.uniqueId
          }));
          if(formatedItems){
            setClientData([{
              label:'Please Select Client',
              value:1000
            },...formatedItems]);
          } else {
            setClientData([{
              label:'No Clients Yet.',
              value:''
            }]);
          }      
        }
      });
  }
  
  const handleChange = (value) => {
    console.log(value);
  }

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  return (
    <>
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider style={{backgroundColor:'white'}} width={270} collapsed={collapsed} onCollapse={(value) => {setCollapsed(value)}}>
        <div className="demo-logo-vertical" />
        <Menu defaultSelectedKeys={['1']} mode="inline" items={items}/>
      </Sider>
      <Layout>
      <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <div>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </div>
                <div style={{marginRight:'50px'}}>
                    <Link style={{marginRight:'20px',textDecoration: 'none',textTransform:'uppercase',color:'black',fontWeight:'bold'}}>{JSON.parse(localStorage.getItem('username'))}</Link>
                    <button onClick={() => {
                        localStorage.clear();
                        navigate('/signin');
                    }} style={{color:'black',backgroundColor: '#fff', border: 'none',fontSize: '16px',cursor: 'pointer'}}>Logout</button>
                </div>
            </div>
        </Header>
        <Content
          style={{
            margin: 0,
            paddingTop:12,
            padding: 22,
            backgroundColor: 'rgb(236, 239, 243)',
            borderRadius: '1rem',
          }}
        >
          <h3 style={{fontFamily: 'Rubik, sans-serif',fontWeight: 'bold', paddingTop:'6px',paddingLeft:'8px'}}>Recieve Orders/ Purchase Order Management</h3>
          <Content style={{
            backgroundColor:'#fff',
            borderRadius: borderRadiusLG,
            marginTop:'16px',
            paddingBottom:'5px'
          }}>
            <div className='tabdiv' style={{fontFamily:'Rubik, sans-serif'}}>
              <ul style={{display:'flex',flexWrap:'wrap',justifyContent:'center',paddingTop:'14px',alignItems:'center',maxWidth:'1348px',paddingLeft:'20px',paddingRight:'20px'}}>
                <li style={{padding:'0 1px'}}>
                  <button onClick={() => {
                    setDashboardClassname('dashboard-selected');
                    setSearchClassname('search-btn');
                    setUploadClassname('upload-btn');
                  }} className={dashboardClassname}>
                    <HomeOutlined style={{paddingRight:'15px',fontSize:'12px'}}/>
                    Dashboard
                  </button>
                </li>
                <li style={{padding:'0 15px',fontSize:'12px',color:'rgb(108, 117, 125)'}}>
                  <EllipsisOutlined style={{paddingRight:'15px',fontSize:'16px'}}/>
                  RO List
                </li>
                <li style={{padding:'0 15px',fontSize:'12px',color:'rgb(108, 117, 125)'}}>
                  <SwitcherOutlined style={{paddingRight:'15px',fontSize:'14px'}}/>  
                  RO Palletization
                </li>
                <li style={{padding:'0 15px',fontSize:'12px',color:'rgb(108, 117, 125)'}}>
                  <DatabaseOutlined style={{paddingRight:'15px',fontSize:'14px'}}/>
                  RO QC
                </li>
                <li style={{padding:'0 15px',fontSize:'12px',color:'rgb(108, 117, 125)'}}>
                  <ShoppingCartOutlined style={{paddingRight:'15px',fontSize:'16px'}}/>
                  RO Putaway
                </li>
                <li style={{padding:'0 15px',fontSize:'12px',color:'rgb(108, 117, 125)'}}>
                  <SwitcherOutlined style={{paddingRight:'15px',fontSize:'14px'}}/>
                  RO Tracking
                </li>
                <li style={{padding:'0 15px',fontSize:'12px',color:'rgb(108, 117, 125)'}}>
                  <FileAddOutlined style={{paddingRight:'15px',fontSize:'14px'}}/>
                  Documents Upload
                </li>
                <li style={{padding:'0 1px 0 15px',fontSize:'12px',color:'rgb(108, 117, 125)'}}>
                  <SwitcherOutlined style={{paddingRight:'15px',fontSize:'14px'}}/>
                  RO Pallets
                </li>
                <li style={{padding:'0 0 0 15px'}}>
                  <button className={searchClassname} onClick={() => {
                    setSearchClassname('search-selected');
                    setDashboardClassname('dashboard-btn');
                    setUploadClassname('upload-btn');
                  }}>
                    <SearchOutlined style={{paddingRight:'15px',fontSize:'15px'}}/>
                    Search
                  </button>
                </li>
                <li style={{padding:'0'}}>
                  <button className={uploadClassname} onClick={() => {
                    setUploadClassname('upload-selected');
                    setSearchClassname('search-btn');
                    setDashboardClassname('dashboard-btn');
                  }}>
                    <FileAddOutlined style={{paddingRight:'14px'}}/>
                    RO Upload
                  </button>
                </li>
              </ul>
            </div>
            <div className='box-content' style={{padding:'15px',margin:'0 20px',borderTop:'2px solid rgb(232, 232, 232)',marginBottom:'15px'}}>
              <div className='box-header'>
              <button style={{backgroundColor:'#242058',color:'#fff',fontSize:'12px',padding:'0.35rem 0.45rem',borderRadius:'4px',marginLeft:'22px'}}>Create RO</button>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <div style={{marginTop:'14px'}}>
                  <Select
                    defaultValue="Please Select Warehouse"
                    style={{
                      width: 300,
                      marginRight:'15px',
                    }}
                    onChange={handleChangeClient}
                    options={
                      warehouseItems
                    }
                  />
                  <Select
                    defaultValue="Please Select Client"
                    style={{
                      width: 300,
                      marginRight:'15px',
                    }}
                    onSelect={handleChange}
                    onChange={(value) => {
                      if(value === 1000){
                        setIsDisabled(true);
                      } else {
                        setIsDisabled(false);
                      }
                    }}
                    options={
                      ClientData
                    }
                  />
                  <Input placeholder='RO or RO/PO#' style={{width:300,borderColor:'rgb(134, 164, 195)'}}/>
                </div>
                <div style={{marginTop:'14px'}}>
                  <Select 
                    defaultValue="Open-All"
                    style={{
                      width:300,
                      marginRight:'15px',
                      borderColor:'rgb(134, 164, 195)'
                    }}
                    onChange={handleChange}
                    options={
                      openItems
                    }
                    disabled={isDisabled}
                  />
                  <DatePicker onChange={onChange} style={{width:300,marginRight:'15px',borderColor:'rgb(134, 164, 195)'}}/>
                  <DatePicker onChange={onChange} style={{width:300,borderColor:'rgb(134, 164, 195)'}}/>
                </div>
              </div>
              <div style={{display:'flex',justifyContent:'center'}}>
                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',width:930,marginTop:'14px'}}>
                      <Button style={{backgroundColor:'#242058',color:'#fff',padding:'8px 10px',borderColor:'#242058',marginRight:'5px'}}>Search</Button>
                      <Button style={{backgroundColor:'#fab33a',color:'#fff',padding:'8.5px 10px',borderColor:'#fab33a'}}>
                        <DeleteOutlined />
                        CLEAR
                      </Button>
                  </div>
              </div>
              </div>
            <div className='box-body' style={{padding:'1.5rem 1.5rem 0 1.5rem'}}>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <div style={{paddingBottom:'10px'}}>
                  <Button style={{borderRadius:0,backgroundColor:'#242058',color:'#fff'}}>EXCEL</Button>
                </div>
                <div style={{paddingBottom:'10px'}}>
                  <label>Search: </label>
                  <Input placeholder='Search' style={{width:'170px',borderColor:'gray',borderRadius:'4px'}}/>
                </div>
              </div>
              <Table 
                columns={columns}
                rowKey={(record) => record.login}
                dataSource={data}
                pagination={tableParams.pagination}
                loading={loading}
                onChange={handleTableChange}
                scroll={{
                  x: 1500,
                  y: 300,
                }}
                style={{borderColor:'black'}}
                bordered
              />
            </div>
            </div>
          </Content>
        </Content>
      </Layout>
    </Layout>
  </>
  );
};
export default RO;