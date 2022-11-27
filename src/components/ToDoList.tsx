import React from "react";
import styled from "styled-components";
import { ToDo } from "../interfaces/toDo";
import ToDoItem from "./ToDo";
const Styled = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
interface Props {
  toDoList: ToDo[];
  setToDoList: React.Dispatch<React.SetStateAction<ToDo[]>>;
  isCompleted: boolean;
}
const ToDoList: React.FC<Props> = ({
  toDoList,
  setToDoList,
  isCompleted,
}: Props) => {
  const toDoRenderList = isCompleted
    ? toDoList.filter((ele) => ele.isDone)
    : toDoList.filter((ele) => !ele.isDone);
  return (
    <Styled className={`todos${isCompleted ? " completed" : ""}`}>
      <h3>{isCompleted ? "Completed" : "To-Do"}</h3>
      {toDoRenderList.map((ele) => (
        <ToDoItem
          key={ele.id}
          item={ele}
          toDoList={toDoList}
          setToDoList={setToDoList}
        />
      ))}
    </Styled>
  );
};

export default ToDoList;
