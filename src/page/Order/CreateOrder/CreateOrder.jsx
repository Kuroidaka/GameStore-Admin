import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components/macro'
import { InputTextarea } from 'primereact/inputtextarea';
import SearchBar from '~/component/template/Search.template'

import config from '~/config'
import TextInputTemplate from '~/component/template/TextInput.template'
import GameTable from './GameTable'
import ProductService from '~/service/Product';



const CreateOrder = () => {

  const { createOrder } = config.adminRoutePath

  const navigate = useNavigate()
  
  const [searchResult, setSearchResult] = useState([]);

  const [ product ] = ProductService()

  const searchFeature = {
    searchResult,
    setSearchResult
  }




  return (
    <Container>
        <Header>
            <div className="title">Create New Order</div>
            <div className="description">Managing order's state</div>
        </Header>
        
        <div className="content px-5 grid justify-content-around" >

            <div className="col-3 card w-5 my-3  p-3 border-round" 
                style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
                <h1 class="text-3xl mx-3 font-bold pt-6 pb-4 ">Customer information</h1>

                <div className="card p-3 m-3 grid flex-row justify-content-around">
                    <TextInputTemplate label="First Name" className="col-5"/>
                    <TextInputTemplate label="Last Name" className="col-5"/>
                    <TextInputTemplate label="Phone Number" className="col-5"/>
                    <TextInputTemplate label="Gmail" className="col-5"/>
                    <TextInputTemplate label="Address" className="col-12" />
                    <TextInputTemplate label="Note" className="col-12" textarea/>

                </div>
            </div>


            <div className="col-3 card w-5 my-3 p-3 border-round"
               style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
              hello
            </div>
            
            <div className="card px-4 pt-2 mt-6 border-round"
             style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>

              <h1 class="text-3xl font-bold py-3 ">Order Product</h1>

              <div className="header py-4">
                  <SearchBar searchFeature={searchFeature} className='justify-content-end' /> 
              </div>
          
            {product && <GameTable product={product}/>}

            </div>
        </div>

    </Container>
  )
}

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

