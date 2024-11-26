import { useEffect, useState } from 'react';
import '../css/signuup.css';
import {useForm} from "antd/es/form/Form";
import { Button } from "antd";
import Input from "antd/es/input/Input";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import {useNavigate} from 'react-router-dom';
import Header from "./Header";

const Signup = () => {
    const [form] = useForm();
    useEffect(() => {
        if(localStorage.getItem('user-info')){
            navigate('/');
        }
    },[]);
    const navigate = useNavigate();
    const [state, setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        userName: "",
        successMessage: null
    });
    function handleChange(e){
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    }
    async function handleSubmit() {
        let result = await fetch("https://fakestoreapi.com/users", {
            method: 'POST',
            body: JSON.stringify(state),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });  
        result = await result.json();
        localStorage.setItem('user-info', JSON.stringify(result));
        navigate('/');
    }

    return(
        <>
            <Header />
            <div>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    style={{marginLeft: '550px',maxWidth: '400px', marginTop: '40px', backgroundColor: 'white', borderRadius: '5px', padding: '2rem 2rem 1.5rem 2rem'}}
                >
                    <h1 style={{marginBottom: '10px'}}>Register</h1>
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
                        <Input value={state.userName} onChange={handleChange}/>
                    </FormItem>
                    <FormItem
                        type=""
                        label="Email"
                        name="email"
                        rules={[
                            { 
                                required: true,
                                message: 'Please input your Email'
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
                        <Input value={state.password} onChange={handleChange}/>
                    </FormItem>
                    <FormItem
                        label="Confirm Password"
                        name="password1"
                        rules={[
                            { 
                                required: true,
                                message: 'Please input your Password'
                            },
                        ]}
                    >
                        <Input value={state.password} onChange={handleChange}/>
                    </FormItem>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button style={{marginLeft: '150px',marginTop: '20px'}} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
}

export default Signup;