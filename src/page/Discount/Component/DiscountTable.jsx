import React, { useContext, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Modal from '~/component/template/Modal.template'
import Button2 from '~/component/template/Button2.template'

// import OrderDetail from './OrderDetail'
import CalendarInput from '~/component/template/DateInput.template'
import { formatDate, formatMoney } from '~/utils'
import DiscountContext from '~/Context/Discount.context'
import { useNavigate } from 'react-router'
import config from '~/config'

const DiscountTable = (props) => {
  
  const [modal, setModal] = useState({ state: false, data: null })
  
  const { discount } = useContext(DiscountContext)

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
      name: 'DiSCOUNT NAME',
      selector: 'id',
      sortable: true,
      header: 'DISCOUNT NAME',
    },
    {
      name: 'DISCOUNTCODE',
      selector: 'discount_code',
      sortable: true,
      header: 'DISCOUNT CODE',
      cell: row => <div className=''>
        <span style={{
              backgroundColor: "#F7F7F8",
              padding: "5px 10px",
              borderRadius:" 10px",
              fontWeight: "bold"
        }}>{row.discount_code}</span>
        </div>
    },
    {
      name: 'DISCOUNT AMOUNT',
      selector: 'discount_amount',
      sortable: true,
      header: 'DISCOUNT AMOUNT',
      cell: row => <p>{row.discount_amount*100}%</p>
    },
    {
      name: 'STATUS',
      selector: 'expiration_date',
      sortable: true,
      header: 'STATUS',
      cell: row => <div>{new Date(row.expiration_date) > new Date()
        ? <div style={{color: "#2ECA73"}}>Active</div>
        : <div style={{color: "#ff724f"}}>Expired</div>
        }</div>
    },
    {
      name: 'CREATED AT',
      selector: 'created_at',
      sortable: true,
      header: 'CREATED AT',
      cell: row => <p>{formatDate(row.created_at)}</p>
    }
  ];
  

  return (
    <div className="card">
        <DataTable
          value={discount}
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
                body={column.cell ? column.cell : null}
                sortable={column.sortable}
              />
            )})}
        </DataTable>
    </div>
  )
}

export default DiscountTable

