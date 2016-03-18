import React from 'react';
import Meeting from './Meeting';

export const path = '/meeting';
export const action = async (state) => {
  const title = 'Meeting Application';
  state.context.onSetTitle(title);
  return <Meeting title={title} />;
};
