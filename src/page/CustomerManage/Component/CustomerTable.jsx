import React, { useContext, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Modal from '~/component/template/Modal.template'
import Button2 from '~/component/template/Button2.template'

// import OrderDetail from './OrderDetail'
import CalendarInput from '~/component/template/DateInput.template'
import { formatDate, formatMoney } from '~/utils'
import CustomerContext from '~/Context/Customer.context'
import { useNavigate } from 'react-router'
import config from '~/config'

const CustomerTable = (props) => {
  
  const [modal, setModal] = useState({ state: false, data: null })
  
  const { customer } = useContext(CustomerContext)

  const navigate = useNavigate()

  const { customerManage } = config.adminRoutePath

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
      navigate(`${customerManage}/${data.id}`)

    // setModal(prev => ({...prev, data: data}))
    // modalFeature.open()
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
      name: 'CUSTOMER ID',
      selector: 'id',
      sortable: true,
      header: 'CUSTOMER ID',
    },
    {
      name: 'USERNAME',
      selector: 'username',
      sortable: true,
      header: 'USERNAME',
    },
    {
      name: 'DISPLAY NAME',
      selector: 'display_name',
      sortable: true,
      header: 'DISPLAY NAME',
    },
    {
      name: 'EMAIL',
      selector: 'email',
      sortable: true,
      header: 'EMAIL',
    },
    {
      name: 'Phone',
      selector: 'phone',
      sortable: true,
      header: 'Phone',
    },
    {
      name: 'DISTRIBUTION',
      selector: 'address',
      sortable: true,
      header: 'DISTRIBUTION',
      // cell: row => <TextInputTemplate value={row.address} />
    },
    {
      name: 'CREATED AT',
      selector: 'created_at',
      sortable: true,
      header: 'CREATED AT',
      cell: row => <p>{formatDate(row.created_at)}</p>
    },
    {
      name: 'UPDATED AT',
      selector: 'updated_at',
      sortable: true,
      header: 'UPDATED AT',
      cell: row => <p>{formatDate(row.updated_at)}</p>
    },
    {
      name: 'TOTAL PURCHASE',
      selector: 'totalPrice',
      sortable: true,
      header: 'TOTAL PURCHASE',
      cell: row => <p style={{ fontWeight: '900',fontSize: '1.6rem', color: '#0e890e'}}>{formatMoney(row.totalPrice)}</p>
    },
    {
      name: 'TOTAL POINT',
      selector: 'total_points',
      sortable: true,
      header: 'TOTAL POINT',
    },
    {
      name: 'SUBSCRIPTION STATUS',
      selector: 'subscription_status',
      sortable: true,
      header: 'SUBSCRIPTION STATUS',
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
          {/* <OrderDetail modal={modal} feature={modalFeature}></OrderDetail>           */}
        </Modal>
   
   
        <DataTable
          value={customer}
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

export default CustomerTable

