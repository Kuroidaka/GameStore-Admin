import { Modal } from "antd"
import { defaults } from "chart.js"
import { useState } from "react";

const NotifyConfirm = (props: any) => {
    const [open, setOpen] = useState(false);
    const {data} = props
    const showModal = (e: any) => {
        // console.log(e.target.)
        setOpen(true);
    };

    const handleOk = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };

    const handleCancel = (e: React.MouseEvent<HTMLElement>) => {
        console.log(e);
        setOpen(false);
    };
    return (
        <>
        <div onClick={showModal} className="item">
        <div className="content">
            <h5>{data.Notification_Content}</h5>
            <p>1 hour ago</p>
        </div>
    </div>
        <Modal
            title="Confirm Order"
            key={123}
            open={open}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            <p>{data.Notification_Content_Detail}</p>
        </Modal>
        </>
        
    )
}

export default NotifyConfirm