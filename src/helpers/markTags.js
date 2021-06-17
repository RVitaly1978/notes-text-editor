export const markTags = (text) => {
  const tagReg = /(^|\s|&nbsp;)(#[a-zа-яё0-9][а-яё\w-]*\b)/ugi;
  const replaced = text.replace(tagReg, "$1<span>$2</span>");
  return replaced;
};

export const unmarkTags = (text) => {
  const tagReg = /(<[/]*span>)/g;
  const replaced = text.replace(tagReg, "");
  return replaced;
};
