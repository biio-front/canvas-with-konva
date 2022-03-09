import { Input } from '../../../hooks/useInput';

type Props = {
  bgColor: Input;
};

function CustomizingBgColor({ bgColor }: Props) {
  return (
    <>
      <div className='customizing-title'>
        <span>카드 배경 색상</span>
      </div>

      <div className='customizing-board'>
        <div className='content'>
          <label htmlFor='color'>
            <div>배경 색상</div>
            <input type='color' value={bgColor.value} onChange={bgColor.onChange} />
          </label>
        </div>
      </div>
    </>
  );
}

export default CustomizingBgColor;
