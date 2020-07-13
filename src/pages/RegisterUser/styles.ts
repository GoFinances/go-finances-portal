import styled from "styled-components";
import { lighten } from 'polished';


interface LayoutProps {
  themeReverse?: boolean;
}

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 `;

export const Login = styled.div`
  width: 450px;
  height: auto;
  background: #FFF;
  border-radius: 5px;
  border: 1px solid #5636D3;
  border-radius: 5px;
  padding-bottom: 10px;


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

export const Title = styled.h1`
  text-transform: uppercase;
  width: 90%;
  font-size: 28px;
  display: flex;
  justify-content: center;
`;

export const ButtonForm = styled.button<LayoutProps>`
  margin-top: 15px;
  width: 90%;
  height: 60px;
  background: ${p => (!p.themeReverse ? "#5636D3" : "#FFF")};
  color: ${p => (!p.themeReverse ? "#FFF" : "#5636D3")};
  border: 1px solid ${p => (!p.themeReverse ? "#FFF" : "#5636D3")};
  border-radius: 5px;
  text-transform: uppercase;

  &:hover, :focus {
    color: #FFF;
    background: ${lighten(0.08, '#5636D3')};
  }
`;
