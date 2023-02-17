import { AxiosResponse } from 'axios';
import { ChangeEvent, FC, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components'
import { adminApi } from '~/api/admin/authApi';
import { userApi } from '~/api/admin/userApi';
import { img } from '~/assert/img';
import Avatar from '~/component/Avatar/Avatar';
import Button from '~/component/Button/Button';
import Input from '~/component/Input/Input';
import SelectInput from '~/component/Select/Select';
import { User } from '~/model/User.model';
import { UserPropType } from '../ManageUser';

interface addNewUserPropTypes {
    setIsAddNew:  React.Dispatch<React.SetStateAction<boolean>>
    setUserList:  React.Dispatch<React.SetStateAction<User[]>>
    userList: User[]
}

const permissionList = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Manager', value: 'Manager' },
]


const AddNewUser:FC<addNewUserPropTypes> = (props) => {
    const { setIsAddNew, setUserList, userList } = props
    const inputBtnRef = useRef<HTMLInputElement>(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCF, setPasswordCF] = useState('')
    const [permis, setPermis] = useState<string>(permissionList[0].value)
    const [imgUploaded, setImgUploaded] = useState<File>()
    const [imgPreview, setImgPreview] = useState<string>(img.defaultAvatar)
    const [uNError, setUserNameError] = useState<string>('')
    const [pwError, setPwError] = useState<string>('')
    const [pwCFError, setPwCFError] = useState<string>('')
    const dispatch = useDispatch()

    const handleSubmitAdd = () => {

        if(username === '' || password === '' || password !== passwordCF) {
            if(username === ''){
                setUserNameError('Username is not empty')
            }
                else { setUserNameError('') }
    
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
            setPwCFError('')
            setPwError('')
            
            const data = {
                User_Account_Name: username,
                User_Account_Password: password,
                User_Account_Permission: permis,
                Status: 'Offline',
                // email: email,
                // avatar: imgUploaded,
            }

            
            adminApi.register(data)
            .then((res: AxiosResponse<User> ) => {
                const token = localStorage.getItem('token')
                if(token){
                    userApi.getUserById(Number(res.data.id), token)
                    .then((res: AxiosResponse<User>) => {
                        
                        setUserList((prev: User[]) => [res.data, ...prev])
                    })
                }
            })
            .catch(e => {
                console.log(e);
                
            })
            
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
            <Layout onClick={handleClickOutSide}>

                <div className="modal" onClick={(e) => e.stopPropagation()} >  

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
                        <Input id='password' 
                                error={pwError}
                                setValue={setPassword} value={password} type='password' label='Password' width={'100%'}/>
                        <Input id='password-confirm' 
                                error={pwCFError}
                                setValue={setPasswordCF} value={passwordCF} type='password' label='Password Confirm' width={'100%'}/>

                        {/* <Input  id='permission' 
                                value={permis.value}
                                setValue={setPermis} type='select' label='Permission' permissionList={permissionList} /> */}
                                <div className="permission" style={{marginTop: '20px'}}>
                                    <SelectInput label='Permission' id='permission'  width='100px' value={permissionList} setValue={setPermis}/>
                                </div>
                    </div>
                        

                    </div>

                    <div className="button-box">
                        <Button title='Cancel' cancel={true} handleOnClick={() => setIsAddNew(false)} />
                        <Button title='Add New' handleOnClick={handleSubmitAdd} />
                    </div>

                </div>
            </Layout>
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgb(16 16 16 / 20%);
`