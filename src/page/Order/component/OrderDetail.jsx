import React, { useEffect, useState } from 'react'
import Button2 from '~/component/template/Button2.template'
import InputSelect from '~/component/template/InputSelect.template'
import styled from 'styled-components/macro'
import { OrderList } from 'primereact/orderlist';
import { productApi } from '~/api/product.api';
import ToggleSelect from '~/component/template/ToggleSelect.template';
import CalendarInput from '~/component/template/DateInput.template';
import { ProgressSpinner } from 'primereact/progressspinner';
import { orderApi } from '~/api/order.api';
import { Timeline } from 'primereact/timeline';
import TextInputTemplate from '~/component/template/TextInput.template';

const OrderDetail = (props) => {
  const { modal, feature } = props

  const { data } = modal

  const { close } = feature

  const [currentData, setCurrentData] = useState({});



  const getDefaultValueStatus = (data) => {

    switch (data) {
      case 'DONE':
        return 2

      case 'WAITING':
        return 0

      case 'DECLINE':
        return 1

      default:
        return null
    }
  }

  const RentInput = [
    {
      status: "Start Date",
      element: <CalendarInput value={data.rental_start_date} dateFormat="dd/mm/yy" />
    },{
      status: "End Date",
      element: <CalendarInput value={data.rental_end_date} dateFormat="dd/mm/yy" />
    }
    
    
  ]

  const handleChangeValue = (e) => {

    const {name, value} = e.target
    setCurrentData({...currentData, [name]: value})
  }

  const handleClickCancel = () => {
    close()
  }

  const handleClickUpdate = () => {

  }

  return (
    <ModalContainer>
    
      <ModalBody>
      <div className="flex flex-wrap gap-4 align-items-center justify-content-around">
        
        <div className='w-full text-center'>
          <ToggleSelect  data={[ { name: 'WAITING' }, { name: 'REJECT' }, { name: 'DONE' }]} defaultValueIndex={getDefaultValueStatus(data.queue_status)} />
        </div>
        
        <RentDate className='flex'>
          <Timeline value={RentInput} align="alternate" 
            content={(item) => item.status}
            opposite={(item) => item.element}
            />
        </RentDate>
        <div>
          <TextInputTemplate label="Customer" value={data.username} onInput={handleChangeValue}/>
          <TextInputTemplate label="Address" value={data.address ?? 'Not Provided'} onInput={handleChangeValue}/>
        </div>
      </div>

      <OrderListDetail orderId={data.id}/> 


      </ModalBody>

      <ButtonAction className="py-4">
        <Button2 title="Cancel" danger="true" onClick={handleClickCancel} />
        <Button2 title="Update" success="true" className="pr-3" onClick={handleClickUpdate}/>
      </ButtonAction>
    </ModalContainer>
  )
}

export default OrderDetail



const OrderListDetail = (props) => {

  const { orderId } = props

  const [products, setProducts] = useState([]);
  const [load, setLoad] = useState(true)

  const getProductsWithOrders = () => {

    return orderApi.getOrderDetail(orderId)

  }

  useEffect(() => {
    setLoad(true)
    getProductsWithOrders()
    .then(({data}) => {
      const { orderDetail } = data 
      setProducts(orderDetail)
      setLoad(false)
    })
    .catch(err => {
      console.log(err)
      setLoad(false)
    })
  }, []);

  const itemTemplate = (item) => {
      return (
        <div className="flex flex-wrap p-2 align-items-center gap-3">
        <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={item.images ?? ''} alt={item.game_name} />
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
            <span className="font-bold">{item.game_name}</span>
            <div className="flex align-items-center gap-2">
                <i className="pi pi-tag text-sm"></i>
                <span>{item.developer}</span>
            </div>
        </div>
        <span className="font-bold text-900">${item.price}</span>
    </div>
      );
  };
  
  return (
    <div>
      {load ? 
      <div className='text-center py-5' >
        <ProgressSpinner style={{width: '50px', height: '50px'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
      </div>
      : 
      <div className="py-5">
        <OrderList value={products} onChange={(e) => setProducts(e.value)} itemTemplate={itemTemplate} header="Products"></OrderList>
      </div>
      }

    </div>

  )
}


const ModalContainer = styled.div`
.p-orderlist-controls {
  display: none!important;
}
`

const RentDate = styled.div`

`

const ModalBody = styled.div`

`

const ButtonAction = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
gap: 10px;
`

const InputComponentStyle = styled.div `


`