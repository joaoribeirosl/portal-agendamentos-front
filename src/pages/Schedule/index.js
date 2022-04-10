import { Table, Button } from "@mantine/core"
import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from 'tabler-icons-react';
import axios from "../../services/api.js";

const Schedule = () => {
    const navigate = useNavigate()
    const [schedules, setSchedules] = useState([])

    useEffect(() => {
        axios
            .get("/schedules")
            .then((response) => setSchedules(response.data.items))
            .catch((error) => console.error(error))
    }, [])

    const onCreateSchedule = () => {
        navigate("new")
    }

    const onRemoveSchedule = async (id) => {

        try {
            await axios.delete(`/schedules/${id}`)

            setSchedules(schedules.filter((schedule) => schedule._id !== id))
            showNotification(
                {
                    message: "Schedule Removed",
                    autoClose: true,
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.cyan[4],
                            borderColor: theme.colors.cyan[4],
                            '&:hover': { backgroundColor: theme.colors.cyan[5] },
                        },
                        closeButton: {
                            color: theme.white,
                            '&:hover': { backgroundColor: theme.colors.blue[4] },
                        },
                    })
                })

        } catch (error) {
            console.error(error)
            showNotification(
                {
                    message: error.response.data.message,
                    autoClose: true,
                    styles: (theme) => ({
                        root: {
                            backgroundColor: theme.colors.red[4],
                            borderColor: theme.colors.red[4],
                            '&:hover': { backgroundColor: theme.colors.red[5] },
                        },
                        closeButton: {
                            color: theme.white,
                            '&:hover': { backgroundColor: theme.colors.gray[6] },
                        },
                    })
                })

        }
    }

    return (
        <div>
            <h2>Schedule: </h2>
            <Button
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                onClick={onCreateSchedule}>Create Schedule</Button>
            <Table mt={10} horizontalSpacing="md" verticalSpacing="xs" highlightOnHover>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>name</th>
                        <th>email</th>
                        <th>password</th>
                        <th>birthDate</th>
                        <th>schedulingDate</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule, index) => (
                        <tr key={index}>
                            <td>{schedule._id}</td>
                            <td>{schedule.name}</td>
                            <td>{schedule.email}</td>
                            <td>{schedule.password}</td>
                            <td>{schedule.birthDate}</td>
                            <td>{schedule.schedulingDate}</td>
                            <td>
                                <Button leftIcon={<Pencil />}
                                    variant="gradient"
                                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                                    onClick={() => navigate(schedule._id)}>edit schedule</Button>

                                <Button leftIcon={<Trash />}
                                    ml={10}
                                    variant="gradient"
                                    gradient={{ from: 'orange', to: 'red' }}
                                    onClick={() => onRemoveSchedule(schedule._id)}>remove schedule</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    )
}

export default Schedule