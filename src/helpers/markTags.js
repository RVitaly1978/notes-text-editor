const hash = '<[/]*hash.*?>';
const hashTagReg = new RegExp(hash, 'mg');
const styledTagReg = /(<.*?)(style=".*?"|color=".*?")(>)/mg;
const spanTagReg = /<[/]*span>/mg;
const withHashTagReg = /(^|\s|&nbsp;|>)(#[a-zа-яё0-9][а-яё\w-]*[(?![a-zа-яё0-9_\])])/uigm;

export const unmarkTags = (text) => (
  text
    .replace(hashTagReg, '')
    .replace(styledTagReg, '$1$3')
    .replace(spanTagReg, '')
);

export const markTags = (text) => text.replace(withHashTagReg, '$1<hash>$2</hash>');

export const markTagsInText = (text) => markTags(unmarkTags(text));

export const getMarkedTagsInText = (text) => {
  const tags = text.replace(hashTagReg, '').match(withHashTagReg);

  if (!tags) {
    return [];
  }

  return tags.map((tag) => tag.slice(tag.indexOf('#')));
};
