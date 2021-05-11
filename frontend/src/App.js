import { useState } from "react";
import "./App.css";
import Timetable from "./components/Timetable";

function App() {
    const [timetable, setTimetable] = useState(false);

    return (
        <div className="App">
            {timetable ? (
                <Timetable />
            ) : (
                <button
                    className="Button"
                    onClick={() => {
                        setTimetable(true);
                    }}
                >
                    Generate
                </button>
            )}
        </div>
    );
}

export default App;
