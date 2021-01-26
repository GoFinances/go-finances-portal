import React, { useState, useCallback, useEffect } from 'react';
import * as Icons from 'react-icons/all';

import { FiPlus } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa';

import api from '../../services/api';

import { useTheme } from '../../hooks/theme';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import ModalAddNewSetting from '../../components/ModalAddNewSetting';

import { Container, TableContainer, BtnAddNewSetting, Square, SquareContainer, BtnDeleteCategory } from './styles';


interface ICategories {
  id: number;
  title: string;
  icon: string;
  background_color_dark: string;
  background_color_light: string;
}

const Settings: React.FC = () => {
  const { theme } = useTheme();
  const { addToast } = useToast();

  const [openModal, setOpenModal] = useState(false);
  const toggleModal = useCallback(() => setOpenModal(openModal ? false : true), [openModal]);
  const [categories, setCategories] = useState<ICategories[]>([]);

  const loadCategories = useCallback(async () => {
    const response = await api.get("/categories");

    const categories = response.data;
    setCategories(categories);

  }, []);

  const onSubmitted = useCallback(() => {
    addToast({
      type: 'success',
      title: 'Parabéns',
      description: 'A categoria foi adicionada com sucesso.'
    });

    toggleModal();
    loadCategories();

  }, [addToast, loadCategories, toggleModal])

  const handleDeleteCategory = useCallback(async (id: number) => {
    try {
      const { status } = await api.delete(`/categories/${id}`);

      if (status === 204)
        addToast({
          type: 'success',
          title: 'Parabéns',
          description: 'Categoria excluída com sucesso.'
        });

    } catch (error) {
      addToast({
        type: 'error',
        title: 'Atenção',
        description: "Ocorreu um erro ao tentar excluir a categoria."
      });
    } finally {
      loadCategories();
    }


  }, [addToast, loadCategories]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);



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
              {categories.map(category => {
                const [_, iconName] = category.icon.split('/');
                const Icon = (Icons as any)[iconName];

                return (
                  <tr key={category.id}>
                    <td className="title">{category.title}</td>
                    <td className="" > <Icon size={25} color={theme.title === 'light' ? category.background_color_light : category.background_color_dark} /></td>
                    <td>
                      <SquareContainer>
                        <Square background={category.background_color_dark} />{category.background_color_dark}
                      </SquareContainer>
                    </td>
                    <td>
                      <SquareContainer>
                        <Square background={category.background_color_light} />{category.background_color_light}
                      </SquareContainer>
                    </td>
                    <td>
                      <BtnDeleteCategory onClick={() => handleDeleteCategory(category.id)}>
                        <FaTrashAlt size={25} />
                      </BtnDeleteCategory>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </TableContainer>
      </Container>
      <ModalAddNewSetting
        isOpen={openModal}
        setIsOpen={toggleModal}
        onSubmitted={onSubmitted}
      />
    </>
  )
}

export default Settings;
