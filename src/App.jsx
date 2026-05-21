import MainRoutes from "./routes/MainRoutes.jsx";
import {BrowserRouter} from "react-router-dom";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from "gsap";

// Explicitly register the scroll utility engine
gsap.registerPlugin(ScrollTrigger);

function App() {

    return (
        <BrowserRouter>
            <MainRoutes/>
        </BrowserRouter>
    )
}

export default App
