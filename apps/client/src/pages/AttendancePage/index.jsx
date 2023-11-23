import { ArrowLeftIcon, ChevronRightIcon, MapPinIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import axios from "axios"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getPersonalAttendance } from "../../redux/slice/personalAttendanceSlice"
import { API_URL } from "../../helper"

const AttendancePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentTime, setCurrentTime] = React.useState("")
    const [currentDate, setCurrentDate] = React.useState("")
    const user = useSelector((state) => { return state.employeeReducer })
    const [location, setLocation] = React.useState()
    const [disabled, setDisabled] = React.useState(false)
    const [disabled2, setDisabled2] = React.useState(true)

    const dataAttendance = useSelector((state) => { return state.personalAttendanceReducer.attendances })


    const getDate = () => {
        let current = new Date()
        let date = current.toDateString().split(" ")
        setCurrentDate(`${date[0]}, ${date[2]} ${date[1]} ${date[3]}`)
    }

    const getTime = () => {
        let temp = new Date()
        let time = temp.toLocaleTimeString("id");
        time = time.split(".")
        setCurrentTime(time.join(":"))
    }

    const getLocation = async () => {
        const getCurrentPosition = () => {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition((position) => { return resolve(position), (error) => { return reject(error) } })
            })
        }
        try {
            const position = await getCurrentPosition()
            const options = {
                method: "GET",
                url: 'https://trueway-geocoding.p.rapidapi.com/ReverseGeocode',
                params: {
                    location: `${position.coords.latitude},${position.coords.longitude}`,
                    languange: "en"
                },
                headers: {
                    "X-RapidAPI-Key": "6e2751ea05msh4e2a6982cd7d959p10e6b8jsn72525ae5f311",
                    "X-RapidAPI-Host": "trueway-geocoding.p.rapidapi.com"
                }
            }
            const response = await axios.request(options)
            return setLocation(response.data.results[0])
        } catch (error) {
            console.error(error)
        }
    }
    const onClockIn = async () => { 
        const response = await axios.post(API_URL + "/api/attendances", { location: location.address }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }) 
        dispatch(getPersonalAttendance(`?filter=today`))
    }

    const onClockOut = async () => {
        const response = await axios.patch(API_URL + "/api/attendances", null, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
        dispatch(getPersonalAttendance(`?filter=today`))
    }


    setInterval(() => { getTime() }, 1000)

    useEffect(() => {
        dataAttendance[0]?.clockIn ? setDisabled(true) : ""
        dataAttendance[0]?.clockOut ? setDisabled2(true) : dataAttendance[0]?.clockIn ? setDisabled2(false) : setDisabled2(true)
    }, [dataAttendance])

    useEffect(() => {
        getTime()
        getDate()
        getLocation()
        dispatch(getPersonalAttendance(`?filter=today`))
    }, [])
    return <div>
        <div className="attendance-header flex flex-col text-[22px] items-center gap-3 bg-red-800 px-4 py-2">
            <ArrowLeftIcon className="text-white h-8 w-8 absolute left-2" onClick={() => { navigate("/") }} />
            <div className="flex text-white w-full flex-row items-center justify-between mt-10">
                <div className="flex flex-col">
                    <Typography variant="h2">{user?.username.split(" ")[0]?.split("")[0]?.toUpperCase() + user.username?.split(" ")[0].slice(1, 20)}</Typography>
                    <Typography className="text-[18px] font-medium">{user?.role.split(" ")[0]?.split("")[0]?.toUpperCase() + user.role?.split(" ")[0].slice(1, 20)}</Typography>
                </div>
                <UserCircleIcon className="w-[55px] h-[55px] text-blue-800 bg-white rounded-full" />
            </div>
            <div className="flex flex-col items-center">
                <h1 className="text-white text-[40px] font-bold tracking-wide">{currentTime}</h1>
                <h1 className="text-white text-[20px] font-light tracking-wider">{currentDate}</h1>
            </div>
            <Card className="w-full mb-4">
                <CardBody className="flex flex-col items-center py-1">
                    <Typography className="text-[18px] mb-1">Schedule for today :</Typography>
                    <Typography variant="h5" className="text-black">Office Hours</Typography>
                    <Typography variant="h3" className="text-black">09:00 - 17:00</Typography>
                </CardBody>
                <CardFooter className="flex flex-col items-center gap-4 border-t-[3px] mt-1 py-3">
                    {location ? <div className="flex flex-row items-center gap-6 w-full">
                        <MapPinIcon className="h-8 w-8 text-green-700" />
                        <Typography className="leading-5 text-base font-medium w-[80%]">{location?.address}</Typography>
                    </div> : ""}
                    <ButtonGroup className="w-full h-[8vh] ">
                        <Button className="w-[50%] bg-blue-800 text-[16px]" disabled={disabled} onClick={() => onClockIn()}>Clock In</Button>
                        <Button className="w-[50%] bg-blue-800 text-[16px]" disabled={disabled2} onClick={() => { onClockOut() }}>Clock Out</Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
        <div className="py-2 px-4">
            <div className="flex justify-between items-center border-b-2 py-2" >
                <Typography className="font-semibold text-lg">Today's activity</Typography>
                <Typography className="text-blue-800 text-base font-normal" onClick={() => {navigate("/attendance/log")}}>Attendance log</Typography>
            </div>
            {dataAttendance.map((value, index) => {
                return <div key={index}>
                    <div className="flex flex-row justify-between items-center border-b-2 py-2 px-1">
                        <Typography style={{ color: new Date(value.clockIn) > new Date(`${new Date().toLocaleDateString("af-ZA")} 09:00`) ? "Red" : "Black" }}
                            className="text-lg font-normal">
                            {new Date(value.clockIn).toLocaleTimeString("id").replaceAll(".", ":")}
                        </Typography>
                        <Typography className="w-24 text-lg font-medium">Clock in</Typography>
                        <ChevronRightIcon className="h-8 w-8" />
                    </div>
                    {value.clockOut ? <div className="flex flex-row justify-between items-center border-b-2 py-2 px-1">
                        <Typography style={{ color: new Date(value.clockOut) < new Date(`${new Date().toLocaleDateString("af-ZA")} 17:00`) ? "Red" : "Black" }}
                            className="text-lg font-normal">
                            {new Date(value.clockOut).toLocaleTimeString("id").replaceAll(".", ":")}
                        </Typography>
                        <Typography className="w-24 text-lg font-medium">Clock out</Typography>
                        <ChevronRightIcon className="h-8 w-8" />
                    </div> : ""}
                </div>
            })}
        </div>
    </div>
}

export default AttendancePage;