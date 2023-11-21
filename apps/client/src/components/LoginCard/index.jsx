import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../helper";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slice/employeeSlice";

export function LoginCard() {
  const [inUsername, setInUsername] = useState("");
  const [inPassword, setInPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onHandleLogin = async () => {
    try {
      const result = await axios.post(API_URL + "/api/auths/login", {
        username: inUsername,
        password: inPassword,
      });
      localStorage.setItem("token", result.data.result.token);
      dispatch(login(result.data.result));

      if (result.data.result.role === "humanResource") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("🚀 ~ file: index.jsx:14 ~ inUsername:", inUsername);
  return (
    <Card className="w-full flex flex-col justify-center content-center">
      <CardHeader
        variant="filled"
        className="mb-4 grid h-28 place-items-center bg-red-600"
      >
        <Typography variant="h2" color="white">
          Company Name
        </Typography>
        <Typography variant="h3" color="white">
          Login
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <Input
          label="Username"
          onChange={(e) => {
            setInUsername(e.target.value);
          }}
          size="lg"
        />
        <Input
          label="Password"
          onChange={(e) => {
            setInPassword(e.target.value);
          }}
          size="lg"
        />
      </CardBody>
      <CardFooter className="pt-0">
        <Button fullWidth onClick={onHandleLogin} className=" bg-red-600">
          Login
        </Button>
        <Typography variant="small" className="mt-6 flex justify-center">
          Forgot password?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold hover:underline hover:cursor-pointer"
          >
            Click here
          </Typography>
        </Typography>
      </CardFooter>
    </Card>
  );
}
