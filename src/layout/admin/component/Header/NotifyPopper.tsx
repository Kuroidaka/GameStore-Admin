import { useEffect, useState } from "react";
import styled from "styled-components";
import { img } from "~/assert/img";
import { io } from "socket.io-client";
import { notifyApi } from "~/api/notification/notification.api";
import { Modal } from "antd";
import NotifyConfirm from "./NotifyConfirm";
import { socketHandler } from "~/page/Admin/CommomHandler/handleSocket";
const NotifyPopper = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        socketHandler.requireNotify();
        // var socket = io("http://localhost:8888/");
        // socket.on("getData", async (var1) => {
        //     const result = await notifyApi.search({});
        //     setDataSource(result.data.results);
        // })
    }, [])
 
    return (
        <Container>
            <div className="title">
                Notification
            </div>
            <div className="item-list">
            {dataSource ? dataSource.map((item: any) => {
                return (
                    <NotifyConfirm data={item}/>

               )
            }) : ''}
            </div>

        </Container>
    );
}

export default NotifyPopper;

const Container = styled.div`
    width: 290px;
    background-color: var(--third_admin);
    padding: 8px;
    border-radius: 10px;
    color: var(--side-bar-normal-text);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

    .title {
        font-weight: 900;
        padding: 8px 16px;
        margin-bottom: 16px;
        border-bottom: 1px solid var(--semi-primary_admin);
    }

    .item-list{
        display: flex;
        flex-direction: column;

        .item{
            display: flex;
            padding: 8px 16px;
            margin-bottom: 16px;
            cursor: pointer;
            border-radius: 10px;

            &:hover {
                background-color: var(--hover-item_dark);
            }

            img{
                width: 40px;
            }

            .content{
                margin-left: 10px;

                h5{
                    display: block;
                display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                }
                p{
                    font-size: 11px;
                    opacity: .7;
                }
            }
        }

        .show-all{
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 8px;

            p{
                background: linear-gradient(0deg, var(--semi-primary_admin), var(--hover-item_dark)) no-repeat right bottom / 0 var(--bg-h);
                transition: background-size 350ms;
                --bg-h: 100%;
                cursor: pointer;
                font-size: 12px;

                &:where(:hover, :focus-visible) {
                background-size: 100% var(--bg-h);
                background-position-x: left;
                }

                &:hover {
                    padding-bottom: 2px;
                    --bg-h: 2px;
                }
            }
        }
    }

`