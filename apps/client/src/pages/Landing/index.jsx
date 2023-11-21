import { useSelector } from "react-redux";
import EmployeeTable from "./EmployeeTable";

const LandingPage = () => {
  const employee = useSelector((state) => state.employeeReducer);
  console.log("🚀 ~ file: index.jsx:5 ~ LandingPage ~ employee:", employee);
  return <div>{employee.role ? <EmployeeTable /> : <EmployeeTable />}</div>;
};

export default LandingPage;
