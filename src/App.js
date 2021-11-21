import { memo, useCallback, useState } from "react";
import "./App.css";
import { usePropsUpdate } from "./usePropsUpdate";

function App() {
  const [numCounter, setNumCounter] = useState(0);
  const [numCounterMemo, setNumCounterMemo] = useState(0);

  // useCallback does not prevent a re-render due to the fact that functional equality cannot be checked
  const onCounterAddClick = useCallback(() => {
    setNumCounter(numCounter + 1);
  }, [numCounter]);

  const onCounterMemoAddClick = useCallback(() => {
    setNumCounterMemo(numCounterMemo + 1);
  }, [numCounterMemo]);

  return (
    <div>
      <Counter num={numCounter} onCounterAddClick={onCounterAddClick} />
      <CounterMemo num={numCounterMemo} onCounterMemoAddClick={onCounterMemoAddClick} />
    </div>
  );
}

function Counter({ num = 0, onCounterAddClick = () => {} }) {
  usePropsUpdate({ num, onCounterAddClick });

  console.count("Counter");

  return (
    <div style={{ margin: "5px" }}>
      <h4>Counter</h4>
      <div>
        {num}
        <button style={{ marginLeft: "5px" }} onClick={onCounterAddClick}>
          Add
        </button>
      </div>{" "}
    </div>
  );
}

// the solution is to memo the functional component and provide your own
// equality check
const CounterMemo = memo(
  ({ num = 0, onCounterMemoAddClick = () => {} }) => {
    usePropsUpdate({ num, onCounterMemoAddClick });

    console.count("CounterMemo");

    return (
      <div style={{ margin: "5px" }}>
        <h4>CounterMemo</h4>
        <div>
          {num}
          <button style={{ marginLeft: "5px" }} onClick={onCounterMemoAddClick}>
            Add
          </button>
        </div>{" "}
      </div>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.num !== nextProps.num) {
      return false;
    }
    return true; // props are equal
  }
);

export default App;
