import { ChangeEvent, FC, useRef, useState } from "react";
import styled  from "styled-components";
import { MdUpload } from 'react-icons/md'

import { img } from "~/assert/img";
import Avatar from "~/component/Avatar/Avatar";
import Button from "~/component/Button/Button";
import Input from "~/component/Input/Input";
import ModalTemplate from "../../../../component/Modal/ModalTemplate";


interface InputInfoPropType {
    setInputModal: React.Dispatch<React.SetStateAction<Boolean>>
    setSuccessModal: React.Dispatch<React.SetStateAction<Boolean>>
}


const InputInfo:FC<InputInfoPropType> = (props) => {
    const { setInputModal, setSuccessModal } = props
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const [birth, setBirth] = useState<string>('')
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [imgUploaded, setImgUploaded] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>(img.defaultAvatar)

    const handleClickUploadAvatar = () => {
        inputFileRef.current?.click()
    }

    const handleInputAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const file = e.target.files[0]

            const filePreview = URL.createObjectURL(file)

                // set state for image preview
                setImgUploaded(file)
                // console.log(filePreview);
                setImgPreview(filePreview)
        }
    }
    const handleDone = () => {
        const data = {
            firstName,
            lastName,
            phone,
            address,
            birth,
            imgUploaded,
        }

        console.log(data);
        setInputModal(false)
        setSuccessModal(true)
        
    }

    return ( 
        <ModalTemplate width="500px" height="auto" color="var(--primary_admin)">
            <Content>
                <header>
                    <h1>USER INFO</h1>
                </header>

                <div className="input-body">
                    <div className="avatar">
                        <Avatar src={imgPreview} width='100px' />
                        <input ref={inputFileRef} type="file" style={{display: 'none'}} onInput={handleInputAvatar}/>
                        <Button title="Upload" handleOnClick={handleClickUploadAvatar}>
                            <MdUpload/>
                        </Button>
                    </div>

                    <div className="info">

                        <div className="name">
                            <Input label='First Name' 
                                id='first-name'
                                type='text'
                                width='100%'
                                value={firstName}
                                setValue={setFirstName} />

                            <Input label='Last Name' 
                                id='last-name'
                                type='text'
                                width='100%'
                                value={lastName}
                                setValue={setLastName} />
                        </div>
                        
                        <Input label='Phone Number' 
                                id='phone-number'
                                type='text'
                                width='100%'
                                value={phone}
                                setValue={setPhone} />

                        <Input label='Address' 
                                id='address'
                                type='text'
                                width='100%'
                                value={address}
                                setValue={setAddress} />

                        <Input label='Day of birth' 
                                id='birth'
                                type='date'
                                width='100%'
                                value={birth}
                                setValue={setBirth} />
                    </div>
                    


                </div>

                <div className="content-end">
                    <Button title="Cancel" cancel={true} width='75px' handleOnClick={() => setInputModal(false)} />
                    <Button title="Done" width='75px' handleOnClick={() => handleDone()}/>
                </div>
            </Content>
        </ModalTemplate>
    );
}
 
export default InputInfo;

const Content = styled.div`
    height: 100%;
    padding: 30px;

    header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 20%;

        h1{
            color: var(--text-color);
        }
    }

    .input-body {
        height: 65%;
        display: flex;
        gap: 20px;
        
        .avatar{


            div{
                margin: auto;
            }
        }

        .info{
            width: 100%;

            .name{
                gap: 8px;
                display: flex;
            }
        }
    }

    .content-end{
        margin-top: 30px;
        gap: 10px;
        display: flex;
        justify-content: flex-end;
    }
    
`