import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Table, message } from "antd";
import { GetAllTheatres, UpdateTheatre } from "../../services/theatres";
import { useSelector } from "react-redux";
function TheatreList() {
  const [theatres = [], setTheatres] = useState([]);

  const getData = async () => {
    try {
      const response = await GetAllTheatres();
      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = async (theatre) => {
    try {
      const response = await UpdateTheatre({
        theatreId: theatre._id,
        ...theatre,
        isActive: !theatre.isActive,
      });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch {
      message.error(message.error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Status",
      dataIndex: "isActive",
      render: (text, record) => {
        if (text) {
          return "Approved";
        } else {
          return "Pending/blocked";
        }
      },
    },
    {
      title: "Action",
      dateIndex: "action",
      render: (text, record) => {
        return (
          <div className="flex gap-1">
            {record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Block
              </span>
            )}
            {!record.isActive && (
              <span
                className="underline"
                onClick={() => handleStatusChange(record)}
              >
                Approve
              </span>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={theatres} />
    </div>
  );
}

export default TheatreList;
