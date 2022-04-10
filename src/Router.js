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

                        <Route path="*" element={<h1>not found!</h1>} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div>
    )
}

export default Router