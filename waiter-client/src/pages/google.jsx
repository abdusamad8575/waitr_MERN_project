// Bring in the GoogleLogin
// component from the library
import { GoogleLogin } from '@react-oauth/google';
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signin} from '../redux-toolkit/userSlice'


export function Google() {
    const History = useNavigate()
    const dispatch = useDispatch()

    return (
        <div className="App">

            <GoogleLogin

                onSuccess={async (credentialResponse) => {
                    const { client_id } = credentialResponse
                    const jwtToken = credentialResponse.credential
                    await axiosInstance.post('/verify', { client_id, jwtToken })
                        .then((res) => {
                            const data = res.data;
                            const userRole = data.role;
                            dispatch(signin(data.user))
                            switch (userRole) {
                                case 'admin':
                                    History('/dashboard');
                                    break;
                                case 'restaurent':
                                    History('/restaurent');
                                    break;
                                default:
                                    History('/');
                                    break;
                            }
                        })
                        .catch((error) => console.log(error))
                }}

                onError={() => {
                    console.log('Login Failed');
                }}

            />

        </div>
    );
}