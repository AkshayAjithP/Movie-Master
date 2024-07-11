import React from "react";
import PageTitle from "../../components/PageTitle";
import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatresList from "./TheatresList";
function Admin() {
  return (
    <div>
      <PageTitle title="Admin" />

      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Movies" key="1">
          <MovieList />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Theatres" key="2">
          <TheatresList />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
