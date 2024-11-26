import React, { useEffect, useState } from "react";
import Dropdown from "antd/es/dropdown/dropdown";
import { DownOutlined } from '@ant-design/icons';
import Header from "./Header";
import { Space } from "antd";
import { useNavigate } from "react-router-dom";
import Products from "./Products";

const Warehouse = () => {
    const navigate = useNavigate();
    const [token,setToken] = useState();
    useEffect(() => {
        if(!localStorage.getItem('user-token')){
            navigate('/signin');
        } else {
            let tok = JSON.parse(localStorage.getItem('user-token'));
            setToken(tok.token);
        }
    },[]);

    const [warehouseLabel, setWarehouseLabel] = useState('Select Warehouse');
    const [warehouseData, setWarehouseData] = useState([]);
    let items;

    useEffect(() => {
        fetch('http://82.197.95.187:6024/api/Base/LoadWarehouse', {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        }).then(response => response.json())
        .then(data => setWarehouseData(data.data));
    },[]);
    items = [warehouseData.map((item) => {
        return ({
            label: item.name,
            key: `${item.uniqueid}`
        });
    })][0];

    const onClick = ({key}) => {
        items.forEach((item) => {
            if(item.key === key){
                setWarehouseLabel(item.label);
            }
        });

        fetch(`http://82.197.95.187:6024/api/RO/GetClients?warehouseId=${key}`, {
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => console.log(data));
        
        navigate('/RO')
    }

    return(
        <>
        <Header />
        {/* <Products /> */}
        <div style={{display: 'flex', alignItems:'center',justifyContent:'center',height:'60vh'}}>
            <div style={{padding:'6rem 8rem',borderRadius:'8px',minWidth:'450px',backgroundColor:'white'}}>
                <div style={{backgroundColor:'#595959',borderRadius:'4px'}}>
                    <Dropdown
                        menu={{
                            items,
                            onClick,
                        }}
                        trigger={['click']}
                    >
                        <a onClick={(e) => {e.preventDefault()}} style={{padding:'1.5rem 2rem'}}>
                            <Space style={{cursor: 'pointer',fontSize:'16px',fontFamily:'Arial',color:'#fff',display:'flex',justifyContent:'space-around'}}>
                                {warehouseLabel}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </div>
            </div>
        </div>
        </>
    );
}

export default Warehouse;