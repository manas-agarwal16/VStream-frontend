import { useState } from "react";
import { Navbar, Sidebar, Home } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
