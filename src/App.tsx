import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleUser from './pages/SingleUser';
import Toast from './components/Toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toast />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:id' element={<SingleUser />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
