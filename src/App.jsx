import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLaout";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ProjectVersion from "./pages/ProjectVersion";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />

        <Route path="/version/:type" element={<ProjectVersion />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<Home />} />
        <Route path="settings" element={<Settings />} />
      </Route> */}
    </Routes>
  );
}

export default App;
