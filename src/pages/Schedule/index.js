import { Table, Button } from "@mantine/core"
import { useState } from "react"
import { Pencil, Trash } from 'tabler-icons-react';


const Schedule = () => {

    const [schedules, setSchedule] = useState([
        {
            id: 1,
            name: "jo",
            email: "aaa@a.br",
            password: "dsadas",
            birthDate: "",
            schedulingDate: ""
        },
    ])

    return (
        <div>
            <h2>Schedule</h2>
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
                        < tr key={index} >
                            <td>{schedule.id}</td>
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