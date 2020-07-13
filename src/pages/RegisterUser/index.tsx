import React, { useState, useEffect } from 'react';
import { TextField } from "@material-ui/core";
import { useHistory } from 'react-router';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Login,
  Content,
  Title,
  ButtonForm

} from './styles'


const RegisterUser: React.FC = () => {
  const history = useHistory();

  return (
    <>
      <Container>
        <Login>
          <div className="container-logo">
            <img src={Logo} alt="GoFinances" />
          </div>
          <Content>
            <Title>Cadastro de Usuário</Title>
            <TextField style={{ marginTop: "15px", width: "90%" }} label="Digite o seu nome" variant="outlined" />
            <TextField style={{ marginTop: "15px", width: "90%" }} label="Digite o seu e-mail" variant="outlined" />
            <TextField type="password" style={{ marginTop: "15px", width: "90%" }} label="Digite a sua senha" variant="outlined" />
            <TextField type="password" style={{ marginTop: "15px", width: "90%" }} label="Confirme a sua senha" variant="outlined" />
            <ButtonForm> Confirmar </ButtonForm>
            <ButtonForm themeReverse={true} onClick={() => history.push("/login")}> Voltar </ButtonForm>
          </Content>
        </Login>
      </Container>
    </>
  );
};

export default RegisterUser;
