import React from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';

export default function BreadFunc(props) {

    const { } = props

    const items = [{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }];
    const home = { icon: 'pi pi-home', url: 'https://primereact.org' }

    return (
        <BreadCrumb model={items} home={home} />
    )
}