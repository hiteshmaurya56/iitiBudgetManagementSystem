import React, { useContext, useEffect, useState } from "react";
import YearContext from "../../contexts/year/YearContext";
import AlertContext from "../../contexts/alert/AlertContext";
import DepartmentContext from "../../contexts/department/DepartmentContext";
import { useNavigate } from "react-router-dom";
import "./home.css";

const DeptHome = () => {
  const { year } = useContext(YearContext);
  const { setDepartment } = useContext(DepartmentContext);
  const { unSuccessful } = useContext(AlertContext);
  const initial = {
    budget: 0,
    expenditure: 0,
    in_process: 0,
    indents_process: [],
    direct_purchases: [],
  };
  const [equipment, setEquipment] = useState(initial);
  const [consumable, setConsumable] = useState(initial);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch(
      `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/budget/fetchbudget?year=${year}`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("authToken"),
        },
      }
    );
    const json = await response.json();
    if (json.error) {
      unSuccessful(json.error);
    } else {
      let { equipment, consumable } = json;
      equipment.type = 1;
      consumable.type = 0;
      setEquipment(equipment);
      setConsumable(consumable);
      setName(equipment.department);
      console.log(json);
    }
  };
  useEffect(() => {
    fetchData();
  }, [year]);

  const handleClick = (type) => {
    if (type) setDepartment(equipment);
    else setDepartment(consumable);
    navigate("/dept/details");
  };

  return (
    <>
      <div
        className="p-4"
        style={{ backgroundColor: "white", minHeight: "94vh" }}
      >
        <h1 className="m-3 text-center">{name}</h1>
        <h2 className="m-3 text-center">
          Year {year}-{(year % 100) + 1}
        </h2>
        <div className="p-4">
          <table>
            <thead>
              <tr>
                <th>Budget Type</th>
                <th>Budget Allocated</th>
                <th>Expenditure</th>
                <th>Available</th>
                <th>%Utilised</th>
              </tr>
            </thead>
            <tbody>
              <tr role="button" onClick={handleClick}>
                <td>Equipment Budget</td>
                <td>{equipment.budget}</td>
                <td>{equipment.expenditure}</td>
                <td>{equipment.in_process}</td>
                <td>
                  {((equipment.expenditure * 100) / equipment.budget).toFixed(
                    2
                  )}
                  %
                </td>
              </tr>
              <tr role="button" onClick={handleClick}>
                <td>Consumable Budget</td>
                <td>{consumable.budget}</td>
                <td>{consumable.expenditure}</td>
                <td>{consumable.in_process}</td>
                <td>
                  {((consumable.expenditure * 100) / consumable.budget).toFixed(
                    2
                  )}
                  %
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DeptHome;
