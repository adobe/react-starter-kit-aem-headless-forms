import React from 'react';
// @ts-ignore
import sanitizeHTML from 'sanitize-html';

export const richTextString = (stringMsg = '') => {
  const htmlProp = {__html : sanitizeHTML(stringMsg)};
  return (<div dangerouslySetInnerHTML={htmlProp} /> );
};
export const DEFAULT_ERROR_MESSAGE = 'There is an error in the field';