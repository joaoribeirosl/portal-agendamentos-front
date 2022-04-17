import { useState, useEffect, useCallback } from "react"
import DatePicker, { registerLocale } from "react-datepicker"
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate, useParams } from "react-router-dom"
import { InputWrapper, Input, Button, Grid, Select, PasswordInput } from "@mantine/core";
import { showNotification } from '@mantine/notifications';
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import axios from "../../services/api.js"
import { Form, Formik } from "formik";
import * as yup from "yup"
import moment from "moment";
import br from 'date-fns/locale/pt-BR'
registerLocale("br", br)
moment.locale("pt-BR")

const Schedule = () => {

    const { scheduleId } = useParams()
    const navigate = useNavigate()
    const isNewSchedule = scheduleId === "new"
    const pageTitle = isNewSchedule ? "Create Schedule" : "Edit Schedule"

    const validate = yup.object({
        name: yup
            .string()
            .required("No name provided")
            .min(3, "Name is too short - should be 3 chars minimum")
            .max(50, "Name is too long - should be 50 chars maximum")
            .matches(/^[a-zA-Z ]+$/, "invalid name! please, try again"),
        password: yup
            .string()
            .required("No password provided")
            .min(8, "Password is too short - should be 8 chars minimum")
            .matches(/[a-zA-Z]/, "Password can only contain Latin letters"),
        birthDate: yup
            .string()
            .required("No birth date provided"),
        schedulingDate: yup
            .string()
            .required("No scheduling date provided"),
        schedulingTime: yup
            .string()
            .required("No scheduling time provided"),

    })


    const [form, setForm] = useState({
        name: "",
        password: "",
        birthDate: "",
        schedulingDate: "",
        schedulingTime: "",
        status: "NOT_SERVED",
    })

    const getBirthDate = (date) => {
        form.birthDate = date
    }

    const getScheduleDate = (date) => {
        form.schedulingDate = date
    }

    const getTime = (date) => {
        form.schedulingTime = date
    }

    const validateForm = form => {
        if (
            (form.name !== "" && form.name.length >= 3) && 
            (form.password !== "" && form.password.length >= 8) &&
            form.birthDate !== "" && 
            form.schedulingDate !== "" &&
            form.schedulingTime !== "" && 
            form.status !== ""
        ) {
            return true
        }
        return false
    }

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

    const onSubmit = useCallback(async () => {

        let newDate = new Date(form.schedulingDate)
        newDate.setHours(0, 0, 0, 0)
        form.schedulingDate = newDate.toISOString()

        let newTime = new Date(form.schedulingTime)
        newTime.setSeconds(0, 0)
        form.schedulingTime = newTime.toISOString()


        const timePath = await axios.get(`/schedules/date/${newDate}/${newTime}`)
        const time = timePath.data.item

        if (time >= 2) {
            showNotification(
                {
                    message: "You cannot create more than 2 entries for the same time !",
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
                }
            )
        }
        else {
            const datePath = await axios.get(`/schedules/date/${newDate}`)
            const date = datePath.data.item

            if (date >= 20) {
                showNotification(
                    {
                        message: "You cannot create more than 20 entries for the same date !",
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
                    }
                )
            }
            else {

                try {

                    if (isNewSchedule) {
                        await axios.post("/schedules", form)
                    }
                    else {
                        await axios.put(`/schedules/${scheduleId}`, form)
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
                } catch (error) {
                    alert(error.message)
                }
            }
        }
    }, [form, isNewSchedule, navigate, scheduleId])

    const [, setStartDate] = useState(new Date())

    return (
        <div>
            <h2>{pageTitle}</h2>
            
            <Formik
                initialValues={form}
                enableReinitialize
                validationSchema={validate}
            >
                {({ handleBlur, errors, touched, values}) => {
                    return (
                        <Form>
                            <InputWrapper id="name" required label="name" size="md">
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={onChange}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? (
                                    <div style={{ color: "red" }}>{errors.name}</div>
                                ) : null}

                            </InputWrapper>

                            <PasswordInput
                                mb={10}
                                name="password"
                                label="password"
                                value={form.password}
                                required
                                placeholder="Change visibility toggle icon"
                                onChange={onChange}
                                onBlur={handleBlur}
                                visibilityToggleIcon={({ reveal, size }) =>
                                    reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />
                                }
                            />
                            {errors.password && touched.password ? (
                                <div style={{ color: "red" }}>{errors.password}</div>
                            ) : null}

                            <Grid>
                                <Grid.Col lg={2} >
                                    <InputWrapper required id="birthDate" mb={20} label="birth date">
                                        <DatePicker
                                            maxDate={new Date()}
                                            dateFormat={"dd/MM/yyyy"}
                                            withPortal
                                            value={form.birthDate}
                                            selected={form.birthDate ? Date.parse(form.birthDate) : new Date()}
                                            onChange={(date) => { setStartDate(date); getBirthDate(date) }}
                                        />

                                        {errors.birthDate && (
                                            <div style={{ color: "red" }}>{errors.birthDate}</div>
                                        )}
                                    </InputWrapper>
                                </Grid.Col>

                                <Grid.Col lg={2}>
                                    <InputWrapper id="schedulingDate" required mb={20} label="schedule date">
                                        <DatePicker
                                            minDate={new Date()}
                                            dateFormat={"dd/MM/yyyy"}
                                            withPortal
                                            value={form.schedulingDate}
                                            selected={form.schedulingDate ? Date.parse(form.schedulingDate) : new Date()}
                                            onChange={(date) => { setStartDate(date); getScheduleDate(date) }}
                                        />
                                        {errors.schedulingDate && (
                                            <div style={{ color: "red" }}>{errors.schedulingDate}</div>
                                        )}
                                    </InputWrapper>
                                </Grid.Col>

                                <Grid.Col lg={2}>
                                    <InputWrapper id="schedulingTime" required label="schedule time" >
                                        <DatePicker
                                            id="schedulingTime"
                                            showTimeSelect
                                            minTime={setHours(setMinutes(new Date(), 0), 6)}
                                            maxTime={setHours(setMinutes(new Date(), 0), 18)}
                                            showTimeSelectOnly
                                            timeIntervals={60}
                                            dateFormat="hh:mm a"
                                            withPortal
                                            value={form.schedulingTime}
                                            selected={form.schedulingTime ? Date.parse(form.schedulingTime) : new Date()}
                                            onChange={(date) => { setStartDate(date); getTime(date) }}
                                            locale={br}
                                        />
                                        {errors.schedulingTime && (
                                            <div style={{ color: "red" }}>{errors.schedulingTime}</div>
                                        )}

                                    </InputWrapper>
                                </Grid.Col>
                            </Grid>

                            <Select
                                required
                                label="was served?"
                                placeholder="pick one"
                                value={form.status}
                                defaultValue="NOT_SERVED"
                                onChange={(value) => onChange({ target: { name: "status", value } })}
                                data={[
                                    { value: "SERVED", label: "served" },
                                    { value: "NOT_SERVED", label: "not served" },
                                ]}
                            />

                            <Button
                                mt={50}
                                variant="gradient"
                                gradient={{ from: 'teal', to: 'blue', deg: 60 }}
                                onClick={onSubmit}
                                disabled={!validateForm(values)}
                            >
                                {pageTitle}
                            </Button>
                        </Form>
                    )
                }}
            </Formik >
        </div>
    )
}

export default Schedule

