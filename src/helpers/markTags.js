const spanTag = '<[/]*span>';
const spanTagReg = new RegExp(spanTag, 'g');
const hashTagReg = new RegExp('(^|\\s|&nbsp;)(#[a-zа-яё0-9][а-яё\\w-]*\\b)', 'giu');
const markedHashTag = `${spanTag}(#[a-zа-яё0-9][а-яё\\w-]*\\b)${spanTag}`;
const markedHashTagReg = new RegExp(markedHashTag, 'giu');
// const hashTag = /(^|\s|&nbsp;|<div>)(#[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}][\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}-]*\b)/ugi;

export const unmarkTags = (text) => text.replace(spanTagReg, '');

export const markTags = (text) => text.replace(hashTagReg, '$1<span>$2</span>');

export const markTagsInText = (text) => markTags(unmarkTags(text));

export const getMarkedTagsInText = (text) => {
  const tags = text.match(markedHashTagReg);

  if (!tags) {
    return [];
  }

  return tags.map(unmarkTags);
};
