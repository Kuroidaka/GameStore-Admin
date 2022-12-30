import { ChangeEvent, FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { img } from '~/assert/img';
import Avatar from '~/component/Avatar/Avatar';
import Button from '~/component/Button/Button';
import Input from '~/component/Input/Input';
import { UserListType } from '../ManageUser';

interface addNewUserPropTypes {
    setIsAddNew:  React.Dispatch<React.SetStateAction<boolean>>
    setUserList:  React.Dispatch<React.SetStateAction<UserListType[]>>
    userList: UserListType[]
}

const permissionList = ['User', 'Manager', 'Admin']


const AddNewUser:FC<addNewUserPropTypes> = (props) => {
    const { setIsAddNew, setUserList, userList } = props
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
    const dispatch = useDispatch()

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


            setUserList([...userList, data])
            setIsAddNew(false)
        }
    }

    const handleClickOutSide = () => {
        setIsAddNew(false)
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

                // set state for image preview
                setImgUploaded(file)
                // console.log(filePreview);
                setImgPreview(filePreview)
        }
    }

    return ( 
        <Container>
            <Layout onClick={handleClickOutSide}/>

            <div className="modal" >  

                <div className="header">
                    <h3>Add New User</h3>
                </div>

                <div className="content">

                <div className="avatar">
                    <label htmlFor="input-avatar">
                        <Avatar src={imgPreview} width='100px'/>
                    </label>

                    <div className="button-box mt-8">
                        <Button title='Upload' handleOnClick={handleClickInputAvatarBtn} />

                    </div>

                        <p>Upload New Avatar</p>

                    <input ref={inputBtnRef} id='input-avatar' onInput={handlePostImg} type="file" style={{display: 'none' }} />
                </div>

                <div className="input-info">
                    <Input id='username' 
                            error={uNError}
                            setValue={setUsername} value={username} type='text' label='UserName' width={'100%'}/>
                    <Input id='email' 
                            error={mailError}    
                            setValue={setEmail} value={email} type='email' label='Email' width={'100%'}/>
                    <Input id='password' 
                            error={pwError}
                            setValue={setPassword} value={password} type='password' label='Password' width={'100%'}/>
                    <Input id='password-confirm' 
                            error={pwCFError}
                            setValue={setPasswordCF} value={passwordCF} type='password' label='Password Confirm' width={'100%'}/>

                    <Input  id='permission' 
                            value={permis}
                            setValue={setPermis} type='select' label='Permission' permissionList={permissionList} />
                   
                </div>
                    

                </div>

                <div className="button-box">
                    <Button title='Cancel' cancel={true} handleOnClick={() => setIsAddNew(false)} />
                    <Button title='Add New' handleOnClick={handleSubmitAdd} />
                </div>

            </div>

        </Container>
     );
}
 
export default AddNewUser;

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    position: fixed;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal{
        width: 400px;
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
            display: flex;
            justify-content: space-around;
            align-items: center;
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