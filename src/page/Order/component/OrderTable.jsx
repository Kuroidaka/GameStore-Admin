import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Modal from '~/component/template/Modal.template'
import Button2 from '~/component/template/Button2.template'

import OrderDetail from './OrderDetail'
import CalendarInput from '~/component/template/DateInput.template'

const Table = (props) => {
  const { order } = props

  const [modal, setModal] = useState({ state: false, data: null })
  

  const getOrderSeverity = (value) => {
    switch (value) {
      case 'DONE':
        return 'success'

      case 'WAITING':
        return 'info'

      case 'REJECT':
        return 'danger'

      default:
        return null
    }
  }

  const handleClickUpdate = (data) => {

    setModal(prev => ({...prev, data: data}))
    modalFeature.open()
  }

  const modalFeature = {
    open: () => {
      setModal(prev => ({ ...prev, state: true}))
    },
    close: () => {
      setModal(prev => ({ ...prev, state: false}))
    }
  }

  const columns = [
    
    {
      name: 'ORDER ID',
      selector: 'id',
      sortable: true,
      header: 'ORDER ID',
    },
    {
      name: 'CUSTOMER',
      selector: 'display_name',
      sortable: true,
      header: 'CUSTOMER',
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
      header: 'Phone',
    },
    {
      name: 'START TIME',
      selector: 'rental_start_date',
      sortable: true,
      header: 'START TIME',
      // cell: row => <CalendarInput value={row.rental_start_date}  dateFormat="dd/mm/yy" />
    },
    {
      name: 'END TIME',
      selector: 'rental_end_date',
      sortable: true,
      header: 'END TIME',
      cell: row => <CalendarInput value={row.rental_end_date}  dateFormat="dd/mm/yy" />
    },
    {
      name: 'DISTRIBUTION',
      selector: 'address',
      sortable: true,
      header: 'DISTRIBUTION',
      // cell: row => <TextInputTemplate value={row.address} />
    },
    {
      name: 'STATUS',
      selector: 'queue_status',
      sortable: true,
      header: 'STATUS',
      cell: row => <Tag value={row.queue_status} severity={getOrderSeverity(row.queue_status)} />,
    },
    {
      name: 'DISCOUNT',
      selector: 'discount_applied',
      sortable: true,
      header: 'DISCOUNT',
    },
    {
      name: 'PRICE',
      selector: 'rental_price',
      sortable: true,
      header: 'PRICE',
    },
    {
      name: 'OPTION',
      header: 'OPTION',
      cell: (row) => <Button2 title='UPDATE' data={row} link={true} onClick={() => handleClickUpdate(row)} />
    },
  ];
  

  return (
    <div className="card">

        <Modal modal={modal} feature={modalFeature} title='Order Detail'>
          <OrderDetail modal={modal} feature={modalFeature}></OrderDetail>          
        </Modal>
   
   
        <DataTable
          value={order}
          paginator
          rows={9}
          scrollHeight="70vh"
          tableStyle={{ minWidth: '50rem' }}
        >
        {columns.map((column) => {
            return (
              <Column
                key={column.name}
                field={column.selector}
                header={column.header}
                body={
                  column.cell ? column.cell : null 
                }
                sortable={column.sortable}
                
              />
            )})}
        </DataTable>
    </div>
  )
}

export default Table

