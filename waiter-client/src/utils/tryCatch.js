import { toast } from 'react-toastify';

const tryCatch = (controller) => async (data) => {
    console.log('call trycatch');
    try {
        console.log('call sussess');
        const res =  await controller(data)
        console.log('try res',res);
        if(res?.data){
            toast.success(res?.data?.message)
            return res
        } 
    } catch (error) {
        console.log('call error');
        const errorMessage = error?.response?.data?.message || error.message
        console.error('Error '+ errorMessage)
        toast.error(errorMessage)
        throw error
        // return 
    }
}
export default tryCatch