import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SingleUser from './pages/SingleUser';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/user/:id' element={<SingleUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
