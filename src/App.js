import { useState } from "react";
import "./App.css";
import LeftPanel from "./components/LeftPanel/LeftPanel";
import RightPanel from "./components/RightPanel/RightPanel";

function App() {
  const [addedList, setAddedList] = useState([]);
  const [changed, setChanged] = useState(false);
  const [deletedElement, setDeletedElement] = useState([]);

  return (
    <div className="app">
      <div id="left-panel" className="left-panel">
        <LeftPanel
          addedList={addedList}
          deletedElement={deletedElement}
          changedFunction={() => setChanged(!changed)}
        />
      </div>
      <hr />
      <div id="right-panel" className="right-panel">
        <RightPanel
          addedList={addedList}
          deletedElement={deletedElement}
          changed={changed}
          changedFunction={() => setChanged(!changed)}
        />
      </div>

      <a className="page-button" href="#left-panel">
        Üst Liste
      </a>
      <a className="page-button down" href="#right-panel">
        Alt Liste
      </a>

    </div>
  );
}

export default App;
