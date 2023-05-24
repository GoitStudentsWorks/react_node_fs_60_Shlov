import styled from 'styled-components';
import { Field } from 'formik';

export const CategoryStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 12px;
  margin-bottom: 91px;

  @media screen and (min-width: 768px) {
    margin-bottom: 137px;
  }
`;

export const RadioButton = styled(Field)`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

export const CategoryStepLabel = styled.label`
  width: fit-content;
  position: relative;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 40px;
  font-weight: 500;
  font-size: 14px;
  line-height: calc(19 / 14);
  letter-spacing: 0.04em;
  color: var(--cl-blue-link);
  background-color: var(--cl-blue-light);

  transition: background-color var(--animat), color var(--animat);

  &:hover,
  &:focus,
  ${RadioButton}:checked + & {
    background-color: var(--cl-blue-link);
    color: var(--cl-background);
  }
`;

export const AddPetFormButtonWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 20px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
  }
`;

export const AddPetFormNextButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: var(--cl-blue-link);
  min-width: 248px;
  padding: 9px 0;
  border: none;

  font-weight: 700;
  font-size: 16px;
  line-height: calc(22 / 16);
  letter-spacing: 0.04em;
  color: var(--cl-background);
  border-radius: 40px;

  cursor: pointer;

  &:disabled {
    color: var(--cl-gray);
    background-color: var(--cl-blue-light);
    pointer-events: none;
  }
`;

export const PawIcon = styled.svg`
  fill: var(--cl-background);
`;
