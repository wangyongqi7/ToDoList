import React, {useState} from 'react';
import {Button, Checkbox, Col, Modal, Row, Typography} from 'antd';
import {DeleteOutlined, ExclamationCircleFilled} from "@ant-design/icons";

const {confirm} = Modal;
const {Text} = Typography;

function Index(props) {
    const {date, content, removeByIdx, idx} = props
    const [done, setDone] = useState(false)

    const showDeleteConfirm = () => {
        confirm({
            title: '删除确认?',
            icon: <ExclamationCircleFilled/>,
            content: '确定要删除该项内容？\n Todo Item: ' + content,
            okText: '删除',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                removeByIdx(idx);
                console.log('OK', "remove", idx);
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const now = new Date()

    let dateDiff = date.toDate().getTime() - now.getTime();
    console.log(dateDiff, now, date.toDate())
    // 计算出相差天数
    let days = Math.floor(dateDiff / (24 * 3600 * 1000));

    // 计算出小时数
    let residue1 = dateDiff % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    let hours = Math.floor(residue1 / (3600 * 1000));

    // 计算相差分钟数
    let residue2 = residue1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
    let minutes = Math.floor(residue2 / (60 * 1000))

    return (
        <Row style={{width: "100%"}}>
            <Col span={3}>
                <Checkbox onChange={(e) => {
                    setDone(e.target.checked)
                }}></Checkbox>
            </Col>
            {done ?
                <>
                    <Col span={14}>
                        <Text delete> {content} </Text>
                    </Col>
                    <Col span={4}>
                        <Button>已完成</Button>
                    </Col>
                </> :
                <>
                    <Col span={12}>
                        <Text>{content} </Text>
                    </Col>
                    <Col span={6}>
                        {days >= 0 ?
                            <Button type={"primary"}>剩 {days}d {hours}h {minutes}m</Button> :
                            <Button type={"primary" } danger>已超时</Button>}
                    </Col>
                </>
            }

            <Col span={3}>
                <Button type={"primary"} danger={true} onClick={showDeleteConfirm}>
                    <DeleteOutlined/>
                </Button>
            </Col>
        </Row>

    );
}

export default Index;