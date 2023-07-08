import styled from "styled-components/macro";
import { formatMoney } from "~/utils";
import { Line } from 'react-chartjs-2';
import { LineChart } from "~/component/LineChart";
import NotifyList from "./NotifyList";
import { useEffect, useState } from "react";
import { orderApi } from "~/api/order.api";

const Dashboard = () => {

  const [mainData, setMainData] = useState([
    {
      title: 'TOTAL REVENUE',
      description: 'Previous month vs this months',
      qty: {
        money: true,
        value: '' // get data when called from api
      }, 
      apiDetail: {
        percent: '5%',
        increase: true
      }
    },
    {
      title: 'TOTAL CUSTOMER',
      description: 'Total customers joined the Shop',
      qty: {
        money: false,
        value: ''
      }, 
      apiDetail: {
        percent: '',
        increase: false
      }
    },
    {
      title: 'GAME',
      description: 'Total Game store can provide',
      qty: {
        money: false,
        value: '5000'
      }, 
      apiDetail: {
        percent: '55%',
        increase: true
      }
    }
  ])

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const response = await orderApi.getTotalRevenue();
        const dataRevenue = response?.data?.data;
        if (dataRevenue) {
          setMainData(prev => {
            const newData = [...prev];
            if (newData[0]?.qty) {
              newData[0].qty.value = dataRevenue;
            }
            return newData;
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchRevenue();
  }, []);
  

    const data = [
      {
        title: 'TOTAL REVENUE',
        description: 'Previous month vs this months',
        qty: {
          money: true,
          value: '5000' // get data when called from api
        }, 
        apiDetail: {
          percent: '5%',
          increase: true
        }
      },
      {
        title: 'TOTAL CUSTOMER',
        description: 'Total customers joined the Shop',
        qty: {
          money: false,
          value: '15'
        }, 
        apiDetail: {
          percent: '10%',
          increase: false
        }
      },
      {
        title: 'GAME',
        description: 'Total Game store can provide',
        qty: {
          money: false,
          value: '5000'
        }, 
        apiDetail: {
          percent: '55%',
          increase: true
        }
      }
    ]
    
    const chartData = [ 
      {
        label: 'Money',
        data: [125, 139, 332, 53, 253, 323],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        yAxisID: 'y',
      },
      {
        label: "Customer",
        data: [40, 50, 36, 52, 91, 120],
        borderColor: 'rgb(71, 163, 243)',
        backgroundColor: 'rgba(38, 98, 226, 0.5)',
        yAxisID: 'y1',
      },
    ]

    const todayData = [ 
      {
        label: 'ORDERS TODAY',
        description: 'Total orders placed today',
        value: '10'
      },
      {
        label: 'CUSTOMER ONLINE ',
        description: 'Current online and shopping customers',
        value: '20'
      }
    ]

    return ( 
        <Container>
            <Header>
                <div className="title">OVER VIEW</div>
            </Header>

           <Body className="flex">

            <Revenue className="revenue">
              <div className="feature-group flex gap-5">
                {mainData && mainData.map((item, idx) => (
                  <FeatureQty data={item} key={idx} />
                ))}
              </div>

              <ChartZone>
                <LineChart data={chartData}/>
              </ChartZone>

              <TodayQty>
                {todayData.map((data, idx) => <BigFeatureQty data={data} key={idx}/>)}
              </TodayQty>
            </Revenue>

            <NotifyList />

           </Body>

        </Container>
     );
}


const FeatureQty = ({data}) => {
  const { title, description, qty, apiDetail } = data
  const { money, value } = qty
  const { percent, increase } = apiDetail
  return (
  <div className="card w-30rem" style={{borderRadius: '1.25rem', height: 'auto'}}>
    <div className="card-body p-4 ">
      <div className="title font-semibold text-xl">{title}</div>
      <span className="description" style={{color: '#8F8FB1'}}>{description}</span>
      <div className="quantity text-4xl font-bold py-3">{ money ? formatMoney(value) : value}</div>
      <div className="note"> 
        {percent}
        <span style={increase ? {color: '#26B35D'} : {color: '#ea2020'}} className="pl-2">{increase? 'Higher':'Decrease' }</span> 
      </div>
    </div>
  </div>
  )
}

const BigFeatureQty = (props) => {
  const { data } = props

  const { label, description, value } = data

  return (
    <BigFeatureQtyContainer className="w-5 my-6">
      <div className="card-body flex align-items-center justify-content-between">
        <div className="">
          <div className="title font-semibold text-2xl">{label}</div>
          <span className="description" style={{color: '#8F8FB1'}}>{description}</span>
        </div>
        <div className="qty text-6xl font-bold">{value}</div>
      </div>
    </BigFeatureQtyContainer>
  )
}


 
export default Dashboard;

const Container = styled.div`
  --header-content-height: 60px;
  height: calc(100vh - var(--header-height));
  overflow-y: scroll;
`

const Header = styled.header`
padding: 16px 20px;
position: relative;
height: var(--header-content-height);

.title {
  font-size: 2rem;
  font-weight: 900;
}
.description {
  color: var(--secondary_admin);
  font-size: 1.4rem;
}
`


const Body = styled.div`
  width: 100%;
  height: calc( 100% - var(--header-content-height) );
`

const Revenue = styled.div`
  width: 70%;
  height: 100%;
  /* background-color: #7a7474; */
  padding: 14px;

`

const List = styled.div`
 

`

const ChartZone = styled.div `
  width: 100%;

`

const TodayQty = styled.div `
  width: 100%;
  display: flex;
  gap: 10px;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const BigFeatureQtyContainer = styled.div `
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  height: auto;
  padding: 13px;
  border-radius: 10px;

`