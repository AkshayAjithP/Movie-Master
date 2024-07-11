import React from "react";
import Modal from "antd/es/modal/Modal";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { AddTheatre } from "../../services/theatres";
import { UpdateTheatre } from "../../services/theatres";
function TheatreForm({
  showTheateFormModal,
  setShowTheatreFormModal,
  formType,
  setFormType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    values.owner = user._id;
    try {
      // dispatch(ShowLoading());
      let response = null;
      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }
      if (response.success) {
        message.success(response.message);
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {}
  };
  return (
    <Modal
      title={formType === "add" ? "add Theatre" : "edit Theatre"}
      open={showTheateFormModal}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please  input theatre name" }]}
        >
          <input type="text" />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please  input theatre address" }]}
        >
          <textarea type="text" />
        </Form.Item>

        <Form.Item
          label="Phone number"
          name="phone"
          rules={[
            { required: true, message: "Please  input theatre phone number" },
          ]}
        >
          <input type="Number" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please  input theatre Email id" },
          ]}
        >
          <input type="text" />
        </Form.Item>
        <div className="flex justify-end gap-1">
          <button
            className="border border-primary bg-white text-primary p-1"
            type="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          >
            Cancel
          </button>
          <button className="bg-primary p-1 text-grey" type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;
