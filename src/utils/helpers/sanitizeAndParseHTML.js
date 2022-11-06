import sanitizeHtml from 'sanitize-html';
import parse from 'html-react-parser';

const rules = {
  allowedTags: ['b', 'i', 'em', 'strong', 'a', 'pre', 'div', 'code'],
  transformTags: {
    pre: 'p',
    a: sanitizeHtml.simpleTransform('a', {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
  },
};

const cleanHtml = text => {
  return sanitizeHtml(text, rules);
};

const parseHTML = cleanHtml => {
  return parse(cleanHtml.toString());
};

export const sanitizeAndParseHTML = html => {
  const cleanedHtml = cleanHtml(html);
  const text = parseHTML(cleanedHtml);
  return text;
};
