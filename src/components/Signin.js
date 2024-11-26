import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useForm} from "antd/es/form/Form";
import { Button } from "antd";
import Input from "antd/es/input/Input";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import { LoginOutlined } from '@ant-design/icons';

const Signin = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    useEffect(() => {
        if(localStorage.getItem('user-token')){
            navigate('/warehouse');
        }
    },[]);
    const [state, setState] = useState({
        username: "",
        password: "",
        warehouseid: 9001
    });

    function handleChange(e) {
        const {id,value} = e.target;
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
        setError('');
    }

    async function handleSubmitClick() {
        if(state.username === 'raghava' && state.password === 'raghava'){
            let token = await fetch('http://82.197.95.187:6024/api/Auth/login', {
                method: 'POST',
                body: JSON.stringify(state),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            token = await token.json();
            localStorage.setItem('user-token',JSON.stringify(token));
            localStorage.setItem('username',JSON.stringify(state.username));
            navigate('/warehouse');
        } else {
            setError('Wrong Credentials');
        }
    }

    return (
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmitClick}
                    style={{marginLeft: '550px',maxWidth: '400px', marginTop: '100px', backgroundColor: 'white', borderRadius: '5px', padding: '2rem 2rem 1.5rem 2rem'}}
                >
                    <center>
                        <div>
                            <img src="https://static.vecteezy.com/system/resources/previews/012/506/636/original/a-warehouse-logistics-background-poster-vector.jpg" style={{width:'80px'}}/>
                            <h2 style={{marginBottom:'10px'}}>Login</h2>
                        </div>
                    </center>
                    <FormItem
                        label="Username"
                        name="username"
                        rules={[
                            { 
                                required: true,
                                message: 'Please input your Username'
                            },
                        ]}
                    >
                        <Input value={state.email} onChange={handleChange}/>
                    </FormItem>
                    <FormItem
                        label="Password"
                        name="password"
                        rules={[
                            { 
                                required: true,
                                message: 'Please input your Password'
                            },
                        ]}
                    >
                        <Input.Password value={state.password} onChange={handleChange}/>
                    </FormItem>
                    <span style={{color: 'red'}}>{error}</span>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width:'21rem'}}>
                            Login
                            <LoginOutlined />
                        </Button>
                    </Form.Item>
                </Form>
            </div>
    );
};

export default Signin;