import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserSchema, UserUpdate } from '../zodSchema/userInput';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModal } from '../features/modal/modalSlice';
import { useState } from 'react';

const EditUserModal = () => {
  const { userToEdit, isModalOpen } = useAppSelector((store) => store.modal);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      email: userToEdit?.email || '',
      username: userToEdit?.username || '',
    },
  });

  const handleUpdateUser = async (data: UserUpdate) => {
    setIsLoading(true);
    try {
      const res = await fetch(`input api url here`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
      if (res.ok) {
        await res.json();
        // display success message
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsLoading(false);
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-20'
        // initialFocus={cancelButtonRef}
        onClose={() => dispatch(closeModal())}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-60 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-gray-darker text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <form
                  onSubmit={handleSubmit(handleUpdateUser)}
                  className=' bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-base font-semibold leading-6 text-white'>
                        Update user: {userToEdit?.username}
                      </Dialog.Title>
                      <div className='mt-5'>
                        {/* Input to update username */}
                        <div className='py-5'>
                          <div className='flex items-center gap-5'>
                            <label className='w-24'>Email</label>
                            <div>
                              <input
                                {...register('email')}
                                className='px-2 rounded-lg'
                              />
                            </div>
                          </div>
                          {errors?.email?.message ? (
                            <p className='text-red-500 text-sm mt-1'>
                              {errors?.email?.message}
                            </p>
                          ) : (
                            ''
                          )}
                        </div>
                        <div className='py-5'>
                          <div className='flex items-center gap-5'>
                            <label htmlFor='' className=' w-24'>
                              Username
                            </label>
                            <div>
                              <input
                                {...register('username')}
                                className='px-2 rounded-lg'
                              />
                            </div>
                          </div>
                          {errors?.username?.message ? (
                            <p className='text-red-500 text-sm mt-1'>
                              {errors?.username?.message}
                            </p>
                          ) : (
                            <p className='text-sm mt-1'>
                              Must be at least 5 characters
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray px-4 py-3 flex flex-row-reverse gap-4 items-center sm:px-6'>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className={`${
                        isLoading
                          ? 'bg-gray-lighter'
                          : 'bg-green-600 hover:bg-green-500'
                      } 'inline-flex w-auto justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:w-auto'`}>
                      {isLoading ? 'Loading' : 'Save'}
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-red-300 hover:bg-red-300 sm:w-auto'
                      onClick={() => dispatch(closeModal())}>
                      Cancel
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default EditUserModal;
