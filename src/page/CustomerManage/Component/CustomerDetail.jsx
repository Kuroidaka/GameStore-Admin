import { useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
import Avatar from "~/component/Avatar";
import TextInputTemplate from "~/component/template/TextInput.template";
import { InputText } from "primereact/inputtext";
import CalendarInput from "~/component/template/DateInput.template";
import InputSelect from "~/component/template/InputSelect.template";
import { Password } from 'primereact/password';
import PasswordTemplate from "~/component/template/Password.template";
import Button2 from "~/component/template/Button2.template";
import { customer as customerAPI } from "~/api/customer.api";
import { useParams } from "react-router";
import { Toast } from 'primereact/toast';
import Button from "~/component/Button";

const CustomerDetail = () => {

    const [customer, setCustomer] = useState({})

    // const [valid, setValid] = useState(false)

    // const [validDetail, setValidDetail] = useState()

    const { id } = useParams()

    const toast = useRef(null);

    const onInput = (e, customName) => {
        let name = customName
        if(customName === '') {
            name = e.target.getAttribute('aria-describedby')
        }

        setCustomer(prev => ({...prev, [name]: e.target.value}))
    }

    const handleSubmit = async () => {
        

        const newData = {
            address: customer.address,
            email: customer.email,
            display_name:`${customer.first} ${customer.last}` ,
            // password: customer.password,
            phone: customer.phone,
            username: customer.username,
            birth_date: customer.birthday,
        }
        console.log("newData", newData);

        await customerAPI.update(newData, id)
        .then(res => {
            console.log("res", res)
            if(res.status === 200) {
                toast.current.show({severity:'success', summary: 'Success', detail:'Booking Successfully', life: 3000});
            }else {
                toast.current.show({severity:'error', summary: 'Error', detail:'Error Change customer information', life: 3000});
            }
        })
    }


    const setUpCheckValid = () => {
        customerAPI.getInfo({name :"id", value: id})
        .then(({data}) => {

            if(data) {
                console.log("data customer", data)
                // const splitDataGenre = splitGenre(data)
    
                // const splitDataPlatForm = splitPlatForm(data)
    
                const newData = {
                    last: data.display_name.split(" ")[1],
                    first: data.display_name.split(" ")[0],
                    address: data.address,
                    mail: data.email,
                    phone: data.phone,
                    username: data.username,
                    birthday: data.birth_date,
                    password: data.password,
                    gender: data.gender
    
                }
                setCustomer(newData)

                // const valid = JSON.stringify(newData)
                // setValidDetail(valid)
                // setValid(false)
            }
        })   

        // const splitGenre = (data) => {
        //     if(data.genre.length !== 0){ 
        //         const dataSplit = data.genre.split(',')
        //         setSelectedGenres(dataSplit)
        //         return dataSplit
        //     }
        // }

        // const splitPlatForm = (data) => {
        //     if(data.platform.length !== 0){ 
        //         const dataSplit = data.platform.split(',')
        //         setSelectedFlatForm(dataSplit)
        //         return dataSplit
        //     }
        // }
    }


    // useEffect(() => {
    
    //     const validateDetail = () => {

    //         const dataCheck = {
    //             last: customer.last,
    //             first: customer.first,
    //             address: customer.address,
    //             mail: customer.mail,
    //             phone: customer.phone,
    //             username: customer.username,
    //             birthday: customer.birthday,
    //             password: customer.password,
    //             gender: customer.gender

    //         }
    //         const valid = JSON.stringify(dataCheck) 
    //         if(valid !== validDetail) {
    //             setValid(true)
    //         }
    //         else {
    //             setValid(false)
    //         }
    //     }
    //     validateDetail()

    // }, [customer]);

    useEffect(() => {
        setUpCheckValid()
    }, [])
    
    return ( 
    <Container>
        <Toast ref={toast} />
        <ContentWrapper>
            <Header>
                <div className="flex w-full">
                    <Avatar label="C" size="xlarge" customSize="7rem" />
                    <h1 className="ml-5 font-bold">Canh Pham</h1>
                </div>
            </Header>

            <Information className="card p-3 m-3 grid flex-row justify-content-between">
                <TextInputTemplate name='last' label="Last Name" onInput={onInput} value={customer.last}  className="col-5"/>
                <TextInputTemplate name='first' label="First Name" onInput={onInput} value={customer.first}  className="col-5"/>
                <TextInputTemplate name='address' label="Address" onInput={onInput} value={customer.address}  className="col-5"/>
                <TextInputTemplate name='phone' keyfilter="int" label="Contact" onInput={onInput} value={customer.phone}  className="col-5"/>

                <div className="birthday col-5 flex text-2x justify-content-between">
                    <div className="text-wrapper flex flex-column gap-2 py-2 text-2xl col-5">
                        <label htmlFor="birthday" className="text-xl font-semibold">Date of Birth</label>
                        <CalendarInput name="birthday" id="birthday" value={customer.birthday} onInput={onInput} dateFormat="dd/mm/yy" className="h-full" />
                    </div>
                    <InputSelect title="Gender" 
                    name="gender"
                    currentValue={customer.gender}
                    data={[{ name: 'Male', code: 'MALE' }, { name: 'Female', code: 'FEMALE' }, { name: 'OTHER', code: 'OTHER' }]}/>
                </div>
                
                <TextInputTemplate name='email' label="Email" onInput={onInput} value={customer.mail}  className="col-5"/>

                <PasswordTemplate name='password' label="Password" onInput={onInput} value={customer.password}  className="col-5"/>

                <TextInputTemplate name='username' label="User Name" onInput={onInput} value={customer.username}  className="col-5"/>

                <PasswordTemplate name='passwordConfirm' label="Re-enter Password" onInput={onInput} value={customer.passwordConfirm}  className="col-5"/>

                <ButtonAction className="py-4">
                    <Button
                            title="Save"
                            active={true}
                            className=""
                            onClick={handleSubmit}
                        ></Button>
                </ButtonAction>
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
    margin: 30px 30px 0 30px;
`

const Information = styled.div `
    /* height: calc(100vh - var(--header-height) - var(--avatar_zone-height) - 30px); */
` 


const ButtonAction = styled.div`
width: 100%;
display: flex;
justify-content: flex-end;
gap: 10px;
`