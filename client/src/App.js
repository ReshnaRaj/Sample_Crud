import { useEffect, useState } from "react";
import "./App.css";
import Formtable from "./components/Formtable";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:4001/";

function App() {
  const [addsection, setAddsection] = useState(false);
  const [editsection, setEditsection] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [dataedit, setDataedit] = useState({
    name: "",
    email: "",
    mobile: "",
    _id: "",
  });
  const [dataList, setDatalist] = useState([]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const datam = await axios.post("/create", data);
    // console.log(datam);
    if (datam.data.success) {
      setAddsection(false);
      alert(datam.data.message);
      getallUser();
    }

    // console.log(data)
  };
  const getallUser = async () => {
    try {
      const response = await axios.get("/");
      console.log(response, "kkkkk");
      if (response.data.success) {
        setDatalist(response.data.data);
        //  alert(response.data.message)
      } // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  useEffect(() => {
    getallUser();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("/delete/" + id);
      console.log(response, "kkkkk");
      if (response.data.success) {
        getallUser();
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await axios.put("/update", dataedit);
    console.log(response);
    if (response.data.success) {
      getallUser();
      alert(response.data.message);
      setEditsection(false);
    }
  };
  const handleEdit = async (el) => {
    setDataedit(el);
    setEditsection(true);
  };
  const handleEditOnchange = async (e) => {
    const { value, name } = e.target;
    setDataedit((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // console.log(dataList, "jjbjjj");
  // console.log(data, "data updated...");
  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddsection(true)}>
          Add
        </button>

        {addsection && (
          <Formtable
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleclose={() => setAddsection(false)}
            rest={data}
          />
        )}
        {editsection && (
          <Formtable
            handleSubmit={handleUpdate}
            handleChange={handleEditOnchange}
            handleclose={() => setEditsection(false)}
            rest={dataedit}
          />
        )}
        <div className="tablecontainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataList[0] ? (
                dataList?.map((el) => {
                  return (
                    <tr>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button onClick={() => handleEdit(el)}>Edit</button>
                        <button onClick={() => handleDelete(el._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <p style={{ textAlign: "center", color: "white" }}>
                  No data avaialble
                </p>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
