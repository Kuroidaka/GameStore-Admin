import { useEffect, useState } from 'react'
import styled from 'styled-components/macro'
import { icon } from '~/assert/icon/icon'
import Button from '~/component/template/Button.template'

import InputBox from '~/component/template/InputSelect.template'



const Order = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawdawd ad awd awd awberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  const handleSelect = () => {
    console.log("select")
  }
  
  return (
    <Container>
      <Header>
        <div className="title">Order</div>
        <div className="description">Managing order's state</div>
        <HeaderActionWrapper>
            <HeaderAction>
                <Button title="PRINT" normal={true} />
                <Button title="EXPORT" normal={true} />
                <Button title="CREATE ORDER"  active={true} />
            </HeaderAction>
        </HeaderActionWrapper>
      </Header>

      <FilterSection>
        <InputBox options={options} title='Date range'/>
        <InputBox options={options} title='Status'/>
      </FilterSection>

      


    

    </Container>
  )
}

export default Order

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

const HeaderActionWrapper = styled.div`
position: absolute;
right: 10px;
top: 10px;
`

const HeaderAction = styled.div `
position: relative;
display: flex;
flex-direction: row;
justify-content: space-between;
`

const FilterSection = styled.div`
width: 100%;
height: 60px;
display: flex;
justify-content: flex-end;
align-items: center;
padding: 0 20px;
gap: 10px;

`