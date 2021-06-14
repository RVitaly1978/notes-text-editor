import TagSearcher from '../TagSearcher/TagSearcher';
import TagsList from '../TagsList/TagsList';
import s from './TagsSection.module.scss';

const TagsSection = () => {
  return (
    <section className={s.tagsSection}>
      <TagSearcher />
      <TagsList />
    </section>
  );
};

export default TagsSection;
