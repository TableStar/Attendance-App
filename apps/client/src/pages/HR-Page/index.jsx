import { useSelector } from "react-redux";
import EmployeeTable from "./EmployeeTable";
import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { keepLogin } from "../../redux/slice/employeeSlice";
import { useNavigate } from "react-router-dom";

const HRPage = () => {
  const employee = useSelector((state) => state.employeeReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasRender = useRef(false);
  useEffect(() => {
    if (!employee.role.includes("human") && hasRender.current) {
      console.log(employee);
      console.log("okay");
      navigate("/auth/login");
    }
  }, [hasRender.current]);
  useEffect(() => {
    dispatch(keepLogin());

    hasRender.current = true;
  }, []);

  return <div>{employee?.role ? <EmployeeTable /> : <div></div>}</div>;
};

export default HRPage;
