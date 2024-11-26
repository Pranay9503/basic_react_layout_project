import { Table, Modal, Input, Form, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../table/tableActions.js";
import { addProduct, editProduct, deleteProduct } from "../table/tableActions.js"; // Redux actions
import { useForm } from "antd/es/form/Form";
import swal from "sweetalert";
import Header from "./Header.js";

const UserDetails = () => {
  const [form] = useForm();
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const dispatch = useDispatch();
  const data = useSelector((state) => state.products);
  const users = useSelector(state => state.data)
  const usersData = users[0]
  const error = useSelector(state => state.error);
  console.log(usersData)

  const handleAdd = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    dispatch(fetchData());
  },[])

  const editProductHandler = (record) => {
    setIsEditing(true);
    form.setFieldsValue({
      'username': record.username,
      'email': record.email,
      'phone': record.phone,
      'id': record.id
    });
  };

  const deleteProductHandler = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this product?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        dispatch(deleteProduct(record.id)); 
        swal({
            title:"User deleted successfully",
            icon:"success",
            buttons:"Ok"
        });
      },
    });
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "1",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "2",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "3",
    },
    {
      title: "Action",
      key: "6",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => editProductHandler(record)}
              style={{ cursor: "pointer" }}
            />
            <DeleteOutlined
              onClick={() => deleteProductHandler(record)}
              style={{ color: "red", marginLeft: "12px", cursor: "pointer" }}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
    <Header />
    <div>
      <Button onClick={handleAdd} style={{ marginLeft: "940px", marginTop: "20px" }}>
        + Add
      </Button>
      
      <Table
        dataSource={usersData}
        columns={columns}
        style={{ marginTop: "20px", marginLeft: "470px", marginRight: "470px" }}
      />
      <Modal
        open={isEditing || isAdding}
        onOk={() => {
          form.submit();
        }}
        okText="Save"
        onCancel={() => {
          form.resetFields();
          if(isEditing){
            setIsEditing(false);
          } else {
            setIsAdding(false)
          }
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) => {
            if(isEditing) {
                console.log(values)
                dispatch(editProduct(values));
                setIsEditing(false);
                swal({
                    title:"User updated successfully",
                    icon:"success",
                    buttons:"Ok"
                });
            } else {
                dispatch(addProduct({...values, id: Math.random()}));
                setIsAdding(false);
                swal({
                    title: "User added successfully",
                    icon:"success",
                    buttons: "Ok" 
                })
            } 
            form.resetFields();          
          }}
        >
          <Form.Item label="Username" name="username" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="id" name="id" style={{display:"none"}}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
    </>
  );
};

export default UserDetails;
