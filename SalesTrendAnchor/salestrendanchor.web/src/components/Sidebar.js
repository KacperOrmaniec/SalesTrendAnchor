import React from "react";
import { Avatar, Button } from "@mui/material";

function Sidebar() {
  return (
    <div className="flex flex-col items-center space-y-4 bg-white w-56 h-screen border-r-2 border-gray-50">
      <div className="flex flex-row items-center justify-start w-full px-4 gap-2 mt-4">
        <Avatar>KO</Avatar>
        <div>logo</div>
      </div>
      <Button variant="text">Dashboard</Button>
      <Button variant="outlined" color="error">
        Logout
      </Button>
    </div>
  );
}

export default Sidebar;
