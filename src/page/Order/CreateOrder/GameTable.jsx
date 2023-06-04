import React, { useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Tag } from 'primereact/tag'
import Button2 from '~/component/template/Button2.template'
import CalendarInput from '~/component/template/DateInput.template'

const GameTable = (props) => {
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
  const itemTemplate = (product) => {
    return (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
                <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={``} alt={product.name} />
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-2xl font-bold text-900">{product.game_name}</div>
                      
                        <div className="flex align-items-center gap-3">
                            <span className="flex align-items-center gap-2">
                                <i className="pi pi-tag"></i>
                                <span className="font-semibold">{product.category}</span>
                            </span>
                            {/* <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag> */}
                        </div>
                    </div>
                    <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        {/* <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

  return (
    <div className="card">

    </div>
  )
}



export default GameTable

