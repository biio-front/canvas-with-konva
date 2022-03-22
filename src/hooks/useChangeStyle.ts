import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { modifyElement, modifySelectedItem } from '../reducers/canvas';
import { AppDispatch } from '../store';

const useChangeStyle = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  dispatch: AppDispatch,
  action: ActionCreatorWithPayload<any, string>,
  kind: string,
) => {
  const { value } = event.target;

  dispatch(action(value));
  dispatch(modifyElement({ [kind]: value }));
  dispatch(modifySelectedItem({ [kind]: value }));
};

export default useChangeStyle;
