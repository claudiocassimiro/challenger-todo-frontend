import styled from "styled-components";

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  overflow-y: hidden;
`;

export const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem 0 0 0;
`;

export const H1 = styled.h1`
  color: #fff;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 2.4rem;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  gap: 1rem;
  margin: 0 auto;
  max-height: 50%;
  overflow: auto;
  @media (min-width: 768px) {
    align-items: center;
    width: 50%;
    max-height: 60%;
  }
  &::-webkit-scrollbar {
    width: 0;
  }
`;

export const P = styled.p`
  color: #fff;
  text-align: center;
  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const ContainerTask = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7.2rem;
  background-color: #363636;
  border-radius: 0.4rem;
  padding: 0.5rem 1rem;
  @media (min-width: 768px) {
    width: 80%;
    padding: 0.5rem 2rem;
  }
`;

export const ContainerCompleteCheckBoxAndTaskInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const CheckBox = styled.input`
  border-radius: 50%;
  vertical-align: middle;
  border: 0.1rem solid #ddd;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  &:checked {
    background-color: #0d0;
  }
  @media (min-width: 768px) {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

export const H2 = styled.h2`
  font-size: 1rem;
  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;

export const TaskP = styled.p`
  color: #fff;
  font-size: 0.8rem;
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const ContainerImageAndTaskInfos = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
