import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 40%;
  border-radius: 0.8rem;
  background-color: #fff;
  padding: 1.5rem;
  @media (min-width: 768px) {
    width: 30%;
    padding: 2rem;
  }
`;

export const Label = styled.label`
  width: 100%;
  color: #000;
`;

export const Input = styled.input`
  width: 100%;
  height: 2rem;
  border-radius: 0.4rem;
  background-color: #fff;
  border: 0.1rem solid #000;
  color: #000;
  margin-top: 0.5rem;
  padding-left: 0.5rem;
`;

export const Span = styled.span`
  color: #a60202;
`;

export const Button = styled.button`
  width: 100%;
  height: 2rem;
  border-radius: 0.4rem;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background-color: #3498db;
  }
`;

export const Link = styled.a`
  color: #000;
  align-self: flex-end;
  text-decoration: underline;
`;
