import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components/macro'
import { icon } from '~/assert/icon/icon'
import Button from '~/component/template/Button.template'

import config from '~/config'
import Tab from '~/page/Order/component/TabViewOrder'



const Order = () => {

  const { createOrder } = config.adminRoutePath

  const navigate = useNavigate()

  const handleSelect = () => {

  }

  const handleClickCreateOrder = () => {
    navigate(createOrder)
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
                <Button title="CREATE ORDER" active={true} onClick={handleClickCreateOrder}  />
            </HeaderAction>
        </HeaderActionWrapper>
      </Header>
    <Tab />

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

