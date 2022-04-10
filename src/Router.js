import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Schedule from "./pages/Schedule"
import Query from "./pages/Query"

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/query" element={<Query />} />
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Router