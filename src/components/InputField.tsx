import React, { useRef } from "react";
import styled from "styled-components";
const Styled = styled.form`
  display: flex;
  width: 90%;
  position: relative;
  align-items: center;
  .input__box {
    width: 100%;
    border-radius: 50px;
    padding: 20px 30px;
    font-size: 25px;
    border: none;
    transition: all 0.25s;
    box-shadow: inset 0 0 5px #000;
    &:focus {
      box-shadow: 0 0 10px 1000px rgb(0, 0, 0, 0.5);
      outline: none;
    }
  }
  .input__submit {
    position: absolute;
    width: 50px;
    height: 50px;
    margin: 12px;
    border-radius: 50px;
    right: 0;
    border: none;
    font-size: 35px;
    background-color: #2f74c0;
    color: #fff;
    transition: all 0.2s;
    box-shadow: 0 0 10px #000;
    cursor: pointer;
    &:hover {
      background-color: #388ae2;
    }
    &:active {
      transform: scale(0.85);
      box-shadow: 0 0 5px #000;
    }
  }
`;

interface Props {
  toDo: string;
  setToDo: React.Dispatch<React.SetStateAction<string>>;
  addToDo: () => void;
}
const InputField: React.FC<Props> = ({ toDo, setToDo, addToDo }: Props) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(e.target);
    addToDo();
    inpRef.current?.blur();
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToDo(value);
    // console.log({value});
  };
  const inpRef = useRef<HTMLInputElement>(null);
  return (
    <Styled className="input" onSubmit={handleSubmit}>
      <input
        ref={inpRef}
        type="input"
        placeholder="Enter a task"
        className="input__box"
        onChange={handleChange}
      />
      <button className="input__submit">+</button>
    </Styled>
  );
};
export default InputField;
