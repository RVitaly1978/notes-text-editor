import * as React from 'react';
import deepEqual from 'fast-deep-equal';

function normalizeHtml(str) {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ');
}

function createRange(node, chars, range) {
  if (!range) {
    range = document.createRange();
    range.selectNode(node);
    range.setStart(node, 0);
  }

  if (chars.count === 0) {
    range.setEnd(node, chars.count);
  } else if (node && chars.count > 0) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length;
      } else {
        range.setEnd(node, chars.count);
        chars.count = 0;
      }
    } else {
      for (let lp = 0; lp < node.childNodes.length; lp += 1) {
        range = createRange(node.childNodes[lp], chars, range);

        if (chars.count === 0) {
          break;
        }
      }
    }
  }

  return range;
};

function setCurrentCursorPosition(el, chars) {
  if (chars >= 0) {
    const selection = window.getSelection();
    const range = createRange(el, { count: chars });
    if (range) {
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
};

function getCaretIndex(element) {
  let position = 0;
  const isSupported = typeof window.getSelection !== "undefined";
  if (isSupported) {
    const selection = window.getSelection();
    if (selection.rangeCount !== 0) {
      const range = window.getSelection().getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      position = preCaretRange.toString().length;
    }
  }
  return position;
}

function replaceCaret(el) {
  const target = document.createTextNode('');
  el.appendChild(target);

  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    const sel = window.getSelection();
    if (sel !== null) {
      const range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) {
      el.focus();
    }
  }
}

export default class ContentEditable extends React.Component {
  lastHtml = this.props.html;
  el = typeof this.props.innerRef === 'function'
    ? { current: null }
    : React.createRef();

  getEl = () => (
    this.props.innerRef && typeof this.props.innerRef !== 'function' ?
      this.props.innerRef :
      this.el
  ).current;

  render() {
    const { tagName, html, innerRef, ...props } = this.props;

    return React.createElement(
      tagName || 'div',
      {
        ...props,
        ref: typeof innerRef === 'function' ? (current) => {
          innerRef(current);
          this.el.current = current;
        } : innerRef || this.el,
        onInput: this.emitChange,
        onBlur: this.props.onBlur || this.emitChange,
        onKeyUp: this.props.onKeyUp || this.emitChange,
        onKeyDown: this.props.onKeyDown || this.emitChange,
        contentEditable: !this.props.disabled,
        dangerouslySetInnerHTML: { __html: html },
      }
    );
  }

  shouldComponentUpdate(nextProps) {
    const { props } = this;
    const el = this.getEl();

    if (!el) {
      return true;
    }

    if (normalizeHtml(nextProps.html) !== normalizeHtml(el.innerHTML)) {
      return true;
    }

    return props.disabled !== nextProps.disabled ||
      props.tagName !== nextProps.tagName ||
      props.className !== nextProps.className ||
      props.innerRef !== nextProps.innerRef ||
      !deepEqual(props.style, nextProps.style);
  }

  componentDidUpdate() {
    const el = this.getEl();
    if (!el) {
      return;
    }

    if (this.props.html !== el.innerHTML) {
      el.innerHTML = this.props.html;
    }
    this.lastHtml = this.props.html;

    if (this.props.caret) {
      setCurrentCursorPosition(el, this.props.caret);
    } else {
      replaceCaret(el);
    }
  }

  emitChange = (originalEvt) => {
    const el = this.getEl();
    if (!el) {
      return;
    }

    const html = el.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      const evt = Object.assign({}, originalEvt, {
        target: {
          value: html,
          caretPosition: getCaretIndex(el),
        }
      });
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }
}
