import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Home from "./pages/Home"
import Schedules from "./pages/Schedule"
import Schedule from "./pages/Schedule/Schedule"
import Query from "./pages/Query"
import Layout from "./components/Layoult"

const Router = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route element={<Home />} index />
                        <Route path="schedule" element={<Outlet />} >
                            <Route element={<Schedules />} index />
                            <Route element={<Schedule />} path=":scheduleId" />
                        </Route>
                        <Route path="query" element={<Query />} />
                        <Route path="*" element={<h1>not found!</h1>} />
                    </Route>
                </Routes>
            </BrowserRouter>

        </div >
    )
}

export default Router