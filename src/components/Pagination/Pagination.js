import { PaginationWrapper, PaginationPanel, PaginationKey, SvgIcon } from "./Pagination.styled";
import icon from '../../images/icons.svg';



export const Pagination = () => {

  const isDisabled = true

  return(
    <PaginationWrapper>

    <PaginationPanel>
      <PaginationKey>
        <SvgIcon>
          <use href={icon + "#chevron-down"}/>
        </SvgIcon>
      </PaginationKey>
      <PaginationKey>
        1
      </PaginationKey>
      <PaginationKey>
        2
      </PaginationKey>
      <PaginationKey>
        3
      </PaginationKey>
      <PaginationKey>
        4
      </PaginationKey>
      <PaginationKey disabled={isDisabled}>
        <SvgIcon>
          <use href={icon + "#chevron-up"}/>
        </SvgIcon>
      </PaginationKey>
    </PaginationPanel>
    </PaginationWrapper>
  )
}