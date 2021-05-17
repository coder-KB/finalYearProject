import { isAuthenticated } from "./api/user";
import Home from "./components/Home";
import Admin from "./components/user/Admin";
import Unauthorized from "./components/user/Unauthorized";
import User from "./components/user/User";

function App() {
    const { user } = isAuthenticated();

    const showDetails = () => {
        if (user) {
            if (user.role === 1) {
                // admin user
                return <Admin name={user.name} />;
            } else {
                // normal user
                return <User name={user.name} />;
            }
        } else {
            // unauthourized user
            return <Unauthorized />;
        }
    };

    return <Home>{showDetails()}</Home>;
}

export default App;
