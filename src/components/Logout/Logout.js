// "Компонент рендериться на маршрут /user
// Компонент рендерить сторінку з компонентами UserData, Logout та PetsData.
// Компоненти UserData та  Logout потрібно реалізувати в спільному контейнері."

import { ModalApproveAction } from 'components/ModalApproveAction/ModalApproveAction';
import { useState } from 'react';
import {
  Arrow,
  Button,
  ButtonWrap,
  ModalContent,
  TitleModal,
  BtnLogout,
  ArrowBack,
  
  //Олексій
  ButtonYes,
} from './Logout.styled';

//Олексій
// } from './UserPage.styled';

import { useDispatch, useSelector } from 'react-redux';
import { logOut } from 'Redux/auth/operation';

import icons from 'images/icons.svg';
import { Navigate } from 'react-router-dom';
import { getConnect } from 'Redux/auth/selector';

export const LogoutBtn = () => {
  //   toggleModal, яку потрібно передати компоненту ModalApproveAction для закриття вікна
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsOpenModal(isOpen => !isOpen);
  };

  const handleAction = () => {
    // console.log('Передаємо екшн');
    dispatch(logOut());
};
const isConnect = useSelector(getConnect);
if (!isConnect) {
  return (< Navigate to = "/" replace />)
}

  return (
    <>
      {isOpenModal && (
        <ModalApproveAction onClose={toggleModal} >
          <ModalContent>
            <TitleModal>Already leaving?</TitleModal>
            <ButtonWrap>
              <Button type="button" aria-label="cancel" onClick={toggleModal}>
                Cancel
              </Button>
              <ButtonYes type="button" aria-label="yes" onClick={handleAction}>
                Yes
                <Arrow>
                  <use href={icons + '#logout'} />
                </Arrow>
              </ButtonYes>
            </ButtonWrap>
          </ModalContent>
        </ModalApproveAction>
      )}

      <BtnLogout type="button" onClick={toggleModal}>
      <ArrowBack><use href={icons + '#logout'}/></ArrowBack>
        LogOut
      </BtnLogout>
    </>
  );
};
