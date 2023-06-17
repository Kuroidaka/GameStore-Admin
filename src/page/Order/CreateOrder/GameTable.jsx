import React, { useContext, useState } from 'react'

import { DataView } from 'primereact/dataview';
import styled from 'styled-components/macro';
import { GameOrderContext } from './CreateOrder';
import { icon } from '~/assert/icon/icon'

const GameTable = (props) => {
  const { product } = props

  const [modal, setModal] = useState({ state: false, data: null })
  
  const { handleChooseGame, gameOrder } = useContext(GameOrderContext)

  const itemTemplate = (product) => {
    return (
        <Container onClick={() => handleChooseGame(product)}>
          <div className="col-12">
              <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4 cursor-pointer">
                  <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:8000/file/image/${product.filepath}`} alt={product.game_name} />
                  <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                      <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                          <div className="text-2xl font-bold text-900">{product.game_name}</div>
                        
                          <div className="flex align-items-center gap-3">
                              <span className="flex align-items-center gap-2">
                                  <icon.tag />
                                  <span className="font-semibold">{product.developer}</span>
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
        </Container>
    );
  };

  return (
    <div className="card">
          <DataView value={product} itemTemplate={itemTemplate} />
    </div>
  )
}



export default GameTable

const Container = styled.div`

    width: 100%;
    /* height: 50px; */

  &:hover {
    background: #ededed;

  }
`