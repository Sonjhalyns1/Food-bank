import { BrowserRouter, Link } from "react-router-dom";
import Category from "./components/Category";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from 'styled-components';
import { GiKnifeFork } from "react-icons/gi";



function App() {
  return (
    <div className="App ">
      <div className="max-x-xl mx-auto">
        <BrowserRouter>
      <Nav>
        <GiKnifeFork className="text-rose-500"/>
        <Logo to = {"/" }
        className="text-rose-500">Tasty</Logo>
      </Nav>
      <Search />
        <Category />
        <Pages />
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
