import axios, { all } from "axios";
import { useEffect, useState } from "react";

const App = () => {
  let [task, setTask] = useState("");
  let [allTask, setAllTask] = useState([]);
  let handleSubmit = () => {
    axios
      .post("http://localhost:3000/todos/add", { task: task })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getAlltask() {
    axios
      .get("http://localhost:3000/todos")
      .then((data) => {
        console.log(data.data?.data);
        if (!data.data) return;
        setAllTask(data.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getAlltask();
  }, [allTask]);

  // delete data
  let handleDelte = (id) => {
    axios
      .delete(`http://localhost:3000/todos/delete/${id}`)
      .then((data) => {
        console.log("Data edit successfull", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // UpdateData
  // let handleUpdate = (id) => {
  //   axios
  //     .patch(`http://localhost:3000/todos/update/${id}`)
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      {/* component */}
      <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4 ">
              <input
                onChange={(e) => setTask(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                placeholder="Add Todo"
              />

              <button
                onClick={handleSubmit}
                className="flex-no-shrink p-2 border-2 rounded text-teal border-teal  hover:text-teal-900 hover:bg-teal"
              >
                Add
              </button>
            </div>
          </div>
          <div>
            {allTask &&
              allTask.map((item, index) => (
                <div className="flex mb-4 items-center" key={index}>
                  <p className="w-full text-grey-darkest">{item.task}</p>
                  <div className="flex">
                    <button
                      // onClick={() => handleDelte(item._id)}
                      className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-black hover:bg-red"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelte(item._id)}
                      className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-black hover:bg-red"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
