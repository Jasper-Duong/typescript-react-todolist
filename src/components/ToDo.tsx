import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ToDo } from "../interfaces/toDo";
import { MdDeleteOutline, MdOutlineDone } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
interface Props {
  item: ToDo;
  toDoList: ToDo[];
  setToDoList: React.Dispatch<React.SetStateAction<ToDo[]>>;
}

const ToDoItem: React.FC<Props> = ({ item, toDoList, setToDoList }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [edit, setEdit] = useState<string>(item.toDo);
  const handleDone = (id: number) => {
    setToDoList(
      toDoList.map((ele: ToDo) =>
        ele.id === id ? { ...ele, isDone: !ele.isDone } : ele
      )
    );
  };
  const handleDelete = (id: number) => {
    setToDoList(toDoList.filter((ele) => ele.id !== id));
  };
  const inpRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isEdit) {
      inpRef.current?.focus();
    }
  }, [isEdit]);

  const handleUpdate = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    if (edit) {
      setToDoList(
        toDoList.map((ele) => (ele.id === id ? { ...ele, toDo: edit } : ele))
      );
      setIsEdit(!isEdit);
    }
  };
  return (
    <Styled className="todo-item" done={item.isDone}>
      <form className="todo-form" onSubmit={(e) => handleUpdate(e, item.id)}>
        {isEdit ? (
          <input
            type="text"
            ref={inpRef}
            defaultValue={edit || item.toDo}
            className="edit-field"
            onChange={(e) => setEdit(e.target.value)}
          />
        ) : (
          <span className="title">{edit || item.toDo}</span>
        )}
        <div className="icons">
          <span className="icon done" onClick={() => handleDone(item.id)}>
            <MdOutlineDone />
          </span>
          <span className="icon remove" onClick={() => handleDelete(item.id)}>
            <MdDeleteOutline />
          </span>
          <span className="icon edit" onClick={() => setIsEdit(!isEdit)}>
            <FiEdit />
          </span>
        </div>
      </form>
    </Styled>
  );
};

export default ToDoItem;

interface StyledProps {
  done: boolean;
}

const Styled = styled.div<StyledProps>`
  background-color: #fff;
  border-radius: 10px;
  width: 100%;
  margin: 0.5rem 0;
  padding: 1rem;
  height: fit-content;
  transition: all 0.3s;
  &:hover {
    box-shadow: 0 0 5px #fff;
    transform: scale(1.025);
  }
  .todo-form {
    transition: all 0.2s;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 1.25rem;
    text-decoration: ${(props) => (props.done ? `line-through` : `none`)};
    .icon {
      cursor: pointer;
      padding-left: 0.25rem;
    }
    .title {
      padding: 2px;
      line-height: 1.5rem;
    }
    .edit-field {
      font-size: 1.25rem;
      line-height: 1.5rem;
      padding: 0;
      border: 2px solid #2f74c0;
      border-radius: 3px;
      background-color: #2f75c056;
    }
  }
  @media screen and (max-width: 800px) and (min-width: 700px) {
    .edit-field {
      width: 100%;
    }
    .icons {
      margin-top: 1rem;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }
`;
