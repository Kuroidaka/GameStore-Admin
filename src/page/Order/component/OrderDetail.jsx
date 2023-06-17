import React, { useContext, useEffect, useState } from 'react'
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
import OrderContext from '~/Context/Order.context';

const OrderDetail = (props) => {
  const { modal, feature } = props

  const { data } = modal

  const { close } = feature

  const [currentData, setCurrentData] = useState(data);

  const { orders, setOrders,
    load,
    setLoad } = useContext(OrderContext)

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

  const [status, setStatus] = useState()


  const RentInput = [
    {
      status: "Start Date",
      element: <CalendarInput name="rental_start_date" value={currentData.rental_start_date} onInput={(e) => handleChangeValue(e)} dateFormat="dd/mm/yy" />
    },{
      status: "End Date",
      element: <CalendarInput name="rental_end_date" value={currentData.rental_end_date} onInput={(e) => handleChangeValue(e)}  dateFormat="dd/mm/yy" />
    }
    
    
  ]

  const handleChangeValue = (e) => {

    const {name, value} = e.target
    console.log(name)

    setCurrentData({...currentData, [name]: value})
  

  }

  const handleClickCancel = () => {
    close()
  }

  const handleClickUpdate = () => {
    const { phone, rental_start_date, rental_end_date, address } = currentData

    const rentalStartDate = new Date(rental_start_date);
    const rentalEndDate = new Date(rental_end_date);

    rentalStartDate.setDate(rentalStartDate.getDate() + 1);
    rentalEndDate.setDate(rentalEndDate.getDate() + 1);

    const order = {
      address: address ? address : data.address,
      rental_start_date: rentalStartDate.toISOString().split('T')[0],
      rental_end_date : rentalEndDate.toISOString().split('T')[0]
    }

    const customer = {
      phone: phone ? phone : data.phone,
      customerID : data.customerID
    }


    const query = {
      status : status ? status.name : data.queue_status,
      id: data.id
    }

    console.log(currentData)
    
    orderApi.editOrder({order, customer}, query)
    .then((res) => {
      close()
      setLoad(true)
      orderApi.getOrderList()
      .then(({data})=> {
        console.log(" res ", data)
        setOrders(data)
        setLoad(false)
        
      })
    })
  }

  return (
    <ModalContainer>
    
      <ModalBody>
      <div className="flex flex-wrap gap-4 align-items-center justify-content-around">
        
        <div className='w-full text-center'>
          <ToggleSelect
            data={[ { name: 'WAITING' }, { name: 'DECLINE' }, { name: 'DONE' }]}
            defaultValueIndex={getDefaultValueStatus(data.queue_status)}
            value = {status}
            setValue = {setStatus}
          />
        </div>
        
        <RentDate className='flex'>
          <Timeline value={RentInput} align="alternate" 
            content={(item) => item.status}
            opposite={(item) => item.element}
            />
        </RentDate>
        <div>
          <TextInputTemplate label="Phone" name='phone' value={data.phone} onInput={handleChangeValue}/>
          <TextInputTemplate label="Address" name='address' value={data.address ?? 'Not Provided'} onInput={handleChangeValue}/>
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
        <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`http://localhost:8000/file/image/${item.filepath}`} alt={item.game_name} />
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