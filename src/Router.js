import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Schedule from "./pages/Schedule"
import Query from "./pages/Query"
import Layout from "./Components/Layoult"

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route element={<Home />} index />
                        <Route path="/schedule" element={<Schedule />} />
                        <Route path="/query" element={<Query />} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Router