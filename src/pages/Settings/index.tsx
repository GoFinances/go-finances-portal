import React, { useState, useCallback, useEffect } from 'react';
import {
  FiPlus
} from 'react-icons/fi';

import api from '../../services/api';

import Header from '../../components/Header';
import ModalAddNewSetting from '../../components/ModalAddNewSetting';

import { Container, TableContainer, BtnAddNewSetting } from './styles';


interface ICategories {
  id: number
}

const Settings: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => setOpenModal(openModal ? false : true), [openModal]);
  const [categories, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      api.get("/categories").then(response => {
        const { categories } = response.data;
        setCategories(categories);
      });
    }
    loadCategories();
  }, []);

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
                <th>Tema escuro</th>
                <th>Tema claro</th>
                <th>
                  <BtnAddNewSetting onClick={() => toggleModal()}>
                    <FiPlus />
                  </BtnAddNewSetting>
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td className="title">1</td>
                  <td className="" >1</td>
                  <td>1</td>
                  <td>1</td>
                  <td>1</td>
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
