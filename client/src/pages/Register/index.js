import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../services/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loaderSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex justify-center h-screen item-center bg-primary">
      <div className=" p-3 w-400 card ">
        <center>
          {" "}
          <h1 className="text-xl mb-1">MovieMaster-Register</h1>{" "}
        </center>
        <hr />

        <Form layout="vertical" className="mt-1" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please Provide Name" }]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="email"
            name="email"
            rules={[{ required: true, message: "Please Provide email" }]}
          >
            <input type="email" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please Provide password" }]}
          >
            <input type="password" />
          </Form.Item>
          {/* <Button type="primary" htmlType="submit" title="Register" /> */}
          <div className="flex flex-col mt-2 gap-1">
            <Button fullWidth title="Register" variant={"outlined"} />
          </div>
          <Link to="/login"> Already have an account ? Login</Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;
