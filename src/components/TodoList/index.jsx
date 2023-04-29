// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import TodoItem from "../TodoItem/index.jsx";

import {Button, Card, DatePicker, Form, Input, List, Space} from 'antd';
import {PlusOutlined, RollbackOutlined} from "@ant-design/icons";


function Index() {
    const [todoItems, setTodoItems] = useState([])
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
    };
    const removeByIdx = (id) => {
        setTodoItems((prev) => {
            prev.filter((_, idx) => idx !== id)
        })
    }
    useEffect(() => {
        setInterval(() => {
            console.log("定时器触发了" + new Date())
            setTodoItems((prevState) => {
                return [...prevState]
            })
        }, 5 * 1000)
        console.log("组件加载时执行了useEffect的函数")
        return () => {
            console.log("组件卸载时执行了useEffect的返回函数")
        }
    }, [])

    const onFinish = (values) => {
        if (values['content'] !== undefined & values['date'] !== undefined) {
            setTodoItems((prevState) => {
                return [...prevState, values]
            })

            console.log("Insert a  Todo Item", values)
        } else {
            console.log("wrong data", values)
        }

    }
    return (
        <Card
            title="Todo List"
            bodyStyle={{background: "lightblue"}}
        >
            <Card>
                <Form
                    form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="content"
                    >
                        <Input placeholder={"Type your Plan ?"}/>
                    </Form.Item>

                    <Form.Item name="date">
                        <DatePicker
                            showTime={{format: 'HH:mm'}}
                            format={"YYYY-MM-DD HH:mm"}
                            placeholder={"deadline"}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                <PlusOutlined/>
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                <RollbackOutlined/>
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Card>


            <List
                itemLayout="horizontal"
                dataSource={todoItems}
                renderItem={(todoItem, idx) => (
                    <List.Item name="item-dev" style={{width: "100%"}}>
                        <TodoItem {...todoItem} key={idx} idx={idx} removeByIdx={removeByIdx}></TodoItem>
                    </List.Item>
                )}
            />
        </Card>

    );
}

export default Index;