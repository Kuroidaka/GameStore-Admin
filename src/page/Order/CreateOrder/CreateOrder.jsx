import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components/macro'
import { API_BASE_URL } from '~/config/api'
import SearchBar from '~/component/template/Search.template'
import { icon } from '~/assert/icon/icon'
import config from '~/config'
import TextInputTemplate from '~/component/template/TextInput.template'
import GameTable from './GameTable'
import ProductService from '~/service/product.service';
import { OrderList } from 'primereact/orderlist';
import { Button } from 'primereact/button';
import { customer } from '~/api/customer.api'
import { orderApi } from '~/api/order.api'

export const GameOrderContext = createContext(null) 

const CreateOrder = () => {

  const { createOrder } = config.adminRoutePath

  const [customerInfo, setCustomerInfo] = useState({})
  
  const [searchResult, setSearchResult] = useState([]);

  const [ product ] = ProductService()

  const [gameOrder, setGameOrder] = useState([])

  const [loading, setLoading] = useState({
    submit: false,
    phoneFind: false
  });


  const handleSubmitForm = (e) => {
    e.preventDefault()
    setLoading(prev => ({...prev, submit: true}));

    const updateCustomer = (callback) => {
      customer.update({
        display_name: customerInfo.display_name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address
      }, customerInfo.id).then((res) => {
        const { data, status } = res
        if(status === 200){
          console.log(data)
          callback && callback()
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    const createCustomer = (callback) => {
      customer.create({
        display_name: customerInfo.display_name,
        email: customerInfo.email,
        phone: customerInfo.phone,
        address: customerInfo.address
      }).then((res) => {
        const { data, status } = res
        if(status === 200){
          setCustomerInfo(prev => ({...prev, id: data.data.id}))
          callback && callback()
        }
      }).catch((err) => {
        console.log(err)
      })
    }

    const bookOrder = () => {
      const newData = {
        book_date : new Date(),
        customerID : customerInfo.id,
        queue_data : customerInfo.note,
        rent_duration: customerInfo["rent_duration"],
        gameList: gameOrder.map(item => item.id),
        address: customerInfo.address
      }
      
      orderApi.book(newData)
      .then(res => {
        console.log(res)
        setLoading(prev => ({...prev, submit: false}));
      })
      .catch(err => {
        console.log(err)
      })

    }

    if(customerInfo.having){
      updateCustomer(bookOrder)
    }else {
      createCustomer(bookOrder)
    }

    const data = {
      customerInfo: customerInfo,
      gameList: gameOrder
    }

  }

  const searchFeature = {
    searchResult,
    setSearchResult
  }

  const gameOrderFeature = {
    gameOrder,
    setGameOrder
  }

  const pickGame = (product) => {
    if(gameOrder.find(item => item.id === product.id)){
      return alert("Game already in order")
    } 
    else {
      const newArray = [...gameOrder, product];
      setGameOrder(newArray);
      setSearchResult([])
    }
  };
  const deleteGame = (id) => {
    const newArray = gameOrder.filter(item => item.id !== id)
    setGameOrder(newArray)
    
  }

  const contextValue = {
    handleChooseGame: (data) => pickGame(data),
    handleDeleteGame: (id) => deleteGame(id),
    gameOrder: gameOrder 
  }

  const onInput = (e) => {
    const name = e.target.getAttribute('aria-describedby')

    setCustomerInfo(prev => ({...prev, [name]: e.target.value}))
  }

  const handlePhoneFind = () => {
    setLoading(prev => ({...prev, phoneFind: true}));
    setCustomerInfo({})
    customer.getInfo({
      name: 'phone',
      value: customerInfo["phone"]
    }).then((res) => {
      const { data, status } = res
      const newData = {
        address: data.address,
        display_name: data.display_name,
        email: data.email,
        id: data.id
      }
      if(status === 404){
        setCustomerInfo(prev => ({...prev, having: false}))
      }
      else if(status === 200) {
        
        setCustomerInfo(prev => ({...prev, ...newData, having: true}))
      }

      setLoading(prev => ({...prev, phoneFind: false}));
    }).catch(err => {
      console.log(err)
      setLoading(prev => ({...prev, phoneFind: true}));
    })
  }

  console.log(customerInfo)

  return (

    <GameOrderContext.Provider value={contextValue}>
      <Container>
          <Header>
              <div className="">
                <div className="title">Create New Order</div>
                <div className="description">Managing order's state</div>
              </div>

              <Button label="Submit" className='h-4rem' loading={loading.submit} onClick={handleSubmitForm} />
          </Header>
          
           {/* Search Function */}
           <div className="card w-8 h-auto my-3 mx-8 p-3 border-round relative"
                  style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', maxHeight: '44rem'}}>
                <SearchBar searchFeature={searchFeature} className='justify-content-center w-full' /> 
                {searchResult.length > 0 && 
                  <div className=" game-result my-6 overflow-y-scroll absolute z-5 w-full border-round" style={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", top: '29px'}}>
                    <GameTable product={searchResult} gameOrderFeature={gameOrderFeature}/>
                  </div>
                }
                
              </div>

          <div className="content px-5 grid justify-content-around" >

              {/* customer information */}
              <div className="col-3 card w-5 my-3  p-3 border-round" 
                  style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                  <h1 className="text-3xl mx-3 font-bold pt-3 my-0 pb-4 ">Customer information</h1>

                  <div className="card p-3 m-3 grid flex-row justify-content-around">
                      <TextInputTemplate name='phone' label="Phone Number" onInput={onInput} value={customerInfo.phone}  className="col-8"/>
                      <Button label="Find" className='h-4rem align-self-end m-6 col 3' loading={loading.phoneFind} onClick={handlePhoneFind} />
                      <TextInputTemplate name='display_name' label="Display Name" onInput={onInput} value={customerInfo["display_name"]} className="col-8"/>
                      {/* <TextInputTemplate label="Last Name" onInput={onInput}  className="col-5"/> */}
                      <TextInputTemplate name='email' label="Email" onInput={onInput} value={customerInfo.email}  className="col-5"/>
                      <TextInputTemplate name='rent_duration' label="Duration" onInput={onInput} value={customerInfo['rent_duration']}  className="col-3"/>
                      <TextInputTemplate name='address' label="Address" onInput={onInput} value={customerInfo.address} className="col-12" />
                      <TextInputTemplate name='note' label="Note" onInput={onInput} className="col-12" textarea/>

                  </div> 
              </div>

              {/* Order list */}
              <div className=" col-3 px-4 w-5 my-3  p-3 border-round"
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>

                <h1 className="text-3xl font-bold pt-4 my-0 mx-3 pb-3">Order Product</h1>

                  <OrderListTable></OrderListTable>
              </div>

          </div>

      </Container>
    </GameOrderContext.Provider>
  )
}


const OrderListTable = () => {

    const { gameOrder, handleDeleteGame } = useContext(GameOrderContext)

   

    const itemTemplate = (item) => {
        return (
            <GameOrderStyle className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`${API_BASE_URL}file/image/${item.filepath}`} alt={item.game_name} />
                <div className="flex-1 flex flex-column gap-2 xl:mr-8">
                    <span className="font-bold">{item.game_name}</span>
                    <div className="flex align-items-center gap-2">
                      <icon.tag />
                      <span>{item.developer}</span>
                    </div> 
                </div>
                <span className="font-bold text-900">${item.price}</span>
                <icon.delete className='delete-icon text-6xl text-red-600' onClick={() => handleDeleteGame(item.id)}/>
            </GameOrderStyle>
        );
    };
    
    return (
        <div className="flex flex-column justify-content-center">
            <OrderList value={gameOrder} itemTemplate={itemTemplate} header="Products"></OrderList>
        </div>
    )
}

// const SearchPopperCom = (props) => {

//   const { searchResult, referenceElement } = props

//   const [popperElement, setPopperElement] = useState(null);

//   const { styles, attributes } = usePopper(referenceElement, popperElement, {
//     placement: 'bottom-start',
//   });


//   const handleAction = (value) => {
//     console.log("game added", value)
//   }


//   return (
//     <PopperContainer ref={setPopperElement} style={styles.popper} {...attributes.popper}>
//       {searchResult &&
//         searchResult.map((item, index) => {
//           return (
//             <SearchResult key={index} onClick={() => handleAction(item)}>
//               <div>{item.game_name}</div>
//               <div>{item.price}</div>
//             </SearchResult>
//           )

//         })
//       }
//     </PopperContainer>
//   )
// }

export default CreateOrder

const Container = styled.div`
  height: calc(100vh - var(--header-height));
  overflow-y: scroll;
`
const Header = styled.header`
padding: 16px 20px;
position: relative;
display: flex;
justify-content: space-between;

.title {
  font-size: 2rem;
  font-weight: 900;
}
.description {
  color: var(--secondary_admin);
  font-size: 1.4rem;
}
`

const PopperContainer = styled.div`
  position: absolute;
  z-index: 999;
  background-color: #fff;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;


const SearchResult = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
`;
 

const GameOrderStyle = styled.div`
  .delete-icon {
    transition: all 0.3s ease-in-out;

    &:hover {
      cursor: pointer;
      font-size: 3.5rem!important;
      color: var(--red-400)!important;
    }
  }
`