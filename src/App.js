import { Route, Routes } from "react-router-dom";
import Nav from "./components/Navigation/Nav";
import AddTask from "./components/pages/AddTask";
import EditTask from "./components/pages/EditTask";
import Home from "./components/pages/Home";


function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-task" element={<AddTask />} />
        <Route path="/edit-task/:taskId" element={<EditTask />} />
      </Routes>
    </>
  );
}

export default App;
