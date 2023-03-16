import { adminApi } from "~/api/admin/authApi";

const handleValidUser = async () : Promise<any> => {
    const res = await adminApi.getUserInfor();
    if (res.data.msg === 'Token Expired'){
        await adminApi.refreshToken()
    }
}
export default handleValidUser