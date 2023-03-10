import axios from "axios";
import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Pie } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Report from "../../components/Report";

const Dashboard = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState("");
  const [totalDataResponden, setTotalDataResponden] = useState(0);
  const [totalDataSelesai, setTotalDataSelesai] = useState(0);
  const [totalDataDalamProses, setTotalDataDalamProses] = useState(0);
  const [totalDataBelumMulai, setTotalDataBelumMulai] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pieChart, setPieChart] = useState([""]);
  const [responden, setResponden] = useState([""]);
  const [selesai, setSelesai] = useState([""]);
  const [dalamProses, setDalamProses] = useState([""]);
  const [belumMulai, setBelumMulai] = useState([""]);
  const [type, setType] = useState("");
  const [report, setReport] = useState("");
  const token = localStorage.getItem("token");

  const dataType =
    type === "selesai"
      ? selesai
      : type === "mulai"
      ? belumMulai
      : type === "proses"
      ? dalamProses
      : responden;

  const getData = (pageSize, pageIndex, searchIndex) => {
    axios
      .get(
        `${process.env.REACT_APP_URL}holland/data_total_responden/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        setResponden(res.data.data);
        setTotalDataResponden(res.data.totaldata);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}holland/data_total_selesai/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        setSelesai(res.data.data);
        setTotalDataSelesai(res.data.totaldata);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}holland/data_total_dalam_proses/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        setDalamProses(res.data.data);
        setTotalDataDalamProses(res.data.totaldata);
      });
    axios
      .get(
        `${process.env.REACT_APP_URL}holland/data_total_belum_mulai/${
          pageSize ?? 10
        }/${pageIndex ?? 1}`,
        {
          headers: { Authorization: "Bearer " + token },
          params: { search: searchIndex },
        }
      )
      .then((res) => {
        setBelumMulai(res.data.data);
        setTotalDataBelumMulai(res.data.totaldata);
      });
  };

  useEffect(() => {
    getData();
    axios
      .get(`${process.env.REACT_APP_URL}holland/box_info`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setInfo(res.data);
      });
    axios
      .get(`${process.env.REACT_APP_URL}holland/pie_chart`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setPieChart(res.data);
      });
  }, [token]);

  const dataPie = {
    labels: pieChart.label,
    datasets: [
      {
        // label: 'Rainfall',
        backgroundColor: [
          "#B21F00",
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
        ],
        hoverBackgroundColor: [
          "#501800",
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
        ],
        data: pieChart.data,
      },
    ],
  };

  return (
    <>
      <div className="col-xl-12 col-md-6 mb-1 p-3">
        <div className="card border-left-success shadow h-100 py-2">
          <div className="card-body">
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div className="text-xs fw-bold text-success text-uppercase mb-1">
                  Persentase Penyelesaian
                </div>
                <div className="d-flex justify-content-start">
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.persentase_penyelesaian}%
                  </div>
                  <div class="progress w-100 mt-1 ms-2">
                    <div
                      class="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: `${info.persentase_penyelesaian}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-auto">
                <i class="fas fa-tasks fa-2x text-gray-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row p-3">
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-primary shadow h-100 py-2 pointer"
            onClick={() => setType("responden")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-blue text-uppercase mb-1">
                    Total Responden
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_responden}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-users fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-warning shadow h-100 py-2 pointer"
            onClick={() => setType("selesai")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-warning text-uppercase mb-1">
                    Total Selesai
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_selesai}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-check fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-info shadow h-100 py-2 pointer"
            onClick={() => setType("proses")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-info text-uppercase mb-1">
                    Total Dalam Proses
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_dalam_proses}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-edit fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6 mb-4">
          <div
            className="card border-left-danger shadow h-100 py-2 pointer"
            onClick={() => setType("mulai")}
          >
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs fw-bold text-danger text-uppercase mb-1">
                    Total Belum Mulai
                  </div>
                  <div className="h5 mb-0 fw-bold text-secondary">
                    {info.total_belum_mulai}
                  </div>
                </div>
                <div className="col-auto">
                  <i class="fas fa-times fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card border py-2 mx-3 shadow p-2">
        <div className="card-body d-flex justify-content-center">
          <Pie data={dataPie} className="w-25 h-25" />
        </div>
      </div>
      <div className="card border py-2 mx-3 shadow my-5">
        <div className="card-body">
          <p className="text-blue fw-bold">
            Data{" "}
            {type === "mulai"
              ? "Belum Mulai"
              : type === "selesai"
              ? "Selesai"
              : type === "proses"
              ? "Dalam Proses"
              : "Responden"}
          </p>
          <div className="input-group w-70">
            <span className="input-group-text">
              <i class="fas fa-search text-secondary"></i>
            </span>
            <input
              className="form-control"
              placeholder="Search"
              onChange={(e) => getData(10, 1, e.target.value)}
            />
          </div>
          <table class="table table-bordered mt-2">
            <thead>
              <tr className="bg-blue text-white">
                <th scope="col">Unit</th>
                <th scope="col">Jabatan</th>
                <th scope="col">Nip</th>
                <th scope="col">Fullname</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>
            {dataType.map((item) => (
              <tbody>
                <tr>
                  <th className="fw-normal">{item.unit}</th>
                  <th className="fw-normal">{item.jabatan}</th>
                  <th className="fw-normal">{item.nip}</th>
                  <th className="fw-normal">{item.fullname}</th>
                  <th className="fw-normal">{item.email}</th>
                  <th className="fw-normal">
                    {item.status === "2"
                      ? "Selesai"
                      : item.status === "0"
                      ? "Belum mulai"
                      : "Dalam proses"}
                  </th>
                  <th className="fw-bold text-center">
                    {item.status === "2" ? (
                      <i
                        class="fas fa-arrow-right bg-warning text-white rounded-circle p-1 pointer"
                        onClick={() => setReport(item.id)}
                      ></i>
                    ) : (
                      "-"
                    )}
                  </th>
                </tr>
              </tbody>
            ))}
          </table>
          <PaginationControl
            page={current}
            total={
              type === "selesai"
                ? totalDataSelesai
                : type === "mulai"
                ? totalDataBelumMulai
                : type === "proses"
                ? totalDataDalamProses
                : totalDataResponden
            }
            limit={10}
            changePage={(page, size) => {
              getData(size, page);
              setCurrent(page);
            }}
          />
        </div>
      </div>
      {report ? <Report id={report} /> : ""}
    </>
  );
};

export default Dashboard;
