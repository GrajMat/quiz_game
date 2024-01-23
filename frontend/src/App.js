import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, } from "react-bootstrap";
import { Routes, Route } from "react-router-dom"

import Header from "./components/header";
import Game from './pages/Game';
import About from './pages/About';

function App() {






    return (
        <>
            <Header />
            <Container>
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Container >
        </>

    );
}

export default App;
