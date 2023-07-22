
import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/Pages/SignUp';
import Welcome from './components/Pages/Welcome';
import { useSelector } from 'react-redux'
import ForgotPassword from './components/Pages/ForgotPassword';
import Send from './components/Email/Send';
import ReadMsg from './components/Email/ReadMsg';
import Inbox from './components/Email/Inbox';
import SentBox from './components/Email/SentBox';
import ProtectPage from './components/Email/ProtectPage';
import Protected from './components/Email/Protected';

function App() {

  const isAuth = useSelector(state => state.auth.isAuthenicate)
  console.log(isAuth);
  return (
    <Fragment>

      {isAuth && <Welcome />}
      <Routes>

        <Route path='/' element={<ProtectPage Component={SignUp} />}></Route>

        <Route path='/forgotPassword' element={!isAuth ? <ForgotPassword /> : <Welcome />} />
        <Route path='/send' element={<Protected Component={Send} />} />
        <Route path='/inbox' element={<Protected Component={Inbox} />} />
        <Route path='/sentbox' element={<Protected Component={SentBox} />} />
        <Route path='/message/:id' element={<Protected Component={ReadMsg} />} />
      </Routes>
    </Fragment >
  );
}

export default App;
