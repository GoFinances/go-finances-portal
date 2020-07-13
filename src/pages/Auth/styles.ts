import styled from "styled-components";
import { lighten } from "polished";

interface LayoutProps {
  textAlign?: string;
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 `;


export const Login = styled.div`
  width: 400px;
  height: 500px;
  background: #FFF;
  border-radius: 5px;
  top: 100px;
  position: absolute;
  border: 1px solid #5636D3;


  .container-logo{
    display: flex;
    justify-content: center;
    height: 150px;
    background: #5636D3;
    img {
      width: 345px
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ContainerText = styled.div<LayoutProps>`
  width: 90%;
  margin: 10px;
  font-size: small;
  text-align: ${p => p.textAlign || "center"}
`;


export const SubmitLogin = styled.button`
  margin-top: 15px;
  width: 90%;
  height: 60px;
  background: #5636D3;
  color: #FFF;
  border: 1px solid #FFF;
  border-radius: 5px;
  text-transform: uppercase;

  &:hover, :focus {
    color: #FFF;
    background: ${lighten(0.08, '#5636D3')};
  }
`;
