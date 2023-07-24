
import { ToastContainer } from 'react-toastify';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SingUp';
import Home from './pages/user/home/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <ToastContainer />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>

    </>
  );
}

export default App;
