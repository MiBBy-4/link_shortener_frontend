import { Routes, Route } from 'react-router-dom';
import Main from './Link/Main';
import LinksList from './Link/LinksList';
import LinkNavbar from './templates/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <LinkNavbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/links" element={<LinksList />} />
      </Routes>
    </div>
  );
}

export default App;
