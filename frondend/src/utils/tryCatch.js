import { toast } from 'react-toastify';

const tryCatch = (controller) => async (data) => {
    try {
       const res =  await controller(data)
        if(res?.data){
            toast.success(res?.data?.message)
            return res
        } 
    } catch (error) {
        const errorMessage = error?.response?.data?.message || error.message
        console.error('Error '+ errorMessage)
        toast.error(errorMessage)
        // throw error
        return 
    }
}
export default tryCatch