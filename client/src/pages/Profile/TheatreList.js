import React, { useState } from "react";
import Button from "../../components/Button";
import TheatreForm from "./TheatreForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Table, message } from "antd";
import { DeleteTheatre, GetAllTheatresByOwner } from "../../services/theatres";
import { useSelector } from "react-redux";
import Shows from "./Shows";
function TheatreList() {
  const { user } = useSelector((state) => state.users);
  const [showTheateFormModal = false, setShowTheatreFormModal] =
    useState(false);
  const [selectedTheatre = null, setSelectedTheatre] = useState(null);
  const [formType = "add", setFormType] = useState("add");
  const [theatres = [], setTheatres] = useState([]);
  const [openShowsModal = false, setOpenShowsModal] = useState(false);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await GetAllTheatresByOwner({ owner: user._id });
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

  const handleDelete = async (id) => {
    try {
      const response = await DeleteTheatre({ theatreId: id });
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
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
            <button
              className="bg-primary p-1 text-grey cursor-pointer"
              onClick={() => {
                setFormType("edit");
                setSelectedTheatre(record);
                setShowTheatreFormModal(true);
              }}
            >
              Edit
            </button>
            <button
              className="bg-secondary p-1 text-grey cursor-pointer"
              onClick={() => {
                handleDelete(record._id);
              }}
            >
              delete
            </button>
            {record.isActive && (
              <button
                className="bg-primary p-1 text-grey cursor-pointer"
                onClick={() => {
                  setSelectedTheatre(record);
                  setOpenShowsModal(true);
                }}
              >
                Shows
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          variant="outlined"
          title="Add theatre"
          onClick={() => {
            setFormType("add");
            setShowTheatreFormModal(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={theatres} />
      {showTheateFormModal && (
        <TheatreForm
          showTheateFormModal={showTheateFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          setFormType={setFormType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}

      {openShowsModal && (
        <Shows
          openShowsModal={openShowsModal}
          setOpenShowsModal={setOpenShowsModal}
          theatre={selectedTheatre}
        />
      )}
    </div>
  );
}

export default TheatreList;
