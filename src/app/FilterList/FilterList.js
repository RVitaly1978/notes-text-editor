import { memo } from 'react';
import FilterRecord from '../FilterRecord/FilterRecord';
import s from './FilterList.module.scss';

const FilterList = ({ tags }) => {
  let filterList = null;

  if (tags.length !== 0) {
    filterList = tags.map((id) => (
      <li key={id} className={s.listItem}>
        <FilterRecord id={id} />
      </li>
    ));
  }

  return filterList ? (
    <ul className={s.container}>
      {filterList}
    </ul>
  ) : null;
};

export default memo(FilterList);
