import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components/macro";
import ChartTemp from "~/component/template/Chart.template";
import { getOrderListByGameID } from "~/service/order.service";
import { getProductDetail } from "~/service/product.service";
import { formatDate, formatMoney } from "~/utils";
import { Image } from 'primereact/image';
import { API_BASE_URL } from "~/config/api";
import { icon } from "~/assert/icon/icon.jsx"
import InputField from "~/component/InputField";
import { InputText } from "primereact/inputtext";
import TextInputTemplate from "~/component/template/TextInput.template";
import { MultiSelect } from 'primereact/multiselect';
import Button from "~/component/Button";


const GameDetail = () => {
    const { id } = useParams()

    const [detail, setDetail] = useState({})

    const [validDetail, setValidDetail] = useState()

    const [imgUploaded, setImgUploaded] = useState([])
    
    const [order, setOrder] = useState([])

    const [valid, setValid] = useState(false)

    const [chartData, setChartData] = useState({
        waiting : 0,
        decline : 0,
        done : 0,
        none : true
    })
    // 'Action','Adventure','Role-playing','Simulation','Strategy','Sports','Rhythm','Other')

    const [selectedGenres, setSelectedGenres] = useState([]);
    const genres = [
        { name: 'Action', value: 'Action' },
        { name: 'Adventure', value: 'Adventure' },
        { name: 'Role-playing', value: 'Role-playing' },
        { name: 'Simulation', value: 'Simulation' },
        { name: 'Strategy', value: 'Strategy' },
        { name: 'Sports', value: 'Sports' },
        { name: 'Rhythm', value: 'Rhythm' },
        { name: 'Other', value: 'Other' },
    ];



  
    const handlePostImg = async (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)

        setImgUploaded(prev => ([...prev, file]))

    }

    useEffect(() => {
        getProductDetail(id)
        .then(({data}) => {

            const splitArray = splitGenre(data)

            const newData = {...data, ["genre"]: splitArray}
            setDetail(newData)
            const valid = JSON.stringify(newData)
            setValidDetail(valid)
        })

        const splitGenre = (data) => {
            if(data.genre.length !== 0){ 
                const dataSplit = data.genre.split(',')
                setSelectedGenres(dataSplit)
                return dataSplit
            }
        }

        
    }, [])

    useEffect(() => {
        getOrderListByGameID(id)
        .then(({data}) => {
            setOrder(data)
            getChartValue(data)
        })
    }, []);

    useEffect(() => {
    
        const validateDetail = () => {
            const valid = JSON.stringify(detail)
            if(valid === validDetail) {
                setValid(false)
            }
            else {
                setValid(true)
            }
        }
        validateDetail()

    }, [detail]);

    console.log("detail", detail)

    const handleInputValue = (e) => {
        const { name, value } = e.target

        if(name === "genre") {
            setSelectedGenres(value)
        }
        setDetail(prev => ({...prev, [name]: value}))
    }

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

                <div className="list-order card border-round-lg w-10 p-4 my-5 m-auto" style = {{boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px'}}>
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
                            {order && order.map((data, idx) => {
                                return (
                                    <tr key={idx}>
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

                    {detail?.imageList?.length > 0 &&  <ImageList className="image-list flex justify-content-center align-items-center flex-column ">
                        <div className="w-6 border-round-lg overflow-hidden">
                           { detail?.imageList[0]?.filepath && <Image src={`${API_BASE_URL}file/image/${detail?.imageList[0]?.filepath}`} className="primary-image" alt="Image" preview width="100%" height="100px" />}
                        </div>
                        <div className="child-image-list h-10rem flex flex-wrap w-full gap-2">
                            {detail.imageList && detail.imageList.map((image, index) => {
                                if(index === 0) return
                                return (
                                    <div className="w-8rem border-round-lg overflow-hidden" key={index}>
                                        <Image src={`${API_BASE_URL}file/image/${image.filepath}`} className="primary-image" alt="Image" preview width="100%" height="100px" />
                                    </div>
                                )})}

                                {imgUploaded.length > 0 &&      
                                    imgUploaded.map((img ,idx) => {
                                        return (
                                        <div className="w-8 border-round-lg overflow-hidden" key={idx}>
                                            <Image src={`${img.preview}`} className="primary-image" alt="Image" preview width="100%" height="100px" />
                                        </div> 
                                        )
                                    })}
                                   

                                <AddGameImageBtn htmlFor="input-file" className="w-7rem border-round-lg overflow-hidden flex justify-content-center align-items-center">
                                    <icon.plus />
                                    <input type="file" id="input-file" className="hidden" onInput={handlePostImg} />
                                </AddGameImageBtn>
                        </div>
                    </ImageList> }

                    <div className="info mt-5">
                        <TextInputTemplate
                            onInput={handleInputValue}
                            value={detail.game_name}
                            // onInput
                            label="Game Name"
                            className=""
                            name="game_name"

                        />

                        <TextInputTemplate
                            onInput={handleInputValue}
                            value={detail.developer}
                            // onInput
                            label="Developer"
                            className=""
                            name="developer"
                        />

                        <TextInputTemplate
                            onInput={handleInputValue}
                            value={detail.price}
                            // onInput
                            label="Price"
                            className="w-2"
                            name="price"
                        />

                        <div className="text-wrapper flex flex-column gap-2 py-2 text-2xl">
                            <label htmlFor="genres" className="text-xl font-semibold">Genres</label>
                            <MultiSelect id="genres" value={selectedGenres} onChange={handleInputValue} name="genre" options={genres} optionLabel="name" display="chip" 
                                placeholder="Select Cities" className="w-full w-full" />
                        </div>
                        
                        <TextInputTemplate
                            onInput={handleInputValue}
                        value={detail.description}
                        // onInput
                        label="Description"
                        className=""
                        name="description"
                        textarea={true}
                    />
                    <div className="flex w-full justify-content-end">
                        <Button
                            title="Save"
                            active={valid}
                            disable={!valid}
                            className=""
                        ></Button>
                    </div>
                    </div>
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
            object-fit: contain!important;
        }
    }
`

const AddGameImageBtn = styled.label`
    background-color: #d1d1d1;
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: #c1c1c1;
    }
`