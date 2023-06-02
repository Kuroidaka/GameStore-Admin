
import React, { useEffect, useState } from "react";
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import { Tag } from 'primereact/tag'

const Modal = (props) => {

    const { modal, feature, children, title } = props

    const { close } = feature

    const { state:visible, data } = modal



    return (
        <div className="card flex justify-content-center">
            <Dialog header={title} visible={visible} onHide={close}
                style={{ width: '50vw' }} breakpoints={{ '960px': '75vw', '641px': '100vw' }}>
                {children}
            </Dialog>
        </div>
    )
}

export default Modal