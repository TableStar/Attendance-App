import { ArrowLeftIcon, MapPinIcon, UserCircleIcon } from "@heroicons/react/24/solid"
import { Button, ButtonGroup, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react"
import axios from "axios"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const AttendancePage = () => {
    const navigate = useNavigate()
    const [currentTime, setCurrentTime] = React.useState("")
    const [currentDate, setCurrentDate] = React.useState("")
    const user = useSelector((state) => { return state.employeeReducer })
    const [location, setLocation] = React.useState()
    const [disabled, setDisabled] = React.useState(false)

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
    // console.log(location);
    setInterval(() => {
        getTime()
    }, 1000)

    useEffect(() => {
        getTime()
        getDate()
        getLocation()
    }, [])
    return <div>
        <div className="attendance-header flex flex-col text-[22px] items-center gap-3 bg-red-800 px-4 py-2">
            <ArrowLeftIcon className="text-white h-8 w-8 absolute left-2" onClick={() => {navigate("/")}}/>
            <div className="flex text-white w-full flex-row items-center justify-between mt-10">
                <div className="flex flex-col">
                    <Typography variant="h2">{user?.username.split(" ")[0]?.split("")[0]?.toUpperCase() + user.username?.split(" ")[0].slice(1,20)}</Typography>
                    <Typography className="text-[18px] font-medium">{user?.role.split(" ")[0]?.split("")[0]?.toUpperCase() + user.role?.split(" ")[0].slice(1,20)}</Typography>
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
                        <Button className="w-[50%] bg-blue-800 text-[16px]" disabled={disabled} onClick={() => {setDisabled(!disabled)}}>Clock In</Button>
                        <Button className="w-[50%] bg-blue-800 text-[16px]" disabled={!disabled} onClick={() => {setDisabled(!disabled)}}>Clock Out</Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
        <div className="py-2">
            <div className="flex justify-between items-center px-4 border-b-2 py-2" >
                <Typography className="font-semibold text-lg">Today's activity</Typography>
                <Typography className="text-gray-600">Attendance log</Typography>
            </div>
        </div>
    </div>
}

export default AttendancePage;