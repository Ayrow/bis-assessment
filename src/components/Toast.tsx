import { Transition } from '@headlessui/react';
import {
  BellAlertIcon,
  CheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { ToastTypes, closeToast } from '../features/toast/toastSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useEffect } from 'react';

// Set the colors based on toast type
const colorVariants = {
  Success: 'border-green-500 bg-green-500',
  Error: 'border-red-500 bg-red-500',
  Notification: 'border-blue-500 bg-blue-500',
  None: '',
};

const Toast = () => {
  const { isToastShown, toastType, toastMsg } = useAppSelector(
    (store) => store.toast
  );
  const dispatch = useAppDispatch();

  // Set an icon based on the toast type
  const newToastIcon = {
    [ToastTypes.Error]: <XMarkIcon className='h-4 w-4' />,
    [ToastTypes.Success]: <CheckIcon className='h-4 w-4' />,
    [ToastTypes.Notification]: <BellAlertIcon className='h-4 w-4' />,
    [ToastTypes.None]: <></>,
  };

  useEffect(() => {
    // Hide toast after set amount of time
    if (isToastShown) {
      setTimeout(() => {
        dispatch(closeToast());
      }, 2000);
    }
  }, [isToastShown]);

  if (isToastShown) {
    return (
      <Transition.Root
        show={isToastShown}
        enter='transition-opacity duration-75'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='transition-opacity duration-150'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'>
        <div className='relative z-10'>
          <div
            id='toast-default'
            className={`fixed mt-2 top-10 right-10 border z-0 flex items-center w-60 max-w-xs ${colorVariants[toastType]} py-2 px-4 rounded-lg shadow text-white`}
            role='alert'>
            {/* Toast icon */}
            <div className='inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-secondary-color-gray-lighter'>
              {newToastIcon[toastType]}
              <span className='sr-only'>icon</span>
            </div>
            {/* Toast msg */}
            <div className='ml-3 text-sm font-normal'>{toastMsg}</div>
            {/* Button to close toast manually */}
            <button
              type='button'
              className='ml-auto'
              data-dismiss-target='#toast-default'
              onClick={() => dispatch(closeToast())}
              aria-label='Close'>
              <span className='sr-only'>Close</span>
              <XMarkIcon className='h-6 w-6 text-secondary-color-white-darker hover:text-secondary-color-white' />
            </button>
          </div>
        </div>
      </Transition.Root>
    );
  }
};

export default Toast;
