import { useEffect } from "react";

const Clients = ({key,token}) => {
    console.log(key,token);
    useEffect(() => {
        fetch('http://82.197.95.187:6024/api/RO/GetClients?warehouseId=9001', {
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }).then(response => response.json())
            .then(data => console.log(data));
    });
}

export default Clients;