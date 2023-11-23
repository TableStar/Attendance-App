import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../../helper";
import { useDispatch } from "react-redux";
import { getAllEmployee } from "../../redux/slice/listSlice";
import { useSelector } from "react-redux";

export function ModalForEmployeeCRUD(props) {
  const employee = useSelector((state) => state.employeeListReducer);
  const [inUsername, setInUsername] = useState();
  const [inRole, setInRole] = useState();
  const [inEmail, setInEmail] = useState();
  const [inPassword, setInPassword] = useState();
  const dispatch = useDispatch();
  console.log(props.addOrEdit);
  console.log(inRole);
  const onClickSubmit = async (addOrEdit) => {
    try {
      if (addOrEdit !== 0) {
        console.log("EDIT");
        console.log("EDITSUBMIT", addOrEdit);
        const response = await axios.patch(
          API_URL + `/api/auths/${addOrEdit}`,
          {
            username: inUsername,
            email: inEmail,
            role: inRole,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(
          "🚀 ~ file: ModalForEmployeeCRUD.jsx:45 ~ onClickSubmit ~ response Edit:",
          response
        );
        dispatch(getAllEmployee());
        props.handleOpen();
      } else {
        console.log("ADD");
        const response = await axios.post(
          API_URL + "/api/auths",
          {
            username: inUsername,
            password: inPassword,
            email: inEmail,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        dispatch(getAllEmployee());
        props.handleOpen();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const temuIndex = () => {
    const index = employee.findIndex((val) => {
      return val.id === props.addOrEdit;
    });
    return index;
  };
  const index = temuIndex();
  useEffect(() => {
    if (props.addOrEdit > 0) {
      console.log("temuIndex", index);
      console.log(index);
      setInUsername(employee[index]?.username);
      setInEmail(employee[index]?.email);
    }
  }, [props.addOrEdit]);
  return (
    <>
      <Dialog open={props.open} size="xs" handler={props.handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader className="flex flex-col items-start">
            {" "}
            <Typography className="mb-1" variant="h4">
              {props.addOrEdit > 0 ? "Edit Employee" : "Add Employee"}
            </Typography>
          </DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5 hover:cursor-pointer"
            onClick={props.handleOpen}
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody>
          <Typography className="mb-10 -mt-7 " color="gray" variant="lead">
            Insert the Data
          </Typography>
          <div className="grid gap-6">
            <Typography className="-mb-1" color="blue-gray" variant="h6">
              Username
            </Typography>
            <Input
              onChange={(e) => {
                console.log(e.target.value);
                setInUsername(e.target.value);
              }}
              label="Username"
              defaultValue={employee[index]?.username}
            />
            <Input
              label="Email"
              onChange={(e) => {
                setInEmail(e.target.value);
              }}
              defaultValue={employee[index]?.email}
            />
            {props.addOrEdit === 0 ? (
              <Input
                label="Password"
                s
                onChange={(e) => {
                  setInPassword(e.target.value);
                }}
              />
            ) : (
              ""
            )}

            <Select label="Select Version">
              <Option
                onClick={() => {
                  setInRole("employee");
                }}
              >
                Employee
              </Option>
              <Option
                onClick={() => {
                  setInRole("humanResource");
                }}
              >
                Human Resource
              </Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={props.handleOpen}>
            cancel
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => {
              onClickSubmit(props.addOrEdit);
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
