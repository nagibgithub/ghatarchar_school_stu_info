import { Outlet } from 'react-router-dom';
import './App.css';
import NavBar from './contents/NavBar';
import AutoLogout from './AutoLogout';

const App = () => {

  return (
    <div className="min-h-screen">
      <AutoLogout></AutoLogout>
      <NavBar></NavBar>
      <Outlet></Outlet>
    </div>

  );
};

export default App;