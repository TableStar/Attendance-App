import { useSelector } from "react-redux";
import EmployeeTable from "../HR-Page/EmployeeTable";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { keepLogin } from "../../redux/slice/employeeSlice";
import { Button, ButtonGroup, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const employee = useSelector((state) => state.employeeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  console.log("🚀 ~ file: index.jsx:5 ~ LandingPage ~ employee:", employee);
  return (
    <div className="px-10 py-10">
      <div className="min-h-screen w-full flex flex-col content-center">
        <Typography variant="h2">Welcome, {employee.username.split("-")[2] || employee.username}</Typography>
        <ButtonGroup
          size="lg"
          color="red"
          className="w-full flex flex-col gap-y-4 my-20"
        >
          <Button
            disabled={!employee.role.includes("human") ? true : false}
            onClick={() => {
              navigate("/humanres");
            }}
          >
            Employee Management
          </Button>
          <Button onClick={() => {navigate("/attendance")}}>Live Attendance</Button>
          <Button>C</Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default LandingPage;
