import React, { useState, useCallback } from 'react';
import {
  FiPlus
} from 'react-icons/fi';

import Header from '../../components/Header';
import { Container, TableContainer, BtnAddNewSetting } from './styles';
import ModalAddNewSetting from '../../components/ModalAddNewSetting';


interface ISettings {
  id: number
}

const Settings: React.FC = () => {
  const [openModal, setOpenModal] = useState(true);
  const toggleModal = useCallback(() => setOpenModal(openModal ? false : true), [openModal]);
  const [settings, setSettings] = useState<ISettings[]>([]);

  return (
    <>
      <Header size="small" />
      <Container>
        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Ícone</th>
                <th>Cor Dark</th>
                <th>Cor Light</th>
                <th>
                  <BtnAddNewSetting onClick={() => toggleModal()}>
                    <FiPlus />
                  </BtnAddNewSetting>
                </th>
              </tr>
            </thead>

            <tbody>
              {settings.map(setting => (
                <tr key={setting.id}>
                  <td className="title"></td>
                  <td className="" ></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
      <ModalAddNewSetting
        isOpen={openModal}
        setIsOpen={toggleModal}
      />
    </>
  )
}

export default Settings;
