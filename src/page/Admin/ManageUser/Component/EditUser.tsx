import { ChangeEvent, FC, useRef, useState } from 'react';
import styled from 'styled-components'
import { userApi } from '~/api/admin/userApi';
import { img } from '~/assert/img';
import Avatar from '~/component/Avatar/Avatar';
import Button from '~/component/Button/Button';
import Input from '~/component/Input/Input';
import SelectInput from '~/component/Select/Select';
import { User } from '~/model/User.model';
import { UserPropType } from '../ManageUser';

interface EditUserPropTypes {
    setIsEditNew:  React.Dispatch<React.SetStateAction<boolean>>
    setUserList:  React.Dispatch<React.SetStateAction<User[]>>
    userList: User[]
    targetId: number
}


const permissionList = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Manager', value: 'Manager' },
]


const EditUser:FC<EditUserPropTypes> = (props) => {
    const { setIsEditNew, setUserList, userList, targetId } = props
    const inputBtnRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCF, setPasswordCF] = useState('')
    const [permis, setPermis] = useState<string>(permissionList[0].value)
    const [imgUploaded, setImgUploaded] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>(img.defaultAvatar)
    const [pwCFError, setPwCFError] = useState<string>('')

    const handleSubmitAdd = () => {

        if(password !== passwordCF){
            return setPwCFError('Confirm password is not correct')
        }
            else {setPwCFError('')}
        const data = {
            User_Account_Password: password,
            User_Account_Permission: permis,
            id: targetId
        }
        console.log(data);
        
        const token = localStorage.getItem('token')
        if(token) {
            userApi.update(data, token)
            .then((res) => {
                console.log(res);
                setIsEditNew(false)
            })
        }
        
    }

    const handleClickOutSide = () => {
        setIsEditNew(false)
    }

    const handleClickInputAvatarBtn = () => {
        if(inputBtnRef.current){
            inputBtnRef.current.click()
        }
    }

    const handlePostImg = async (e:ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            const file = e.target.files[0]

            const filePreview = URL.createObjectURL(file)
                setImgUploaded(file)
                setImgPreview(filePreview)
        }
    }

    return ( 
        <Container>
            <Layout onClick={handleClickOutSide}/>

            <div className="modal" >  

                <div className="header">
                    <h3>Edit User Information</h3>
                </div>

                <div className="content">

                    <div className="avatar">
                        <label htmlFor="input-avatar">
                            <Avatar src={imgPreview} width='100px'/>
                        </label>

                        <div className="button-box mt-8">
                            <Button title='Upload' handleOnClick={handleClickInputAvatarBtn} />

                        </div>

                        <input ref={inputBtnRef} id='input-avatar' onInput={handlePostImg} type="file" style={{display: 'none' }} />
                    </div>

                    {/* <Input id='first-name'   
                            setValue={setEmail} value={email} type='text' label='First Name' width={'100%'}/>
                    <Input id='last-name'   
                            setValue={setEmail} value={email} type='text' label='Last Name' width={'100%'}/> */}
                    {/* <Input id='email'   
                            setValue={setEmail} value={email} type='email' label='Email' width={'100%'}/> */}
                    <Input id='password' 
                            setValue={setPassword} value={password} type='password' label='Password' width={'100%'}/>
                    <Input id='password-confirm' 
                                error={pwCFError}
                                setValue={setPasswordCF} value={passwordCF} type='password' label='Password Confirm' width={'100%'}/>
                    
                    <SelectInput label='Permission' id='permission'  width='100px' value={permissionList} setValue={setPermis}/>

                </div>

                <div className="button-box">
                    <Button title='Cancel' cancel={true} handleOnClick={() => setIsEditNew(false)} />
                    <Button title='Done' handleOnClick={handleSubmitAdd} />
                </div>

            </div>

        </Container>
     );
}
 
export default EditUser;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal{
        width: 600px;
        height: auto;
        background-color: white;
        z-index: 200;
        position: fixed;
        border-radius: 10px;
        padding: 20px;

        .header{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 60px;
            width: 100%;
        }
        .content{
            display: grid;
            /* justify-content: space-around;
            align-items: center; */
            /* div + div {
                margin-top: 20px;
            } */

            .avatar{
                align-self: flex-start;
                
                div {
                    display: flex;
                    margin: auto;
                }

                p{
                    margin: 10px;
                    font-weight: 700;
                }

                button{
                    margin: auto;
                }
            }

        }
        .button-box{
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

    }

`
const Layout = styled.div`
    cursor: pointer;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(16 16 16 / 20%);
`