import React, { useContext } from 'react';
import Switch from "react-switch";
import { FiLogOut } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';

import { ThemeContext } from 'styled-components';

import Logo from '../../assets/logo.svg';

import { useTheme } from '../../hooks/theme';

import { Container, Logout } from './styles';
import { useAuth } from '../../hooks/auth';

interface HeaderProps {
  size?: 'small' | 'large';
}



const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const { colors, title } = useContext(ThemeContext);
  const { toggleTheme, theme } = useTheme();
  const { signOut } = useAuth();

  const styledLink = {
    borderBottom: `2px solid ${theme.title === 'light' ? theme.colors.orange : theme.colors.dark}`,
  };


  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <nav style={{ display: "flex" }}>
            <NavLink to="/dashboard" exact activeStyle={styledLink}>
              Dashboard
            </NavLink>
            <NavLink to="/nova-transacao" exact activeStyle={styledLink}>
              Nova Transação
            </NavLink>
            <NavLink to="/import" exact activeStyle={styledLink}>
              Importação
            </NavLink>
            <NavLink to="/configuracao" exact activeStyle={styledLink}>
              Configuração
            </NavLink>
            <Logout to="/" onClick={() => signOut()} exact activeStyle={styledLink}>
              <FiLogOut /> Sair
            </Logout>
            <div style={{ marginLeft: "10px", display: "flex", alignItems: "center" }}>
              <Switch
                onChange={() => toggleTheme()}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={colors.orange}
                onColor={colors.dark}
              />
            </div>
          </nav>
        </nav>
      </header>
    </Container>
  )
}

export default Header;
