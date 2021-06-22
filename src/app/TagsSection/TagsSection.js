import TagSearcher from '../TagSearcher/TagSearcher';
import TagsList from '../TagsList/TagsList';
import s from './TagsSection.module.scss';

const TagsSection = () => {
  return (
    <section className={s.container}>
      <TagSearcher />
      <TagsList />
    </section>
  );
};

export default TagsSection;
