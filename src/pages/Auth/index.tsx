import React from 'react';
import { TextField } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Login,
  Content,
  ContainerText,
  SubmitLogin

} from './styles'


const Auth: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Container>
        <Login>
          <div className="container-logo">
            <img src={Logo} alt="GoFinances" />
          </div>
          <Content>
            <TextField style={{ marginTop: "15px", width: "90%" }} label="Digite o seu e-mail" variant="outlined" />
            <TextField type="password" style={{ marginTop: "15px", width: "90%" }} label="Digite a sua senha" variant="outlined" />

            <ContainerText textAlign="right">
              <Link style={{ textDecoration: "none" }} to=""> Esqueci minha senha</Link>
            </ContainerText>
            <SubmitLogin onClick={() => history.push("/dashboard")}> Entrar </SubmitLogin>
            <ContainerText textAlign="left">
              Ainda não possui conta? <Link style={{ textDecoration: "none" }} to="/cadastro-usuario">Faça o cadastro agora mesmo!</Link>
            </ContainerText>

          </Content>
        </Login>
      </Container>
    </>
  );
};

export default Auth;
