import { Table, Button, Text } from "@mantine/core"
import { showNotification } from '@mantine/notifications';
import { useModals } from '@mantine/modals';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Pencil, Trash } from 'tabler-icons-react';
import axios from "../../services/api.js";
import moment from "moment";

const Schedule = () => {
    const navigate = useNavigate()
    const [schedules, setSchedules] = useState([])
    const modals = useModals();

    useEffect(() => {
        axios
            .get("/schedules")
            .then((response) => setSchedules(response.data.items))
            .catch((error) => console.error(error))
    }, [])

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

    const openConfirmModal = (id) => modals.openConfirmModal({
        title: 'Please confirm your action',
        children: (
            <Text size="sm">
                Are you sure you want to remove this schedule?
            </Text>
        ),
        labels: { confirm: 'Confirm', cancel: 'Cancel' },
        onCancel: () => { },
        onConfirm: () => onRemoveSchedule(id),
    });

    const sortSchedules = () => {
        schedules.sort((a, b) => {
            return new Date(a.schedulingDate) - new Date(b.schedulingDate) ||
                new Date(a.schedulingTime) - new Date(b.schedulingTime)
        })
    }



    return (
        <div>
            <h2>Schedules: </h2>

            <>
                {sortSchedules()}
                <Table mt={10} horizontalSpacing="md" verticalSpacing="xs" highlightOnHover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>password</th>
                            <th>birthDate</th>
                            <th>schedulingDate</th>
                            <th>schedulingTime</th>
                            <th>status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr key={index}>
                                <td>{schedule._id}</td>
                                <td>{schedule.name}</td>
                                <td>{schedule.password}</td>
                                <td>{moment(schedule.birthDate).format("DD/MM/YYYY")}</td>
                                <td>{moment(schedule.schedulingDate).format("DD/MM/YYYY")}</td>
                                <td>{moment(schedule.schedulingTime).format("hh:mm A")}</td>
                                <td>{schedule.status}</td>
                                <td>
                                    <Button leftIcon={<Pencil />}
                                        variant="gradient"
                                        gradient={{ from: '#ff4e50', to: '#f9d423', deg: 35 }}
                                        onClick={() => navigate(schedule._id)}>edit schedule</Button>

                                    <Button leftIcon={<Trash />}
                                        ml={10}
                                        variant="gradient"
                                        gradient={{ from: '#e53935', to: '#e35d5b', deg: 35 }}
                                        onClick={() => openConfirmModal(schedule._id)}>remove schedule</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </>
        </div >

    )
}

export default Schedule