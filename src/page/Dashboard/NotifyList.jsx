import { useEffect, useState } from "react";
import styled from "styled-components/macro";
import { trackingApi } from "~/api/tracking.api";
import Avatar from "~/component/Avatar";

const NotifyList = () => {

    const [trackingList, setTrackingList] = useState([])

    useEffect(() => {

        const fetchApi = () => {
            trackingApi.getTrackingList().
            then(res => {
                console.log("tracking data", res.data)
                setTrackingList(res.data.reverse())
            })
        }

        fetchApi()

    }, []);

    return ( 
        <Container>
            <div className="title">View all</div>
            
            <div className="ListContainer">
                {trackingList && trackingList.map((item, index) =>
                 <NotifyItem key={index} username={item.username} action={item.action}/>)}
                
            </div>
        </Container>
    );
}
 
const NotifyItem = (props) => {

    const {username, action} = props

    return (
        <NotifyItemContainer >
            <div className="flex h-full w-full align-items-center gap-3">
                <Avatar label={username[0]}/>
                <span className="infor">
                    <span className="user">{username}</span>
                    <span className="action w-full">{action}</span>
                    <p>27/02/2023</p>
                </span>
            </div>
        </NotifyItemContainer>
    )
}

export default NotifyList;

const Container = styled.div`
    width: 300px;
    height: 86%;
    /* background-color: #2a2a2d; */
    padding: 10px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
    overflow: hidden;   
    position: fixed;
    right: 0;
    border: 1px solid #dcdcdc;
    border-radius: 10px;

    .title {
        position: relative;
        padding-bottom: 10px;
        text-align: end;
        font-weight: 900;
        color: var(--first-color);
        cursor: pointer;
    
        &:hover {
            color: #3d1763;
        }
    }

    .ListContainer{
        height: 100%;
        overflow-y: scroll;
        width: 100%;
        padding: 6px;
    }
`

const NotifyItemContainer = styled.div`
    /* box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px; */
    width: 100%;
    /* border-radius: 10px; */
    padding: 0px 5px;
    cursor: pointer;

    &:hover{
        background-color: #f1f1f1;
        border-radius: 10px;
    }

    & + & {
        padding-top: 10px;
        margin-top: 10px; 
    }

    .avatar {
        flex-shrink: 0;
        border-radius: 50%;
        background-color: #fff;
        border: 1px solid #6f6e6e;
        height: 65px;
        width: 65px;
        align-self: center;
    }

    .infor {
        overflow: hidden;
        width: auto;
        align-self: center;

        .user {
            font-weight: 600;
        }

        .action {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #484848;
        }

        p {
            padding-top: 6.9px;
            font-size: 1.1rem;
            color: grey;
        }
    }
`