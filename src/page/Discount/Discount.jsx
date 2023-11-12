import styled from "styled-components/macro";
import Button from '~/component/template/Button.template'
import DiscountTabView from "./Component/DiscountTabView";

const Discount = () => {
    return ( 
        <Container>
            <Header>
                <div className="title">Discount Management</div>
                <div className="description">Managing Discount status</div>
                <HeaderActionWrapper>
                    <HeaderAction>
                        <Button title="CREATE DISCOUNT" active={true}  />
                    </HeaderAction>
                </HeaderActionWrapper>
            </Header>
            <DiscountTabView />
        </Container>

     );
}
 
export default Discount;

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

