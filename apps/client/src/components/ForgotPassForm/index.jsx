import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { API_URL } from "../../helper";

export function ForgotPassForm(props) {
  const [inEmail, setInEmail] = useState("");
  const [hasSend, setHasSend] = useState(false);
  const onClickSubmitEmail = async () => {
    try {
      const response = await axios.post(API_URL + "/api/forgot/password", {
        email: inEmail,
      });
      console.log(response);
      setHasSend(true);
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <Dialog open={props.open} handler={props.handleOpen}>
      {hasSend ? (
        <DialogHeader className="flex flex-col content-center items-center justify-center">
          {" "}
          <Typography variant="h5" color="blue-gray" className="content-center">
            Your Password has been sent
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Check your Email
          </Typography>
        </DialogHeader>
      ) : (
        <DialogHeader className="flex flex-col content-center items-center justify-center">
          {" "}
          <Typography variant="h5" color="blue-gray" className="content-center">
            Did you forgot your password?
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Dont panic! Put your email here
          </Typography>
        </DialogHeader>
      )}

      {hasSend ? (
        ""
      ) : (
        <DialogBody>
          <Card
            color="transparent"
            shadow={false}
            className="flex flex-col justify-center items-center content-center"
          >
            <form className="mt-2 mb-2 w-52 max-w-screen-lg sm:w-96">
              <div className="mb-1 flex flex-col gap-6">
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Your Email
                </Typography>
                <Input
                  size="lg"
                  placeholder="name@mail.com"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(e) => {
                    setInEmail(e.target.value);
                  }}
                />
              </div>
            </form>
          </Card>
        </DialogBody>
      )}
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={props.handleOpen}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        {hasSend ? (
          ""
        ) : (
          <Button variant="gradient" color="red" onClick={onClickSubmitEmail}>
            <span>Confirm</span>
          </Button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
