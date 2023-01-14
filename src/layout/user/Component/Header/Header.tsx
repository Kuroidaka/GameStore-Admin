import styled from "styled-components";
import { img } from "~/assert/img";
import { icon } from "~/assert/icon";

const HeaderCom = () => {


return ( 
        <Header>
            <div className="wrapper">
                <Navbar>
                    <li>
                    PRODUCT    
                    <icon.arrowDown2 />
                    </li>
                    <li>
                    SHOP    
                    <icon.arrowDown2 />
                    </li>
                    <li>
                    SHOP    
                    <icon.arrowDown2 />
                    </li>
                    <li>
                    SHOP    
                    <icon.arrowDown2 />
                    </li>
                </Navbar>

                <Logo>
                    <img src={img.logo} alt="" />
                </Logo>

                <Action>
                    <div className="search">
                        <input type="text" placeholder="Search product..."/>
                        {/* <icon.search className="icon"/>    */}
                        <icon.loading className="icon" style={{ transform: 'rotate(360)'}}/>                   
                    </div>
                    <icon.cart className="cart"/>
                    <icon.wishList className="wist-list"/>
                </Action>
            </div>
        </Header>
    );
}
 
export default HeaderCom;


const Header = styled.div`
height: var(--header-bar-height);
background-color: #b3b3e2;
width: 100vw;
display: flex;
justify-content: center;

    .wrapper {
        width: 1400px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

`

const Navbar = styled.ul`
    list-style-type: none;
    display: flex;
    gap: 30px;
    li {
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
    }

`

const Logo = styled.div`
    cursor: pointer;
    img {
        width: 88px;
    }

`

const Action = styled.div`
display: flex;
gap: 30px;
align-items: center;

.search {
    border-bottom: 1px solid #ccc; 
    display: flex;
    align-items: center;
    height: 46px;
    width: 260px;
    padding: 10px;
    position: relative;

    input {
        height: 100%;
        width: 80%;
        outline: none;
        background-color: transparent;
        border: none;
    }

    .icon {
        position: absolute;
        right: 10px;
        font-size: 21px;
    }

}

.cart {
    font-size: 25px;
}

.wist-list {
    font-size: 21px;
}

`