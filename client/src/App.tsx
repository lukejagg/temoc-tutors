import "./App.css";
import { PlaceholderCreateUser } from "./pages/PlaceholderCreateUser/PlaceholderCreateUser";
import { PlaceholderCalendar } from "./pages/PlaceholderCalendar/PlaceholderCalendar";

const App: React.FC = () => {
  return (
    <div>
      <h1>COMET CALENDAR!</h1>
      <PlaceholderCreateUser />
      <PlaceholderCalendar />
    </div>
  );
};

export default App;
