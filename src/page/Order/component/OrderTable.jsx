import React, { useContext, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Modal from '~/component/template/Modal.template'
import Button2 from '~/component/template/Button2.template'

import OrderDetail from './OrderDetail'
import CalendarInput from '~/component/template/DateInput.template'
import { formatDate, formatMoney } from '~/utils'
import OrderContext from '~/Context/Order.context'

const Table = (props) => {
  
  const [modal, setModal] = useState({ state: false, data: null })
  
  const { orders } = useContext(OrderContext)

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
      cell: row =><span className='font-bold'>
        { row["display_name"] }
      </span>
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
      header: 'Phone',
      cell: row =><span className='font-bold'>
        { row["phone"] }
      </span>
    },
    {
      name: 'START TIME',
      selector: 'rental_start_date',
      sortable: true,
      header: 'START TIME',
      cell: row =><p style={{color: '#42a445'}}>
        { row.rental_start_date !== null ? formatDate(row.rental_start_date) : formatDate(row.book_date) }
      </p>
    },
    {
      name: 'END TIME',
      selector: 'rental_end_date',
      sortable: true,
      header: 'END TIME',
      cell: row => <p style={{color: 'red '}}>
        { row.rental_end_date !== null ? formatDate(row.rental_end_date) : <span style={{color: '#4f5187',fontWeight: '700'}}>Waiting</span>}
        </p>
    },
    {
      name: 'DISTRIBUTION',
      selector: 'address',
      sortable: true,
      header: 'DISTRIBUTION',
      cell: row => <div>{row.address !== null && row.address !== 'null' ? <span>{row.address}</span> : <span style={{color: '#0077df'}}>Not Provided</span>}</div>
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
      cell: row => <p style={{ fontWeight: '900',fontSize: '1.6rem', color: '#0e890e'}}>{formatMoney(row.rental_price)}</p>
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
          value={orders}
          paginator
          rows={9}
          scrollHeight="70vh"
          tableStyle={{ minWidth: '50rem' }}
        >
        {columns.map((column) => {
            console.log("column",column)

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

