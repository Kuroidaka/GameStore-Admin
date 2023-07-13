import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { ColumnGroup } from 'primereact/columngroup'
import { Row } from 'primereact/row'
import { Tag } from 'primereact/tag'
import { Skeleton } from 'primereact/skeleton'

const SkelentonTable = () => {

    const items = Array.from({ length: 5 }, (v, i) => i);

    const SkeletonBodyTemplate = () => {
        return <Skeleton></Skeleton>
      }

    const headerGroup = (
    <ColumnGroup>
        <Row>
            <Column header="ORDER ID" rowSpan={1} />
            <Column header="CUSTOMER" rowSpan={1} />
            <Column header="START TIME" rowSpan={1} />
            <Column header="END TIME" rowSpan={1} />
            <Column header="DISTRIBUTION" rowSpan={1} />
            <Column header="STATUS" rowSpan={1} />
            <Column header="DISCOUNT" rowSpan={1} />
            <Column header="PRICE" rowSpan={1} />

        </Row>
    </ColumnGroup>
    )

    return (
        <DataTable
            rows={8}
            scrollHeight="70vh"
            value={items}
            headerColumnGroup={headerGroup}
            tableStyle={{ minWidth: '50rem' }}
        >
        <Column body={SkeletonBodyTemplate} />
        <Column body={SkeletonBodyTemplate} />
        <Column body={SkeletonBodyTemplate} />
        <Column body={SkeletonBodyTemplate} />
        <Column body={SkeletonBodyTemplate} />
        <Column body={SkeletonBodyTemplate} />
        <Column body={SkeletonBodyTemplate} />
        <Column body={SkeletonBodyTemplate} />
      </DataTable>
      );
}
 
export default SkelentonTable;

