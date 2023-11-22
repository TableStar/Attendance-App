import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllEmployee } from "../../redux/slice/listSlice";
import { useSelector } from "react-redux";
import { ModalForEmployeeCRUD } from "./ModalForEmployeeCRUD";
import axios from "axios";
import { API_URL } from "../../helper";

const TABLE_HEAD = ["Employees", "Status", ""];

const EmployeeTable = (props) => {
  const [addOrEdit, setAddOrEdit] = useState(0);
  const [open, setOpen] = useState(false);
  const listEmployee = useSelector((state) => state.employeeListReducer);
  const dispatch = useDispatch();
  const handleOpen = () => setOpen(!open);
  const onHandleDelete = async (id) => {
    try {
      const response = await axios.delete(API_URL + `/api/auths/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(response);
      dispatch(getAllEmployee());
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    dispatch(getAllEmployee());
    console.log(listEmployee);
  }, []);
  console.log(props);
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Employee list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              onClick={() => {
                setAddOrEdit(0);
                handleOpen();
              }}
              className="flex items-center gap-3 bg-red-500"
              size="sm"
            >
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className=" px-0">
        <table className="mt-4 w-full table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listEmployee.map(
              (
                { profilePic, username, email, role, org, status, date, id },
                index
              ) => {
                const isLast = index === listEmployee.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
                return (
                  <tr key={index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src={`${profilePic}`}
                          alt={username}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            color="blue-gray"
                            className="font-normal text-xs"
                          >
                            {username}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="font-normal opacity-70 text-xs"
                          >
                            {email}
                          </Typography>
                          <Typography
                            color="blue-gray"
                            className="font-normal text-xs"
                          >
                            {role}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={`${classes}`}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={status ? "enabled" : "disabled"}
                          color={status ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-row">
                        <Tooltip content="Edit User">
                          <IconButton
                            onClick={() => {
                              setAddOrEdit(id);
                              handleOpen();
                            }}
                            variant="text"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip content="Delete User">
                          <IconButton
                            onClick={() => onHandleDelete(id)}
                            variant="text"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      <ModalForEmployeeCRUD
        open={open}
        handleOpen={() => {
          handleOpen();
        }}
        addOrEdit={addOrEdit}
      />
    </Card>
  );
};
export default EmployeeTable;
