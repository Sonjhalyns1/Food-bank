import { BrowserRouter, Link } from "react-router-dom";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from 'styled-components';
import { GiKnifeFork } from "react-icons/gi";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Spinner from "./components/Spinner";



function App() {
  
  return (
    <div className="App ">
      <div className="">
        <BrowserRouter>
        
      <Navbar />
      
        {/* <Category /> */}
        <Pages />
        <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      </BrowserRouter>
    </div>
      </div>
      
      
  );
}
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight:400;
  font-family: 'Lobster Two', cursive;
`
const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export default App;
