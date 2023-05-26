import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Tag } from 'primereact/tag';

const Table = () => {
    const [sales] = useState([
        {
          id: 1,
          admin_id: 1,
          rental_start_date: '2023-01-01',
          rental_end_date: '2023-01-07',
          discount_applied: 0.00,
          rental_price: 100.00,
          gameName: 1,
          address: '123 Example Street',
          queue_status: 'WAITING'
        },
        {
          id: 2,
          admin_id: 2,
          rental_start_date: '2023-02-01',
          rental_end_date: '2023-02-07',
          discount_applied: 0.10,
          rental_price: 80.00,
          gameName: 2,
          address: '456 Sample Avenue',
          queue_status: 'DONE'
        },
        {
          id: 3,
          admin_id: 1,
          rental_start_date: '2023-03-01',
          rental_end_date: '2023-03-07',
          discount_applied: 0.05,
          rental_price: 120.00,
          gameName: 3,
          address: '789 Test Road',
          queue_status: 'WAITING'
        },
        {
          id: 4,
          admin_id: 2,
          rental_start_date: '2023-04-01',
          rental_end_date: '2023-04-07',
          discount_applied: 0.00,
          rental_price: 90.00,
          gameName: 1,
          address: '321 Sample Lane',
          queue_status: 'DONE'
        },
        {
          id: 5,
          admin_id: 3,
          rental_start_date: '2023-05-01',
          rental_end_date: '2023-05-07',
          discount_applied: 0.15,
          rental_price: 150.00,
          gameName: 2,
          address: '654 Example Court',
          queue_status: 'WAITING'
        },
        {
          id: 6,
          admin_id: 3,
          rental_start_date: '2023-06-01',
          rental_end_date: '2023-06-07',
          discount_applied: 0.10,
          rental_price: 80.00,
          gameName: 3,
          address: '987 Test Avenue',
          queue_status: 'DONE'
        },
        {
          id: 7,
          admin_id: 1,
          rental_start_date: '2023-07-01',
          rental_end_date: '2023-07-07',
          discount_applied: 0.00,
          rental_price: 100.00,
          gameName: 1,
          address: '456 Example Street',
          queue_status: 'WAITING'
        },
        {
          id: 8,
          admin_id: 2,
          rental_start_date: '2023-08-01',
          rental_end_date: '2023-08-07',
          discount_applied: 0.10,
          rental_price: 80.00,
          gameName: 2,
          address: '789 Sample Avenue',
          queue_status: 'DONE'
        },
        {
          id: 9,
          admin_id: 3,
          rental_start_date: '2023-09-01',
          rental_end_date: '2023-09-07',
          discount_applied: 0.05,
          rental_price: 120.00,
          gameName: 3,
          address: '123 Test Road',
          queue_status: 'WAITING'
        },
        {
          id: 10,
          admin_id: 1,
          rental_start_date: '2023-10-01',
          rental_end_date: '2023-10-07',
          discount_applied: 0.00,
          rental_price: 90.00,
          gameName: 1,
          address: '321 Sample Lane',
          queue_status: 'REJECT'
        },
        {
            id: 6,
            admin_id: 3,
            rental_start_date: '2023-06-01',
            rental_end_date: '2023-06-07',
            discount_applied: 0.10,
            rental_price: 80.00,
            gameName: 3,
            address: '987 Test Avenue',
            queue_status: 'DONE'
          },
          {
            id: 7,
            admin_id: 1,
            rental_start_date: '2023-07-01',
            rental_end_date: '2023-07-07',
            discount_applied: 0.00,
            rental_price: 100.00,
            gameName: 1,
            address: '456 Example Street',
            queue_status: 'WAITING'
          },
          {
            id: 8,
            admin_id: 2,
            rental_start_date: '2023-08-01',
            rental_end_date: '2023-08-07',
            discount_applied: 0.10,
            rental_price: 80.00,
            gameName: 2,
            address: '789 Sample Avenue',
            queue_status: 'DONE'
          },
          {
            id: 9,
            admin_id: 3,
            rental_start_date: '2023-09-01',
            rental_end_date: '2023-09-07',
            discount_applied: 0.05,
            rental_price: 120.00,
            gameName: 3,
            address: '123 Test Road',
            queue_status: 'WAITING'
          },
          {
            id: 10,
            admin_id: 1,
            rental_start_date: '2023-10-01',
            rental_end_date: '2023-10-07',
            discount_applied: 0.00,
            rental_price: 90.00,
            gameName: 1,
            address: '321 Sample Lane',
            queue_status: 'REJECT'
          },
          {
            id: 6,
            admin_id: 3,
            rental_start_date: '2023-06-01',
            rental_end_date: '2023-06-07',
            discount_applied: 0.10,
            rental_price: 80.00,
            gameName: 3,
            address: '987 Test Avenue',
            queue_status: 'DONE'
          },
          {
            id: 7,
            admin_id: 1,
            rental_start_date: '2023-07-01',
            rental_end_date: '2023-07-07',
            discount_applied: 0.00,
            rental_price: 100.00,
            gameName: 1,
            address: '456 Example Street',
            queue_status: 'WAITING'
          },
          {
            id: 8,
            admin_id: 2,
            rental_start_date: '2023-08-01',
            rental_end_date: '2023-08-07',
            discount_applied: 0.10,
            rental_price: 80.00,
            gameName: 2,
            address: '789 Sample Avenue',
            queue_status: 'DONE'
          },
          {
            id: 9,
            admin_id: 3,
            rental_start_date: '2023-09-01',
            rental_end_date: '2023-09-07',
            discount_applied: 0.05,
            rental_price: 120.00,
            gameName: 3,
            address: '123 Test Road',
            queue_status: 'WAITING'
          },
          {
            id: 10,
            admin_id: 1,
            rental_start_date: '2023-10-01',
            rental_end_date: '2023-10-07',
            discount_applied: 0.00,
            rental_price: 90.00,
            gameName: 1,
            address: '321 Sample Lane',
            queue_status: 'REJECT'
          },
          {
            id: 6,
            admin_id: 3,
            rental_start_date: '2023-06-01',
            rental_end_date: '2023-06-07',
            discount_applied: 0.10,
            rental_price: 80.00,
            gameName: 3,
            address: '987 Test Avenue',
            queue_status: 'DONE'
          },
          {
            id: 7,
            admin_id: 1,
            rental_start_date: '2023-07-01',
            rental_end_date: '2023-07-07',
            discount_applied: 0.00,
            rental_price: 100.00,
            gameName: 1,
            address: '456 Example Street',
            queue_status: 'WAITING'
          },
          {
            id: 8,
            admin_id: 2,
            rental_start_date: '2023-08-01',
            rental_end_date: '2023-08-07',
            discount_applied: 0.10,
            rental_price: 80.00,
            gameName: 2,
            address: '789 Sample Avenue',
            queue_status: 'DONE'
          },
          {
            id: 9,
            admin_id: 3,
            rental_start_date: '2023-09-01',
            rental_end_date: '2023-09-07',
            discount_applied: 0.05,
            rental_price: 120.00,
            gameName: 3,
            address: '123 Test Road',
            queue_status: 'WAITING'
          },
          {
            id: 10,
            admin_id: 1,
            rental_start_date: '2023-10-01',
            rental_end_date: '2023-10-07',
            discount_applied: 0.00,
            rental_price: 90.00,
            gameName: 1,
            address: '321 Sample Lane',
            queue_status: 'REJECT'
          }
      ])

    const idBodyTemplate = (rowData) => {
        return `${rowData.id}`;
    };

    const usernameBodyTemplate = (rowData) => {
        return `${rowData.admin_id}%`;
    };

    const rentalStartBodyTemplate = (rowData) => {
        return `${rowData.rental_start_date}`;
    };

    const discountAppliedBodyTemplate = (rowData) => {
        return `${rowData.discount_applied}`;
    };

    const gameNameTemplate = (rowData) => {
        return `${rowData.gameName}`;
    };

    const rentalPriceBodyTemplate = (rowData) => {
        return `${rowData.rental_price}`;
    };

    const rentalEndBodyTemplate = (rowData) => {
        return `${rowData.rental_end_date}`;
    };

    const addressBodyTemplate = (rowData) => {
        return `${rowData.address}`;
    };

    const getOrderSeverity = (value) => {
        switch (value) {
            case 'DONE':
                return 'success';

            case 'WAITING':
                return 'info';

            case 'REJECT':
                return 'danger';

            default:
                return null;
        }
    }

    const queueStatusBodyTemplate = (rowData) => {
        return <Tag value={rowData.queue_status} severity={getOrderSeverity(rowData.queue_status)}></Tag>;
    };

    const headerGroup = (
        <ColumnGroup>
            <Row>
                <Column header="ID" rowSpan={1} sortable field="id" />
                {/* <Column header="CREATED" rowSpan={1} sortable field="rental_start_date" /> */}
                <Column header="CUSTOMER" rowSpan={1} sortable field="admin_id" />
                <Column header="PRODUCT" rowSpan={1} sortable field="gameName" />
                <Column header="START TIME" rowSpan={1} sortable field="rental_start_date" />
                <Column header="END TIME" rowSpan={1} sortable field="rental_end_date" />
                <Column header="DISTRIBUTION" rowSpan={1} sortable field="address" />
                <Column header="STATUS" rowSpan={1} sortable field="queue_status" />
                <Column header="DISCOUNT" rowSpan={1} sortable field="discount_applied" />
                <Column header="PRICE" rowSpan={1} sortable field="rental_price" />
            </Row>
        </ColumnGroup>
    );


    return (
        <div className="card">
            <DataTable value={sales} scrollable scrollHeight="70vh" headerColumnGroup={headerGroup} tableStyle={{ minWidth: '50rem' }}>
                <Column field="ID" body={idBodyTemplate}/>
                <Column field="CUSTOMER" body={usernameBodyTemplate} />
                <Column field="PRODUCT" body={gameNameTemplate} />
                <Column header="START TIME"  body={rentalStartBodyTemplate}/>
                <Column header="END TIME" body={rentalEndBodyTemplate} />
                <Column header="DISTRIBUTION" body={addressBodyTemplate} />
                <Column header="STATUS" body={queueStatusBodyTemplate} />
                <Column header="DISCOUNT" body={discountAppliedBodyTemplate} />
                <Column header="PRICE"  body={rentalPriceBodyTemplate}/>
            </DataTable>
        </div>
    );
}

export default Table;