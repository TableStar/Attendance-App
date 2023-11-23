import React, { useEffect } from "react"
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Typography, Card, Select, Option } from "@material-tailwind/react";
import { Datepicker } from "flowbite-react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { getPersonalAttendance } from "../../redux/slice/personalAttendanceSlice";
const AttendanceLogPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const dataAttendance = useSelector((state) => { return state.personalAttendanceReducer.attendances })

    const [filterDate, setFilterDate] = React.useState({
        startDate: new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 7} 00:00:00`),
        endDate: new Date(new Date().toLocaleDateString('af-ZA') + " 23:59:59"),
    })
    const [sortBy, setSortBy] = React.useState("ASC")

    useEffect(() => {
        dispatch(getPersonalAttendance(`?startDate=${filterDate.startDate}&endDate=${filterDate.endDate}&sort=${sortBy}`))
    }, [filterDate, sortBy])
    console.log(dataAttendance);
    return <div>
        <div className="relative">
            <ArrowLeftIcon className="text-white h-7 w-7 absolute left-2 top-2" onClick={() => { navigate("/attendance") }} />
            <Typography className="bg-red-800 text-white font-semibold text-xl py-2 flex justify-center">Attendance Log</Typography>
        </div>
        <div className="flex flex-col gap-4 px-6 pt-3 pb-4 border-b-[3px]">
            <div>
                <label htmlFor={"start-date"} className="text-lg font-medium">From:</label>
                <Datepicker id="start-date" title="Start date" defaultDate={new Date(`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - 7} 00:00:00`)} maxDate={new Date(new Date().toLocaleDateString('af-ZA') + " 00:00:00")}
                    onSelectedDateChanged={(e) => { setFilterDate({ ...filterDate, startDate: e }) }} />
            </div>
            <div>
                <label htmlFor={"end-date"} className="text-lg font-medium">To:</label>
                <Datepicker id="end-date" title="End date" minDate={filterDate.startDate}
                    onSelectedDateChanged={(e) => { setFilterDate({ ...filterDate, endDate: e }) }} />
            </div>
        </div>
        <div className="flex flex-col relative gap-4 py-4">
            <div className="absolute right-5">
                <Select label="Sort by" defaultValue={"ASC"} onChange={(e) => { setSortBy(e) }}>
                    <Option value="ASC">Ascending</Option>
                    <Option value="DESC">Descending</Option>
                </Select>
            </div>

            <table className="w-full min-w-max table-auto text-left mt-14">
                <thead>
                    <tr>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                className="font-medium text-lg"
                            >
                                Date
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                className="font-medium text-lg"
                            >
                                Clock in
                            </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <Typography
                                className="font-medium text-lg"
                            >
                                Clock out
                            </Typography>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataAttendance.map(({ clockIn, clockOut }, index) => {
                        let date = (new Date(clockIn).toLocaleDateString("en", { day: "numeric", month: "short" })).split(" ")
                        const isLast = index === dataAttendance.length - 1;
                        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                        return <tr key={index}>
                            <td className={classes}>
                                <Typography
                                    variant="small"
                                    color="black"
                                    className="font-semibold"
                                >
                                    {date[1] + " " + date[0]}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="paragraph"
                                    color={new Date(clockIn) > new Date(`${new Date(clockIn).toLocaleDateString("af-ZA")} 09:00`) ? "red" : "black"}
                                    className="font-normal"
                                >
                                    {new Date(clockIn).toLocaleTimeString("id").replaceAll(".", ":")}
                                </Typography>
                            </td>
                            <td className={classes}>
                                <Typography
                                    variant="paragraph"
                                    color={new Date(clockOut) < new Date(`${new Date(clockOut).toLocaleDateString("af-ZA")} 17:00`) ? "red" : "black"}
                                    className="font-normal"
                                >
                                    {new Date(clockOut).toLocaleTimeString("id").replaceAll(".", ":")}
                                </Typography>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>

        </div>
    </div>
}

export default AttendanceLogPage;