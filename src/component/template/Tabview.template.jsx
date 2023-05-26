
import React from 'react'; 
import { TabView, TabPanel } from 'primereact/tabview';
import styled from "styled-components/macro";
import InputSelect from './InputSelect.template';
import Table from './Table.template';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawdawd ad awd awd awberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

const Tab = (props) => {
    const { } = props

    return (
        <Container className="card">
            <TabView>
                <TabPanel header="All">
                    <TotalQuantity>
                        <div className="d-flex justify-content-between">
                            <p className='my-auto'>Showing 11 - 20 of 64 results</p>
                            <InputSelect options={options} title='Date range'/>
                            <InputSelect options={options} title='Status'/>
                            <div className='d-flex align-items-center flex-row gap-3'>
                                <div>Results per page:</div> 
                                <InputSelect options={options} title='Quantity' width='80px'/>
                            </div>
                        </div>
                            <Content>
                                <Table>

                                </Table>
                            </Content>
                    </TotalQuantity>
                </TabPanel>
                <TabPanel header="Accpeted">
                   
                </TabPanel>
                <TabPanel header="Rejected">
                    <p className="m-0">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti 
                        quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in
                        culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. 
                        Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                    </p>
                </TabPanel>
            </TabView>
        </Container>
    )
}
        
export default Tab

const Container = styled.div `
margin: 0 16px;
height: 70vh;
`

const TotalQuantity = styled.div `
    
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


const Content = styled.div`
padding: 16px 0;
`
