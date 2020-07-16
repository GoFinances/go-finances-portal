import React, { useCallback, useState } from 'react';
import { TextField } from "@material-ui/core";
import { Link } from 'react-router-dom';

// VALIDACAO
import validateEmail from '../../utils/validate/validateEmail';

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: {
      invalid: false,
      read: false,
      message: ""
    },
    password: {
      invalid: false,
      read: false,
      message: ""
    },
  });



  const { addToast } = useToast();
  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async ({ email, password }: SignInFormData) => {
      try {
        if (
          (!errors.email.invalid || !errors.email.read) ||
          (!errors.password.invalid || !errors.password.read)
        ) return

        await signIn({ email: email, password: password });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, errors],
  );

  const handleChange = (e: any) => {
    const { name, value } = e;

    switch (name) {
      case "email":
        errors.email.invalid = validateEmail(value)
        errors.email.message = (errors.email.invalid && errors.email.read) ? "E-mail incorreto." : ""
        errors.email.read = true
        setEmail(value!!);
        break;

      case "password":
        errors.password.invalid = value!!.length ? false : true;
        errors.password.message = (errors.password.invalid && errors.password.read) ? "Informe uma senha." : ""
        errors.password.read = true
        setPassword(value!!);
        break;

      default:
        break;
    }

    setErrors(errors);
  }

  return (
    <>
      <Container>
        <Login>
          <div className="container-logo">
            <img src={Logo} alt="GoFinances" />
          </div>
          <Content>
            <TextField
              style={{ marginTop: "15px", width: "90%" }}
              label="Digite o seu e-mail"
              placeholder="Digite a sua senha"
              variant="outlined"
              value={email}
              onChange={(e) => handleChange(e.target)}
              name="email"
              id="email"
              error={errors.email.invalid}
              helperText={errors.email.message}
            />

            <TextField
              value={password}
              onChange={(e) => handleChange(e.target)}
              type="password"
              placeholder="Digite a sua senha"
              style={{ marginTop: "15px", width: "90%" }}
              label="Digite a sua senha"
              variant="outlined"
              name="password"
              id="password"
              error={errors.password.invalid}
              helperText={errors.password.message}
              onKeyPress={(e) => (e.key === "Enter") ? handleSubmit({ email, password }) : null}
            />

            <ContainerText textAlign="right">
              <Link style={{ textDecoration: "none" }} to=""> Esqueci minha senha</Link>
            </ContainerText>
            <SubmitLogin
              onClick={() => handleSubmit({ email, password })}
              disabled={
                (!errors.email.invalid && !errors.email.read) ||
                (!errors.password.invalid && !errors.password.read)
              }> Entrar </SubmitLogin>
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
