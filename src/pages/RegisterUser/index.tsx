import React, { useState, useCallback } from 'react';
import { TextField } from "@material-ui/core";
import { useHistory } from 'react-router';

import api from '../../services/api';

import validateEmail from '../../utils/validate/validateEmail';
import validateNameCompleted from '../../utils/validate/validateNameCompleted';

import { useToast } from '../../hooks/toast';

import Logo from '../../assets/logo.svg';

import {
  Container,
  Login,
  Content,
  Title,
  ButtonForm

} from './styles'

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

class MError {
  invalid: boolean = false;
  read: boolean = false;
  message: string = ""
}


const RegisterUser: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    name: new MError(),
    email: new MError(),
    password: new MError(),
    confirmPassword: new MError()
  });

  const { addToast } = useToast();


  const handleChange = (e: any) => {
    const { name, value } = e;

    switch (name) {
      case "name":
        errors.name.invalid = !validateNameCompleted(value);
        errors.name.message = (errors.name.invalid && errors.name.read) ? "Informe seu nome completo." : "";
        errors.name.read = true;
        setName(value);
        break;
      case "email":
        errors.email.invalid = validateEmail(value);
        errors.email.message = (errors.email.invalid && errors.email.read) ? "E-mail incorreto." : "";
        errors.email.read = true;
        setEmail(value);
        break;
      case "password":
        errors.password.invalid = value.length && value.length >= 7 ? false : true;
        errors.password.message = (errors.password.invalid && errors.password.read) ? "Informe uma senha com 7 caracteres ou mais." : "";
        errors.password.read = true;
        setPassword(value);
        break;
      case "confirmPassword":
        errors.confirmPassword.invalid = !(password === value)
        errors.confirmPassword.message = (errors.confirmPassword.invalid && errors.confirmPassword.read) ? "As senhas não conferem." : "";
        errors.confirmPassword.read = true;
        setConfirmPassword(value);
        break;
      default:
        break;
    }

    setErrors(errors);
  }

  const handleSubmit = useCallback(
    async ({ name, email, password }: ICreateUser) => {
      try {
        if (
          (!errors.email.invalid && !errors.email.read) ||
          (!errors.password.invalid && !errors.password.read) ||
          (!errors.name.invalid && !errors.name.read) ||
          (!errors.confirmPassword.invalid && !errors.confirmPassword.read)
        ) return

        const response = await api.post("users", { name, email, password });
        const { status } = response;

        if (status !== 200)
          throw new Error("Internal Serve Error")

        addToast({
          type: 'success',
          title: 'Parabéns.',
          description: 'Seu usuário foi cadastro com sucesso.'
        });

        history.push("/login");
      } catch (response) {
        addToast({
          type: 'error',
          title: 'Erro na criação do usuário.',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
        });
      }
    },
    [
      addToast, 
      history, 
      errors.email.invalid, 
      errors.password.invalid, 
      errors.name.invalid, 
      errors.confirmPassword.invalid,
      errors.email.read, 
      errors.password.read, 
      errors.name.read, 
      errors.confirmPassword.read
    ],
  );

  return (
    <>
      <Container>
        <Login>
          <div className="container-logo">
            <img src={Logo} alt="GoFinances" />
          </div>
          <Content>
            <Title>Cadastro de Usuário</Title>
            <TextField
              style={{ marginTop: "15px", width: "90%" }}
              label="Digite o seu nome"
              variant="outlined"
              value={name}
              onChange={(e) => handleChange(e.target)}
              name="name"
              id="name"
              error={errors.name.invalid}
              helperText={errors.name.message}

            />
            <TextField
              style={{ marginTop: "15px", width: "90%" }}
              label="Digite o seu e-mail"
              variant="outlined"
              value={email}
              onChange={(e) => handleChange(e.target)}
              name="email"
              id="email"
              error={errors.email.invalid}
              helperText={errors.email.message}
            />
            <TextField type="password"
              style={{ marginTop: "15px", width: "90%" }}
              label="Digite a sua senha"
              variant="outlined"
              value={password}
              onChange={(e) => handleChange(e.target)}
              name="password"
              id="password"
              error={errors.password.invalid}
              helperText={errors.password.message}
            />
            <TextField type="password"
              style={{ marginTop: "15px", width: "90%" }}
              label="Confirme a sua senha"
              variant="outlined"
              onChange={(e) => handleChange(e.target)}
              value={confirmPassword}
              name="confirmPassword"
              id="confirmPassword"
              error={errors.confirmPassword.invalid}
              helperText={errors.confirmPassword.message}
            />
            <ButtonForm
              onClick={() => handleSubmit({ name, email, password })}
              disabled={
                (!errors.name.invalid && !errors.name.read) ||
                (!errors.email.invalid && !errors.email.read) ||
                (!errors.password.invalid && !errors.password.read) ||
                (!errors.confirmPassword.invalid && !errors.confirmPassword.read)
              }

            > Confirmar </ButtonForm>
            <ButtonForm themeReverse={true} onClick={() => history.push("/login")}> Voltar </ButtonForm>
          </Content>
        </Login>
      </Container>
    </>
  );
};

export default RegisterUser;
