import { useNavigate } from "react-router-dom"
import { Button } from "@mantine/core"



const Home = () => {
    const navigate = useNavigate()

    const onCreateSchedule = () => {
        navigate("schedule/new")
    }

    return (
        <div>
            <h2>Home:</h2>

            <Button
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                onClick={onCreateSchedule}
            >
                Create Schedule
            </Button>

            <Button
                ml={10}
                variant="gradient"
                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                onClick={() => navigate("schedule")}
            >
                Schedule list
            </Button>


        </div>
    )
}

export default Home