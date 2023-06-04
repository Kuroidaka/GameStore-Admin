import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components/macro'
import { InputTextarea } from 'primereact/inputtextarea';
import SearchBar from '~/component/template/Search.template'

import config from '~/config'
import TextInputTemplate from '~/component/template/TextInput.template'
import GameTable from './GameTable'



const CreateOrder = () => {

  const { createOrder } = config.adminRoutePath

  const navigate = useNavigate()
  const [searchResult, setSearchResult] = useState([]);

  const searchFeature = {
    searchResult,
    setSearchResult
  }

  const onSearch = () => {

  }

  const onClickAddGame = () => {

  }


  return (
    <Container>
        <Header>
            <div className="title">Create New Order</div>
            <div className="description">Managing order's state</div>
        </Header>
        
        <div className="content p-5">
            <div className="card w-6 my-3 p-3 border-round">
                <h1 class="text-3xl font-bold pt-6 pb-4 ">Customer information</h1>

                <div className="card p-3 m-3 grid justify-content-around">
                    <TextInputTemplate label="Phone Number" className="col-5"/>
                    <TextInputTemplate label="Display Name" className="col-5"/>
                    <TextInputTemplate label="Note" className="col-12" textarea/>

                </div>
            </div>
            
            <div className="search-wrapper">
                <SearchBar searchFeature={searchFeature} /> 
            </div>
        
            <GameTable></GameTable>
        </div>

    </Container>
  )
}

export default CreateOrder

const Container = styled.div`
  height: calc(100vh - var(--header-height));
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

