import { FC } from "react";
import styled  from "styled-components";
import { img } from "~/assert/img";
import Button from "~/component/Button/Button";
import ModalTemplate from "../../../../component/Modal/ModalTemplate";

interface NotifyPropType {
    handleClick: () => void
}

const Notify:FC<NotifyPropType> = (props) => {
    const { handleClick } = props
    return ( 
        <ModalTemplate width="350px" height="450px" color="var(--success)">
            <Content>
                <div className="top">
                    <img src={img.correct} alt="" />
                    <p>SUCCESS</p>
                </div>

                <div className="bottom">
                    <p>Congratulations your account has been successfully created</p>
                    <Button handleOnClick={handleClick} title="Continue" width="150px" height="50px" radius="50px" color='#438c46'/>
                </div>

            </Content>
        </ModalTemplate>
    );
}
 
export default Notify;

const Content = styled.div`
    height: 100%;
    z-index: 999;
    .top{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        height: 50%;
        background-color: white;

        p{
            margin-top: 18px;
            text-align: center;
            color: var(--success-text);
        }

        img {
            width: 65px;
        }
    }

    .bottom{
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        height: 50%;
        p {
            color: var(--title-color);
            text-align: center;
        }
    }
`