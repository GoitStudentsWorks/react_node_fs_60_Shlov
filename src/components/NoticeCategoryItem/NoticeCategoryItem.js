// Компонент рендерить елемент списку оголошень, карточку одного оголошення з кнопками іконка-серце (AddToFavorite) та LearnMore
// Клік по:
//   - іконці-серцю (AddToFavorite):
//      - якщо користувач АВТОРИЗОВАНИЙ - в залежності від того, чи додано відповідне оголошення в обрані, по кліку користувач додає оголошення в обрані або видаляє з них
//      - якщо користувач НЕАВТОРИЗОВАНИЙ, користувачу повинно виводитись повідомлення типу нотіфікація з інформацією про те, що користувачу потрібно авторизуватися для використання даного функціоналу
//   - LearnMore - відкриває користувачу модалку з детальним описом даного оголошення - NoticeModal

// Авторизований користувач

// Компонент рендерить кнопку для видалення оголошення, якщо дане оголошення створене цим користувачем.
// Клік по кнопці відкриває модальне вікно  ModalApproveAction

import {
  Card,
  FavoriteBtn,
  DeleteBtn,
  CategoryTag,
  ImageWrapper,
  DescriptionWrapper,
  Title,
  Image,
  TagItem,
  TagList,
  MoreBtn,
  SvgIcon,
  HeartIcon,
  TrashIcon,
} from './NoticeCategoryItem.styled';

import icon from '../../images/icons.svg';
import { useState } from 'react';
import { ModalNotice } from 'components/ModalNotice/ModalNotice';
import { ModalApproveAction } from 'components/ModalApproveAction/ModalApproveAction';
import {
  Button,
  ButtonWrap,
  DescrModal,
  ModalContent,
  TitleModal,
  Trash,
  Text,
  ButtonTrash,
} from '../NoticesPage/NoticesPage.styled';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'Redux/auth/selector';
import { deleteNotice } from 'Redux/notices/operation';
import { toast } from 'react-hot-toast';
import icons from 'images/icons.svg';

export const NoticeCategoryItem = ({ item, handleFavorite, setFilteredItems }) => {
  const [card, setCard] = useState(item)
  const idUser = useSelector(selectUser).id;
  const theme = useSelector(state => state.main.theme)
  const itemCard = useSelector(state => state.notices.item)
  const activeFavorite = item.favorite.includes(idUser);
  const isFavorite = !activeFavorite;
  const dispatch = useDispatch();
  const agePet = birthday => {
    const nowDate = new Date().getTime();
    const [day, month, year] = birthday.split('.');
    const birthDate = new Date(
      `${Number(year)}-${Number(month)}-${Number(day)}`
    ).getTime();

    const differenceTime = nowDate - birthDate;

    if (differenceTime < 2630016000) {
      return `${Math.floor(differenceTime / 604800000)} week`;
    } else if (differenceTime < 31560192000) {
      return `${Math.floor(differenceTime / 2630016000)} mos`;
    } else {
      return `${Math.floor(differenceTime / 31560192000)} year`;
    }
  };

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalTrash, setIsOpenModalTrash] = useState(false);

  const toggleModal = () => {
    setIsOpenModal(isOpenModal => !isOpenModal);
  };

  const toggleTrash = () => {
    setIsOpenModalTrash(isOpenModalTrash => !isOpenModalTrash);
  };

  const truncateWord = word => {
    if (word.length > 6) {
      return word.substring(0, 6) + '..';
    }
    return word;
  };

  const handleDeleteNotice = () => {
    if (!idUser) {
      console.log('user disconnect');
      toast.error('Please authorize and try again!', {
        style: {
          backgroundColor: `var(--cl-background)`,
          padding: '6px',
          color: `var(--cl-black)`,
        },
        icon: '😸',
      });
      return;
    }

    if (card.owner !== idUser) {
      toast.error("You don't own this notice to do that!", {
        style: {
          backgroundColor: `var(--cl-background)`,
          padding: '6px',
          color: `var(--cl-black)`,
        },
        icon: '😸',
      });
      toggleTrash();
      return;
    }
    dispatch(deleteNotice(card.id));
    toggleTrash();
    console.log('Видаляємо notice');
  };

  return (
    <>
      <Card theme={theme}>
        <ImageWrapper>
          <Image
            alt="pet"
            src={
              card.imageURL
                ? card.imageURL
                : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgGi3YJI2iukoOZ3_fbYCyoiR4dYO8fIyIu_qpphSUf8GRAmFN'
            }
            onClick={toggleModal}
          />
          <CategoryTag theme={theme}>
            {card.categories ? card.categories : 'categories'}
          </CategoryTag>
          <TagList>
            <TagItem theme={theme}>
              <SvgIcon height="20" width="20">
                <use href={icon + '#location'} />
              </SvgIcon>
              <p>{card.place ? truncateWord(card.place) : 'city'}</p>
            </TagItem>
            <TagItem theme={theme}>
              <SvgIcon height="20" width="20">
                <use href={icon + '#clock'} />
              </SvgIcon>
              <p>{card.birthday ? agePet(card.birthday) : 'age'}</p>
            </TagItem>
            <TagItem theme={theme}>
              {card.sex === 'female' ? (
                <SvgIcon height="20" width="20" sex={card.sex}>
                  <use href={icon + '#female'} />
                </SvgIcon>
              ) : (
                <SvgIcon height="20" width="20" sex={card.sex}>
                  <use href={icon + '#male'} />
                </SvgIcon>
              )}
              <p>{card.sex ? card.sex : 'sex'}</p>
            </TagItem>
          </TagList>
          <FavoriteBtn onClick={() => handleFavorite(card, isFavorite)}>
            <HeartIcon
              height="20"
              width="20"
              isActive={activeFavorite}
              style={{ fill: '' }}
            >
              <use href={icon + '#heart'} />
            </HeartIcon>
          </FavoriteBtn>
          {card.owner === idUser && (
            <DeleteBtn onClick={toggleTrash}>
              <TrashIcon height="20" width="20">
                <use href={icon + '#trash'} />
              </TrashIcon>
            </DeleteBtn>
          )}
        </ImageWrapper>

        <DescriptionWrapper>
          <Title>
            {card.title ? card.title : 'Cute fox looking for a home'}
          </Title>
          <MoreBtn onClick={toggleModal}>Learn more</MoreBtn>
        </DescriptionWrapper>
        {isOpenModal && (
          <ModalNotice onClose={toggleModal} notice={card} noticeId={card.id} setIsOpenModal={setIsOpenModal} />
        )}
        {isOpenModalTrash && (
          <ModalApproveAction onClose={toggleTrash} height="389px">
            <ModalContent>
              <TitleModal>Delete adverstiment?</TitleModal>
              <DescrModal>
                <Text>
                  Are you sure you want to delete &nbsp;
                  <strong>“Cute dog looking for a home”?&nbsp;</strong>
                </Text>
                <p>You can`t undo this action.</p>
              </DescrModal>
              <ButtonWrap>
                <Button type="button" aria-label="cancel" onClick={toggleTrash}>
                  Cancel
                </Button>
                <ButtonTrash
                  type="button"
                  aria-label="delete"
                  onClick={handleDeleteNotice}
                >
                  Yes
                  <Trash>
                    <use href={icons + '#trash'} />
                  </Trash>
                </ButtonTrash>
              </ButtonWrap>
            </ModalContent>
          </ModalApproveAction>
        )}
      </Card>
    </>
  );
};
