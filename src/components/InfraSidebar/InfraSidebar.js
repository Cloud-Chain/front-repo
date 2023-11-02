import "./InfraSidebar.css"
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListIcon from '@mui/icons-material/List';
import WidgetsIcon from '@mui/icons-material/Widgets';
import { Link } from "react-router-dom";

const InfraSidebar = () => {
    return (
      <div className="sidebar">
        <div className="top">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Cloud Chain</span>
          </Link>
        </div>
        <hr />
        <div className="center">
          <ul>      
            <p className="title">MAIN</p>
            <Link to="/" style={{ textDecoration: "none" }}>
                <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
                </li>
            </Link>
            <p className="title">Cluster</p>
            <Link to="/Cluster" style={{ textDecoration: "none" }}>
              <li>
                <ListIcon className="icon" />
                <span>Configuration</span>
              </li>
            </Link>
            <p className="title">Monitor</p>
            <Link to="/blockchain" style={{ textDecoration: "none"}}>
              <li>
                <WidgetsIcon className="icon" />
                <span>Blockchain</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    );
  };

export default InfraSidebar;