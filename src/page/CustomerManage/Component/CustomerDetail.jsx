import { useState } from "react";
import styled from "styled-components/macro";
import Avatar from "~/component/Avatar";
import TextInputTemplate from "~/component/template/TextInput.template";
import { InputText } from "primereact/inputtext";

const CustomerDetail = () => {

    const [customer, setCustomer] = useState({})

    const onInput = (e) => {
        const name = e.target.getAttribute('aria-describedby')
    
        setCustomer(prev => ({...prev, [name]: e.target.value}))
      }

    return ( 
    <Container>
        <ContentWrapper>
            <Header>
                
            </Header>

            <Information className="card p-3 m-3 grid flex-row justify-content-between">
                <TextInputTemplate name='Last' label="Last Name" onInput={onInput} value={customer.last}  className="col-5"/>
                <TextInputTemplate name='First' label="First Name" onInput={onInput} value={customer.first}  className="col-5"/>
                <TextInputTemplate name='address' label="Address" onInput={onInput} value={customer.address}  className="col-5"/>
                <TextInputTemplate name='phone' label="Contact" onInput={onInput} value={customer.phone}  className="col-5"/>

                {/* <div className="col-5">
                    <Input id="date-birth" aria-describedby={name} name={name} className="h-full" value={text} onInput={handleInput} />
                </div> */}


            </Information>
        </ContentWrapper>
        
    </Container>
    );
}
 
export default CustomerDetail;

const Container = styled.div `
    --avatar_zone-height: 100px;

    height: calc(100vh - var(--header-height));
`

const ContentWrapper = styled.div ` 
    height: 100%;
    padding: 16px 20px;
`

const Header = styled.div `
    height: var(--avatar_zone-height);
    width: 100%;
    background-color: red;

`

const Information = styled.div `
    /* height: calc(100vh - var(--header-height) - var(--avatar_zone-height) - 30px); */
` 