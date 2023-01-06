import { ChangeEvent, FC, useRef, useState } from 'react';
import styled from 'styled-components'
import { img } from '~/assert/img';
import Avatar from '~/component/Avatar/Avatar';
import Button from '~/component/Button/Button';
import Input from '~/component/Input/Input';
import { UserPropType } from '../ManageUser';

interface EditUserPropTypes {
    setIsEditNew:  React.Dispatch<React.SetStateAction<boolean>>
    setUserList:  React.Dispatch<React.SetStateAction<UserPropType[]>>
    userList: UserPropType[]
}

const permissionList = ['User', 'Manager', 'Admin']


const EditUser:FC<EditUserPropTypes> = (props) => {
    const { setIsEditNew, setUserList, userList } = props
    const inputBtnRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCF, setPasswordCF] = useState('')
    const [permis, setPermis] = useState<string>(permissionList[0])
    const [imgUploaded, setImgUploaded] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>(img.defaultAvatar)
    const [uNError, setUserNameError] = useState<string>('')
    const [mailError, setMailError] = useState<string>('')
    const [pwError, setPwError] = useState<string>('')
    const [pwCFError, setPwCFError] = useState<string>('')
    

    const handleSubmitAdd = () => {

        if(username === '' || email === '' || password === '' || password !== passwordCF) {
            if(username === ''){
                setUserNameError('Username is not empty')
            }
                else { setUserNameError('') }
    
            if(email === ''){
                setMailError('Email is not empty')
            }
                else { setMailError('') }
    
            if(password === ''){
                setPwError('Password is not empty')
            }
                else { setPwError('') }
            
            if(password !== passwordCF){
                return setPwCFError('Confirm password is not correct')
            }
                else {setPwCFError('')}
            return 
        }
        else{
            setUserNameError('')
            setMailError('')
            setPwCFError('')
            setPwError('')
            
            const data = {
                id: 1,    
                username: username,
                email: email,
                role: permis,
                phone: '',
                status: true,
                password: password,
                avatar: imgPreview,
                createDate: Date.now(),
            }

            console.log(data);
            
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

                    <Input id='first-name'   
                            setValue={setEmail} value={email} type='text' label='First Name' width={'100%'}/>
                    <Input id='last-name'   
                            setValue={setEmail} value={email} type='text' label='Last Name' width={'100%'}/>
                    <Input id='email'   
                            setValue={setEmail} value={email} type='email' label='Email' width={'100%'}/>
                    <Input id='password' 
                            setValue={setPassword} value={password} type='password' label='Password' width={'100%'}/>
                    <Input  id='permission' 
                            setValue={setPermis} type='select' label='Permission' permissionList={permissionList} />
                   

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