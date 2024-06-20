import './App.css';
import Main from "./component/MainComponent"
import { BrowserRouter } from 'react-router-dom';
import "./css/product.css"
import "./css/mainMenu.css"

function App() {
  return (
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  );
}

export default App;
