import { useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"



const Home = () => {
    const navigate = useNavigate()

    return (
        <div>
            <h2>Home:</h2>

            <Button 
                variant="gradient"
                gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                onClick={() => navigate("schedule/new")}> appointment </Button>

            <Button 
                ml={10}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                onClick={() => navigate("schedule")}> query </Button>


        </div>
    )
}

export default Home