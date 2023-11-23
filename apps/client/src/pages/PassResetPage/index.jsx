import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../../helper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function PassResetForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const paramsToken = urlParams.get("token");
  const [inPassword, setInPassword] = useState("");
  const [inPasswordConfirm, setInPasswordConfirm] = useState("");
  const navigate = useNavigate()
  const onClickSubmitPass = async () => {
    try {
      const response = await axios.post(
        API_URL + "/api/forgot/resetpass",
        {
          password: inPassword,
          passwordConfirm: inPasswordConfirm,
        },
        { headers: { Authorization: `Bearer ${paramsToken}` } }
      );
      console.log(
        "🚀 ~ file: PasswordChangeForm.jsx:36 ~ onClickSubmitPass ~ response:",
        response
      );
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Reset Password
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Now you can enter your new Password
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-1">
              Your New Password
            </Typography>
            <Input
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => {
                setInPassword(e.target.value)
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-1">
              Confirm Your New Password
            </Typography>
            <Input
             
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => {
                setInPasswordConfirm(e.target.value)
              }}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
             {inPassword.length >= 1 && inPassword !== inPasswordConfirm ? (
              <p className="text-red-500 text-xs italic">
                Passwords do not MATCH.
              </p>
            ) : (
              <div className=" h-4"></div>
            )}
          </div>

          <Button onClick={onClickSubmitPass} className="mt-6" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
}
