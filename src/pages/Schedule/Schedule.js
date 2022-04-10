import { useState, useEffect, useCallback } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { InputWrapper, Input, Button, PasswordInput} from "@mantine/core";
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import axios from "../../services/api.js"

const Schedule = () => {

    const { scheduleId } = useParams()
    const navigate = useNavigate()

    const isNewSchedule = scheduleId === "new"
    const pageTitle = isNewSchedule ? "Create Schedule" : "Edit Schedule"

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        birthDate: "",
        scheduleDate: "",
    })

    useEffect(() => {
        if (!isNewSchedule) {
            axios
                .get(`/schedules/${scheduleId}`)
                .then((response) => setForm({ ...response.data }))
                .catch((error) => {
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
                                    '&:hover': { backgroundColor: theme.colors.gray[5] },
                                },
                            })
                        })
                    navigate("/schedule")
                })
        }
    }, [navigate, scheduleId, isNewSchedule])

    const onChange = (event) => {
        setForm((prevState) => {
            return { ...prevState, [event.target.name]: event.target.value }
        })
    }

    const onSubmit = useCallback( async () => {
        try{
            if(isNewSchedule){
                await axios.post("/schedules", form)
            }
            else{
                await axios.put(`/schedules/${scheduleId}`,form)
            }

            showNotification(
                {
                    message: `Schedule ${isNewSchedule ? "created" : "updated"}`,
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

            navigate("/schedule")
        }catch(error){
            alert(error.message)
        }
    },[form,isNewSchedule,navigate,scheduleId])

    return (
        <div>
            <h2>{pageTitle}</h2>
            <InputWrapper id="name" required label="name" size="md">
                <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={onChange} />
            </InputWrapper>

            <InputWrapper mb={10} id="email" required label="email" size="md">
                <Input
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={onChange} />
            </InputWrapper>

            <PasswordInput
                mb={10}
                name="password"
                label="password"
                value={form.password}
                required
                placeholder="Change visibility toggle icon"
                onChange={onChange}
                visibilityToggleIcon={({ reveal, size }) =>
                    reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                }
            />

            {/* react-date-picker para tratar dos campos birthDate e scheduleDate */}

            <Button mt={10} variant="gradient" gradient={{ from: 'teal', to: 'blue', deg: 60 }} onClick={onSubmit}>{pageTitle}</Button>

        </div>
    )





}

export default Schedule

