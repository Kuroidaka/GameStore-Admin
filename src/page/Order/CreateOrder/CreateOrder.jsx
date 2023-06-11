import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components/macro'
import { API_BASE_URL } from '~/config/api'
import SearchBar from '~/component/template/Search.template'

import config from '~/config'
import TextInputTemplate from '~/component/template/TextInput.template'
import GameTable from './GameTable'
import ProductService from '~/service/Product';
import { OrderList } from 'primereact/orderlist';

export const GameOrderContext = createContext(null) 

const CreateOrder = () => {

  const { createOrder } = config.adminRoutePath

  
  const [searchResult, setSearchResult] = useState([]);

  const [ product ] = ProductService()

  const [gameOrder, setGameOrder] = useState([])

  const searchFeature = {
    searchResult,
    setSearchResult
  }

  const gameOrderFeature = {
    gameOrder,
    setGameOrder
  }

  const pickGame = (product) => {
    const newArray = [...gameOrder, product];
    setGameOrder(newArray);
  };

  const contextValue = {
    handleChooseGame: (data) => pickGame(data),
    gameOrder: gameOrder 
  }

  return (

    <GameOrderContext.Provider value={contextValue}>
      <Container>
          <Header>
              <div className="title">Create New Order</div>
              <div className="description">Managing order's state</div>
          </Header>
          
          <div className="content px-5 grid justify-content-around" >

              <div className="col-3 card w-5 my-3  p-3 border-round" 
                  style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                  <h1 class="text-3xl mx-3 font-bold pt-3 my-0 pb-4 ">Customer information</h1>

                  <div className="card p-3 m-3 grid flex-row justify-content-around">
                      <TextInputTemplate label="First Name" className="col-5"/>
                      <TextInputTemplate label="Last Name" className="col-5"/>
                      <TextInputTemplate label="Phone Number" className="col-5"/>
                      <TextInputTemplate label="Gmail" className="col-5"/>
                      <TextInputTemplate label="Address" className="col-12" />
                      <TextInputTemplate label="Note" className="col-12" textarea/>

                  </div>
              </div>


              <div className="col-3 card w-5 h-auto my-3 p-3 border-round"
                  style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', maxHeight: '44rem'}}>
                <SearchBar searchFeature={searchFeature} className='justify-content-center' /> 
                <div className="card game-result my-6 overflow-y-scroll ">
                  {searchResult && <GameTable product={searchResult} gameOrderFeature={gameOrderFeature}/>}
                </div>
              </div>
              
              <div className="px-4 w-6 pt-2 mt-6 border-round"
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>

                <h1 class="text-3xl font-bold pt-4 my-0 mx-3 pb-3">Order Product</h1>

                  <OrderListTable></OrderListTable>
              </div>
            
          </div>

      </Container>
    </GameOrderContext.Provider>
  )
}


const OrderListTable = () => {

    const { gameOrder } = useContext(GameOrderContext)

    const itemTemplate = (item) => {
        return (
            <div className="flex flex-wrap p-2 align-items-center gap-3">
                <img className="w-4rem shadow-2 flex-shrink-0 border-round" src={`${API_BASE_URL}file/image/${item.filepath}`} alt={item.game_name} />
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
        <div className="flex flex-column justify-content-center">
            <OrderList value={gameOrder} itemTemplate={itemTemplate} header="Products" filter filterBy="name"></OrderList>
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
