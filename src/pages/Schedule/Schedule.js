import { useState, useEffect, useCallback } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate, useParams } from "react-router-dom"
import { InputWrapper, Input, Button, Grid, Select, PasswordInput } from "@mantine/core";
import { showNotification } from '@mantine/notifications';
import { EyeCheck, EyeOff } from 'tabler-icons-react';
import axios from "../../services/api.js"
import { Form, Formik } from "formik";
import * as yup from "yup"


const Schedule = () => {

    const { scheduleId } = useParams()
    const navigate = useNavigate()

    const isNewSchedule = scheduleId === "new"
    const pageTitle = isNewSchedule ? "Create Schedule" : "Edit Schedule"


    const validate = yup.object({
        name: yup
            .string()
            .required("No name provided")
            .matches(/^[a-zA-Z ]+$/, "invalid name! please, try again")
            .max(50),
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
        birthDate: new Date(),
        schedulingDate: new Date(),
        schedulingTime: new Date(),
        status: "",
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const validateForm = useCallback(() => {
        if (!(form.name === "" && form.password === "")) {
            return true
        }
        return false
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


    const onSubmit = useCallback(async () => {
        if (validateForm) {
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
    }, [form, isNewSchedule, navigate, scheduleId, validateForm])

    const [, setStartDate] = useState(new Date());

    return (
        <div>
            <h2>{pageTitle}</h2>

            <Formik
                initialValues={form}
                enableReinitialize={true}
                validationSchema={validate}
            >

                {({ handleBlur, errors }) => {

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
                                {errors.name && (
                                    <div style={{ color: "red" }}>{errors.name}</div>
                                )}

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
                            {errors.password && (
                                <div style={{ color: "red" }}>{errors.password}</div>
                            )}

                            <Grid>
                                <Grid.Col lg={2} >
                                    <InputWrapper mb={20} label="birth date">
                                        <DatePicker
                                            maxDate={new Date()}
                                            dateFormat={"dd/MM/yyyy"}
                                            withPortal
                                            name={form.birthDate}
                                            selected={form.birthDate ? Date.parse(form.birthDate) : new Date()}
                                            onChange={(date) => { setStartDate(date); getBirthDate(date) }}
                                        />

                                        {errors.birthDate && (
                                            <div style={{ color: "red" }}>{errors.birthDate}</div>
                                        )}
                                    </InputWrapper>
                                </Grid.Col>

                                <Grid.Col lg={2}>
                                    <InputWrapper mb={20} label="schedule date">
                                        <DatePicker
                                            minDate={new Date()}
                                            dateFormat={"dd/MM/yyyy"}
                                            withPortal
                                            name={form.schedulingDate}
                                            selected={form.schedulingDate ? Date.parse(form.schedulingDate) : new Date()}
                                            onChange={(date) => { setStartDate(date); getScheduleDate(date) }}
                                        />
                                        {errors.schedulingDate && (
                                            <div style={{ color: "red" }}>{errors.schedulingDate}</div>
                                        )}
                                    </InputWrapper>
                                </Grid.Col>

                                <Grid.Col lg={2}>
                                    <InputWrapper label="schedule time">
                                        <DatePicker
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={60}
                                            dateFormat="hh:mm"
                                            withPortal
                                            name={form.schedulingTime}
                                            selected={form.schedulingTime ? Date.parse(form.schedulingTime) : new Date()}
                                            onChange={(date) => { setStartDate(date); getTime(date) }}
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
                                name={form.status}
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

