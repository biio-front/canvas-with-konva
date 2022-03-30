import { modifyCanvasItemStyle } from '../reducers/canvas';
import { AppDispatch } from '../store';

export const changeStyle = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  dispatch: AppDispatch,
  kind: string,
) => {
  const { value } = event.target;

  dispatch(modifyCanvasItemStyle({ [kind]: value }));
};
