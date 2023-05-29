// Компонент рендерить модальне вікно з повним описом відповідного оголошення та компонентами AddToFavorite та Contact
// Елементи з контактною інформацією (email,  телефон) автора оголошення повинні бути реалізовані у вигляді посилань з додаванням ефекту :hover.                                                                                       Клік по кнопці AddToFavorite:
//         - якщо користувач АВТОРИЗОВАНИЙ - в залежності від того, чи додано відповідне оголошення в обрані, по кліку користувач додає оголошення в обрані або видаляє з них
//         - якщо користувач НЕАВТОРИЗОВАНИЙ, користувачу повинно виводитьсь повідомлення типу нотіфікація з інформацією про те, що користувачу потрібно авторизуватися для використання даного функціоналу
// Кнопка Contact повинна бути реалізована як посилання, при натисканні на яку користувача повинно переадресувати користувача на мобільний пристрій для виконання телефонного дзвінка по номеру користувача, що створив оголошення
// Модалка повинна закриватись по кліку на кнопку закриття модалки, клік по бекдропу, а також клік по Escape

import PropTypes from 'prop-types';
import icons from '../../images/icons.svg';
import { ModalApproveAction } from 'components/ModalApproveAction/ModalApproveAction';
import {
  Button,
  ButtonWrap,
  ButtonWrapThumb,
  CategoryTag,
  CommentWrap,
  Contact,
  ContactBlur,
  ContactBtn,
  HeartIcon,
  Image,
  ImageWrapper,
  ItemProp,
  ListContact,
  ListProperty,
  ModalContent,
  NameProp,
  Price,
  PriceValue,
  PriceWrap,
  SignProp,
  TitleModal,
} from './ModalNotice.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchNotice, updateFavorite } from 'Redux/notices/operation';
import { getIsLoadNotice, getNotice, selectFavorites} from 'Redux/notices/selector';
import { selectUser } from 'Redux/auth/selector';
import { toast } from 'react-hot-toast';

export const ModalNotice = ({ onClose, noticeId }) => {
  const dispatch = useDispatch();
  const [withoutBlur, setWithoutBlur] = useState(0);
  // console.log(withoutBlur);
  
  const {imageURL, categories, name, birthday, breed, place, sex, comments, price} = useSelector(getNotice);
  const isLoading = useSelector(getIsLoadNotice);
  const inUsersFavorites = useSelector(selectFavorites);
  const userId = useSelector(selectUser).id;
  const isFavorite = !inUsersFavorites.includes(userId);
  console.log(isFavorite)

  const handleBlurContacts = () => {
    setWithoutBlur(withoutBlur + 1);
  };
  
  const handleFavorite = () => {   
    if(!userId) {
      console.log("user disconnect") 
      toast.error('Please authorization and try again!', {
        style: {
          backgroundColor: '#fef9f9',
          padding: '6px',
          color: `'#111111'`,
        },
        icon: '😸',
      });
      return;
    }
    
    dispatch(updateFavorite({noticeId, isFavorite}));
  };


  useEffect(() => {    
    dispatch(fetchNotice(noticeId));
  }, [dispatch, noticeId, userId]);

  return (
    <>
      <ModalApproveAction onClose={onClose} width>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <ModalContent>
            <ImageWrapper>
              <Image
                alt="pet.name"
                src={
                  imageURL
                    ? imageURL
                    : 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSgGi3YJI2iukoOZ3_fbYCyoiR4dYO8fIyIu_qpphSUf8GRAmFN'
                }
              />
              <CategoryTag>
                {categories ? categories : 'categories'}
              </CategoryTag>
            </ImageWrapper>
            <div>
              <div>
                <TitleModal>Cute pet looking for a home</TitleModal>
              </div>
              <ListProperty>
                <ItemProp>
                  <NameProp>Name:</NameProp>
                  <SignProp>{name ? name : 'Pet'}</SignProp>
                </ItemProp>
                <ItemProp>
                  <NameProp>Birthday:</NameProp>
                  <SignProp>{birthday ? birthday : 'find'}</SignProp>
                </ItemProp>
                <ItemProp>
                  <NameProp>NameBreed:</NameProp>
                  <SignProp>{breed ? breed : 'superior'}</SignProp>
                </ItemProp>
                <ItemProp>
                  <NameProp>Place:</NameProp>
                  <SignProp>{place ? place : 'find'}</SignProp>
                </ItemProp>
                <ItemProp>
                  <NameProp>The sex:</NameProp>
                  <SignProp>{sex ? sex : 'sex'}</SignProp>
                </ItemProp>
              </ListProperty>
              <ListContact>
                <ItemProp>
                  <NameProp>Email:</NameProp>
                  {!withoutBlur ? (
                    <ContactBlur href="mailto:user@mail.com">
                      user@mail.com
                    </ContactBlur>
                  ) : (
                    <Contact href="mailto:user@mail.com">user@mail.com</Contact>
                  )}
                </ItemProp>
                <ItemProp>
                  <NameProp>Phone:</NameProp>
                  {!withoutBlur ? (
                    <ContactBlur href="tel:+380971234567" aria-label="phone">
                      +380971234567
                    </ContactBlur>
                  ) : (
                    <Contact href="tel:+380971234567" aria-label="phone">
                      +380971234567
                    </Contact>
                  )}
                </ItemProp>
              </ListContact>
            </div>
            {comments ? (
              <CommentWrap>
                <span>Comments:&nbsp;</span>
                <span>{comments}</span>
              </CommentWrap>
            ) : (
              <CommentWrap></CommentWrap>
            )}
            <ButtonWrapThumb>
              {price ? (
                <PriceWrap price>
                  <Price>Price:</Price>
                  <PriceValue>{price}</PriceValue>
                </PriceWrap>
              ) : (
                <PriceWrap>
                  <Price></Price>
                  <PriceValue></PriceValue>
                </PriceWrap>
              )}
              <ButtonWrap>
                {/* <ContactBtn href="tel:+380971234567" aria-label="phone button"> */}
                <ContactBtn
                  type="button"
                  aria-label="show contact button"
                  onClick={handleBlurContacts}
                >
                  Contact
                </ContactBtn>
                <Button
                  type="button"
                  aria-label="favorite button"
                  onClick={handleFavorite}
                >
                  {isFavorite ? "Add to" : "Del from"}
                  <HeartIcon>
                    <use href={icons + '#heart'}></use>
                  </HeartIcon>
                </Button>
              </ButtonWrap>
            </ButtonWrapThumb>
          </ModalContent>
        )}
      </ModalApproveAction>
    </>
  );
};

ModalNotice.propTypes = {
  onClose: PropTypes.func.isRequired,
};
