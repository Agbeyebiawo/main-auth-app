import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Header from './components/Header'
// import Profile from './pages/Profile'
import PrivateRouter from './components/PrivateRouter'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/sign-in' element={<SignIn />}/>
          <Route path='/sign-up' element={<SignUp />}/>
          <Route element={<PrivateRouter />}>
            <Route path='/profile' element={<Profile />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
