import { Table, Button } from "@mantine/core"
import { useEffect, useState } from "react"
import { Pencil, Trash } from 'tabler-icons-react';
import axios from "../../services/api.js";




const Schedule = () => {

    const [schedules, setSchedules] = useState([])

    useEffect(() => {

        axios
            .get("/schedules")
            .then((response) => setSchedules(response.data.items))
            .catch((error) => console.error(error))
    }, [])

    return (
        <div>
            {console.log(schedules)}
            <h2>Schedule: </h2>
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
                                    gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>edit schedule</Button>

                                <Button leftIcon={<Trash />}
                                    ml={10}
                                    variant="gradient"
                                    gradient={{ from: 'orange', to: 'red' }}>remove schedule</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div >
    )
}

export default Schedule