import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleUser from './pages/SingleUser';
import Toast from './components/Toast';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Toast />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:id' element={<SingleUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
