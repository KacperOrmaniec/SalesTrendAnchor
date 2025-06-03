import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Button from "@mui/material/Button";

function App() {
  return (
    <div class="flex flex-row bg-gray-100">
      <div class="flex flex-col items-center space-y-4 bg-white w-56 h-screen border-r-2 border-gray-50">
        <div>logo</div>
        <Button variant="text">Dashboard</Button>
        <Button variant="outlined" color="error">
          Logout
        </Button>
      </div>
      <div class="flex flex-row justify-left items-center w-screen h-10 bg-white border-b-2 border-gray-50">
        <div class="">Dashboard</div>
      </div>
    </div>
  );
}

export default App;
