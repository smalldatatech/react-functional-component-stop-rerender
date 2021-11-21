import { memo, useCallback, useEffect, useState } from "react";
import "./App.css";
import { usePropsUpdate } from "./usePropsUpdate";

function App() {
  const [numCounter, setNumCounter] = useState(0);
  const [numCounterAnother, setNumCounterAnother] = useState(0);
  const [numCounterMemo, setNumCounterMemo] = useState(0);
  const [numCounterNoHandler, setNumCounterNoHandler] = useState(0);

  // useCallback does not prevent a re-render due to the fact that functional equality cannot be checked
  const onCounterAddClick = useCallback(() => {
    setNumCounter(numCounter + 1);
  }, [numCounter]);

  const onCounterAnotherAddClick = useCallback(() => {
    setNumCounterAnother(numCounterAnother + 1);
  }, [numCounterAnother]);

  const onCounterMemoAddClick = useCallback(() => {
    setNumCounterMemo(numCounterMemo + 1);
  }, [numCounterMemo]);

  useEffect(() => {
    const clickListener = (e) => {
      // console.log(e.target, e.target.id);
      if (e.target.id === "CounterNoHandler") {
        setNumCounterNoHandler(numCounterNoHandler + 1);
      }
    };

    document.addEventListener("click", clickListener);
    return () => {
      document.removeEventListener("click", clickListener);
    };
  }, [numCounterNoHandler]);

  /*
  useEffect(() => {
    setInterval(() => {
      setNumCounter(n => n + 1);
    }, 1000);
  }, []);
  */

  return (
    <div>
      <Counter num={numCounter} onCounterAddClick={onCounterAddClick} />
      <CounterAnother num={numCounterAnother} onCounterAnotherAddClick={onCounterAnotherAddClick} />
      <CounterMemo num={numCounterMemo} onCounterMemoAddClick={onCounterMemoAddClick} />
      <CounterNoHandler num={numCounterNoHandler} />
    </div>
  );
}

function Counter({ num = 0, onCounterAddClick = () => {} }) {
  // usePropsUpdate({ num, onCounterAddClick });
  console.count("Counter");
  return <CounterContents num={num} onClick={onCounterAddClick} title="Counter" />;
}

function CounterAnother({ num = 0, onCounterAnotherAddClick = () => {} }) {
  // usePropsUpdate({ num, onCounterAnotherAddClick });
  console.count("CounterAnother");
  return <CounterContents num={num} onClick={onCounterAnotherAddClick} title="CounterAnother" />;
}

// the solution is to memo the functional component and provide your own
// equality check
const CounterMemo = memo(
  ({ num = 0, onCounterMemoAddClick = () => {} }) => {
    // usePropsUpdate({ num, onCounterMemoAddClick });

    console.count("CounterMemo");

    return <CounterContents num={num} onClick={onCounterMemoAddClick} title="CounterMemo" />;
  },
  (prevProps, nextProps) => {
    if (prevProps.num !== nextProps.num) {
      return false;
    }
    return true; // props are equal
  }
);

function CounterNoHandler({ num = 0 }) {
  usePropsUpdate({ num });
  console.count("CounterNoHandler");
  return <CounterContents num={num} title="CounterNoHandler" />;
}

function CounterContents({ num = 0, title = "", onClick = () => {} }) {
  return (
    <div style={{ margin: "5px" }}>
      <h4>{title}</h4>
      <div>
        {num}
        <button id={title} style={{ marginLeft: "5px" }} onClick={onClick}>
          Add
        </button>
      </div>{" "}
    </div>
  );
}

export default App;
