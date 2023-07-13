import styled from "styled-components/macro";
import Button from '~/component/template/Button.template'
import CustomerTabView from "./Component/CustomerTabView";

const CustomerManage = () => {
    return ( 
        <Container>
            <Header>
                <div className="title">Customer Management</div>
                <div className="description">Managing customer account status</div>
                <HeaderActionWrapper>
                    <HeaderAction>
                        <Button title="CREATE ACCOUNT" active={true}  />
                    </HeaderAction>
                </HeaderActionWrapper>
            </Header>
            <CustomerTabView />
        </Container>

     );
}
 
export default CustomerManage;

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

