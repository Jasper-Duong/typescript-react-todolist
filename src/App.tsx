import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import InputField from "./components/InputField";
import ToDoList from "./components/ToDoList";
import { ToDo } from "./interfaces/toDo";

const App: React.FC = () => {
  const [toDo, setToDo] = useState<string>("");
  const [toDoList, setToDoList] = useState<ToDo[]>([]);

  const addToDo = () => {
    if (toDo) {
      const newToDo: ToDo = { id: Date.now(), toDo, isDone: false };
      setToDoList([...toDoList, newToDo]);
      setToDo("");
    }
    // console.log({ toDoList });
  };
  useEffect(() => {
    console.log({ toDoList });
  }, [toDoList]);

  return (
    <Styled className="App">
      <span className="heading">TASKIFY</span>
      <InputField toDo={toDo} setToDo={setToDo} addToDo={addToDo} />
      <div className="todos-wrapper">
        <ToDoList
          toDoList={toDoList}
          setToDoList={setToDoList}
          isCompleted={false}
        />
        <ToDoList
          toDoList={toDoList}
          setToDoList={setToDoList}
          isCompleted
        />
      </div>
    </Styled>
  );
};

export default App;
const Styled = styled.div`
  .todos-wrapper {
    margin-top: 3rem;
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
    width: 90%;
  }
  .todos {
    padding: 1rem;
    background-color: #ac1c1c;
    align-items: flex-start;
    justify-content: flex-start;
    h3 {
      margin: 0;
    }
    &.completed {
      background-color: green;
    }
  }
  @media screen and (max-width: 700px) {
    .todos-wrapper {
      grid-template-columns: 1fr;
    }
  }
`;
