import Header from "./Header";
import { Table, Modal, Input, Form, Button} from "antd";
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";

const Products = () => {
    const [form] = useForm();
    const [isAdding, setIsAdding] = useState(false);
    const[isEditing, setIsEditing] = useState(false);
    const[addProduct, setAddProduct] = useState({
        name: '',
        brand:'',
        color:'',
        size:'',
        price:'',
    });
    const[editingProduct, setEditingProduct] = useState({});
    const [data, setData]=useState([
        {
            name:'Iphone 15 pro max',
            brand:'Apple',
            color:'Blue',
            size:'256GB',
            price:`$${1699}`,
            id:Math.random(),
            key:'1'
        },{
            name:'Samsung S24 Ultra',
            brand:'Samsung',
            color:'Black',
            size:'256GB',
            price:`$${1350}`,
            id:Math.random(),
            key:'2'
        },{
            name:'Iphone 15',
            brand:'Apple',
            color:'Blue',
            size:'128GB',
            price:`$${899}`,
            id:Math.random(),
            key:'3'
        },{
            name:'Samsung S24',
            brand:'Samsung',
            color:'yellow',
            size:'128GB',
            price:`$${719}`,
            id:Math.random(),
            key:'4'
        },{
            name:'Iphone 15 pro',
            brand:'Apple',
            color:'gray',
            size:'256GB',
            price:`$${1499}`,
            id:Math.random(),
            key:'5'
        }
    ]);

    const columns = [
        {
            title:'Products',
            dataIndex:'name',
            key:'1',
        },{
            title:'Brand',
            dataIndex:'brand',
            key:'2'
        },{
            title:'Color',
            dataIndex:'color',
            key:'3'
        },{
            title:'Size',
            dataIndex:'size',
            key:'4'
        },{
            title:'Price',
            dataIndex:'price',
            key:'5'
        },{
            title:'Action',
            key:'6',
            render: (record) => {
                return (
                    <>
                        <EditOutlined onClick={() => {editProduct(record)}} style={{cursor: 'pointer'}}/>
                        <DeleteOutlined onClick={() => {deleteProduct(record)}} style={{color: 'red',marginLeft: '12px', cursor: 'pointer'}}/>
                    </>
                );
            }
        }
    ];

    const editProduct = (record) => {
        setIsEditing(true);
        setEditingProduct({...record});
        form.setFieldsValue({
            'Name': record.name,
            'Brand': record.brand,
            'Color': record.color,
            'Size': record.size,
            'Price': record.price
        });
    }

    const deleteProduct = (record) => {
        Modal.confirm({
            title: 'Are you sure, you want to delete this product',
            okText: "yes",
            okType: "danger",
            onOk: () => {
                setData((pre) => {
                    return pre.filter((product) => {
                        return product.id !== record.id;
                    });
                });
            }
        });
    }

    const resetEditing = () => {
        setIsEditing(false);
        setEditingProduct({});
    }

    const handleAdd = () => {
        setIsAdding(true);
    }

    return (
        <>
            <Header />
            <div>
                <Button onClick={() => {handleAdd()}} style={{marginLeft: '1000px',marginTop: '20px', marginBottom: 0}}>+ Add</Button>
                <Table
                    dataSource={data}
                    columns={columns}
                    style={{marginTop: '20px',marginLeft: '400px',marginRight: '400px'}}
                >
                </Table>
                <Modal
                    title="Edit Product"
                    open={isEditing}
                    onOk={() => {
                        form.submit();
                    }}
                    okText="Save"
                    onCancel={() => {
                        resetEditing();
                    }}
                >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={() => {
                        setData(pre => {
                            return pre.map((product) => {
                                if(product.id === editingProduct.id){
                                    return editingProduct;
                                } else {
                                    return product;
                                }
                            });
                        })
                        form.resetFields();
                        resetEditing();
                    }}
                >
                    <FormItem 
                        label="Name"
                        name="Name"
                        rules={[
                            { 
                                required: true
                            },
                        ]}
                    >
                    <Input name="Name" onChange={(e) => {
                        setEditingProduct(pre => {
                            return {...pre,name: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Brand"
                        name="Brand"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input name="Brand" onChange={(e) => {
                        setEditingProduct(pre => {
                            return {...pre,brand: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Color"
                        name="Color"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input name="Color" onChange={(e) => {
                        setEditingProduct(pre => {
                            return {...pre,color: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Size"
                        name="Size"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input name="Size" onChange={(e) => {
                        setEditingProduct(pre => {
                            return {...pre,size: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Price"
                        name="Price"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input type="number" value={editingProduct.price} onChange={(e) => {
                        setEditingProduct(pre => {
                            return {...pre,price: e.target.value};
                        });
                    }}/>
                    </FormItem>
                </Form>
                </Modal>
                <Modal
                    title="Add Product"
                    open={isAdding}
                    onOk={() => {
                        form.submit();
                    }}
                    okText="Add"
                    onCancel={() => {
                        setIsAdding(false);
                    }}
                >
                <Form
                onFinish={() => {
                    setData((pre) => {
                        return [...pre, addProduct];
                    });
                    form.resetFields();
                    setIsAdding(false);
                }}
                    form={form}
                    layout="vertical"
                >
                    <FormItem 
                        label="Name"
                        name="Name"
                        rules={[
                            { 
                                required: true
                            },
                        ]}
                    >
                    <Input onChange={(e) => {
                        setAddProduct(pre => {
                            return {...pre,name: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Brand"
                        name="Brand"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input onChange={(e) => {
                        setAddProduct(pre => {
                            return {...pre,brand: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Color"
                        name="Color"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input onChange={(e) => {
                        setAddProduct(pre => {
                            return {...pre,color: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Size"
                        name="Size"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input onChange={(e) => {
                        setAddProduct(pre => {
                            return {...pre,size: e.target.value};
                        });
                    }}/>
                    </FormItem>
                    <FormItem 
                        label="Price"
                        name="Price"
                        rules={[
                            { 
                                required: true,
                            },
                        ]}
                    >
                    <Input type="number" onChange={(e) => {
                        setAddProduct(pre => {
                            return {...pre,price: e.target.value,id: Math.random()};
                        });
                    }}/>
                    </FormItem>
                </Form>   
                </Modal>
            </div>
        </>
    );
};

export default Products;