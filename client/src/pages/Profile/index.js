import React from "react";
import { Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import TheatreList from "./TheatreList";
import Booking from "./Shows/Booking";
import { GetCurrentUser } from "../../services/users";

const Profile = () => {
  return (
    <div>
      <PageTitle title="Profile" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Booking" key="1">
          <Booking />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Theatres" key="2">
          <TheatreList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
