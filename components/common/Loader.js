import classNames from 'classnames';
import { HashLoader } from 'react-spinners';

export default function Loader({ global = false }) {
  return (
    <div
      className={classNames(
        'flex justify-around items-center',
        global
          ? 'absolute top-0 right-0 bottom-0 left-0 bg-gray-100 z-50 bg-opacity-50'
          : 'h-72'
      )}
    >
      <HashLoader color="#4ade80" />
    </div>
  );
}
