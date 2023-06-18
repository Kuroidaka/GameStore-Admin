import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components/macro";
import ChartTemp from "~/component/template/Chart.template";
import { getOrderListByGameID } from "~/service/order.service";
import { getProductDetail } from "~/service/product.service";
import { formatDate, formatMoney } from "~/utils";
import { Image } from 'primereact/image';
import { API_BASE_URL } from "~/config/api";

const GameDetail = () => {
    const { id } = useParams()

    const [detail, setDetail] = useState({})

    const [order, setOrder] = useState([])

    const [chartData, setChartData] = useState({
        waiting : 0,
        decline : 0,
        done : 0,
        none : true
    })

    useEffect(() => {
        getProductDetail(id)
        .then(({data}) => {
            setDetail(data)
            console.log("detail", data)
        })
    }, [])

    useEffect(() => {
        getOrderListByGameID(id)
        .then(({data}) => {
            setOrder(data)
            getChartValue(data)
        })
    }, []);

    const getChartValue = (data) => {

        const waiting = data.filter(order => order.queue_status === "WAITING").length
        const decline = data.filter(order => order.queue_status === "DECLINE").length
        const done = data.filter(order => order.queue_status === "DONE").length

        if(waiting === 0 && decline === 0 && done === 0) {
            setChartData({
                none : true
            })
            return
        }
        else {
            setChartData({
                waiting,
                decline,
                done,
                none: false
            })
        }

    }

    return (
    <Container>
        <Header>
          <div className="title">GAME DETAIL</div>
          <div className="description">Managing Game status</div>
        </Header>
        <div className="grid gap-4 ">

            <section className="order col">
                <div className="w-8 m-auto">
                    {chartData && <ChartTemp chart={chartData} ></ChartTemp>}
                </div>

                <div className="list-order card border-round-lg w-10 p-4 my-5 m-auto" style = {{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px;'}}>
                    <div className="header text-4xl font-medium">Recent Order</div>

                    <div className="card p-5 table-wrapper overflow-scroll h-20rem">
                        <table className="body w-full">
                            <thead style={{color: "#C5C5C5"}}>
                                <th colSpan={2} className="text-xl font-normal">Customer</th>
                                <th className="text-xl font-normal ">Start</th>
                                <th className="text-xl font-normal">End</th>
                                <th className="text-xl font-normal">Price</th>
                            </thead>
                            <tbody>
                            {order && order.map(data => {
                                return (
                                    <tr>
                                        <td className="py-3">
                                            {data.booking_id}
                                        </td>
                                        <td className="text-center font-bold py-3">
                                            {data.display_name}
                                        </td>
                                        <td style={{color: "#A9A9A9"}} className="py-3">
                                            {formatDate(data.rental_start_date)}
                                        </td>
                                        <td style={{color: "#A9A9A9"}} className="py-3">
                                            {formatDate(data.rental_end_date)}
                                        </td>
                                        <td className="font-bold py-3">
                                            {formatMoney(data.rental_price)}
                                        </td>
                                    </tr>
                                )
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="game col">
                <div className="content px-4 py-3 w-full m-auto h-full border-round-xl" style={{
                    backgroundColor: "rgb(252 252 252)",
                    boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px"
                }}>

                    {/* <ImageList className="image-list flex justify-content-center flex-column ">
                        <div className="w-8 border-round-lg overflow-hidden">
                           { detail?.imageList[0]?.filepath && <Image src={`${API_BASE_URL}file/image/${detail?.imageList[0]?.filepath}`} className="primary-image" alt="Image" preview width="100%" height="100px" />}
                        </div>
                        <div className="child-image-list flex flex-wrap w-full">
                            {detail.imageList && detail.imageList.map((image, index) => {
                                if(index === 0) return
                                return (
                                    <div className="w-3 border-round-lg overflow-hidden">
                                        <Image src={`${API_BASE_URL}file/image/${image.filepath}`} className="primary-image" alt="Image" preview width="100%" height="100px" />
                                  </div>
                                )})}  
                        </div>
                    </ImageList> */}


                </div>

            </section>
        </div>
        

      </Container>
     );
}
 
export default GameDetail;

const Container = styled.div`
  height: calc(100vh - var(--header-height));
    padding: 20px;
`
const Header = styled.header`
  padding: 16px;
  .title {
    font-size: 2rem;
    font-weight: 900;
  }
  .description {
    color: var(--secondary_admin);
    font-size: 1.4rem;
  }
`

const ImageList = styled.div `
    .p-image-preview-container {
        width: 100%!important;

        img {
            object-fit: cover!important;
        }
    }
`