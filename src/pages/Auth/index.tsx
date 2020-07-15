import React, { useCallback, useState } from 'react';
import { TextField } from "@material-ui/core";
import { Link, useHistory } from 'react-router-dom';

//HOOKS
import { useToast } from "../../hooks/toast"
import { useAuth } from '../../hooks/auth';

//Imagens
import Logo from '../../assets/logo.svg';

import {
  Container,
  Login,
  Content,
  ContainerText,
  SubmitLogin

} from './styles'

// Interfaces
interface SignInFormData {
  email: string;
  password: string;
}


const Auth: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { addToast } = useToast();
  const { signIn } = useAuth();


  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        await signIn({ email: email, password: password });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast],
  );

  return (
    <>
      <Container>
        <Login>
          <div className="container-logo">
            <img src={Logo} alt="GoFinances" />
          </div>
          <Content>
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} style={{ marginTop: "15px", width: "90%" }} label="Digite o seu e-mail" variant="outlined" />
            <TextField value={password} onChange={(e) => setPassword(e.target.value)} type="password" style={{ marginTop: "15px", width: "90%" }} label="Digite a sua senha" variant="outlined" />

            <ContainerText textAlign="right">
              <Link style={{ textDecoration: "none" }} to=""> Esqueci minha senha</Link>
            </ContainerText>
            <SubmitLogin onClick={() => handleSubmit({ email, password })}> Entrar </SubmitLogin>
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
