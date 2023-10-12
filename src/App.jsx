import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './contents/NavBar';

const App = () => {

  return (
    <div className="min-h-screen">
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>

  );
};

export default App;