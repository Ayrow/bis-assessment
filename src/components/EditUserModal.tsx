import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateUserSchema, UserUpdate } from '../zodSchema/userInput';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeModal } from '../features/modal/modalSlice';
import { useState } from 'react';
import { IUser, updateUser } from '../features/users/usersSlice';
import { ToastTypes, showToast } from '../features/toast/toastSlice';

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
      id: userToEdit?.id || 1,
      email: userToEdit?.email || '',
      username: userToEdit?.username || '',
      name: userToEdit?.name || '',
      city: userToEdit?.city || '',
      address: userToEdit?.address || '',
      phone: userToEdit?.phone || '',
      role: userToEdit?.role || '',
    },
  });

  const areObjectsDifferent = (obj1: IUser, obj2: IUser) => {
    // Get the keys for the objects
    const keys = Object.keys(obj1);

    // Iterate through keys and compare values. Return true if a value is different
    for (const key of keys) {
      if (obj1[key as keyof IUser] !== obj2[key as keyof IUser]) {
        return true;
      }
    }
    // If all checks pass, the objects are different
    return false;
  };

  const handleUpdateUser = async (data: UserUpdate) => {
    if (userToEdit && areObjectsDifferent(data, userToEdit)) {
      setIsLoading(true);
      try {
        // const res = await fetch(`input api url here`, {
        //   method: 'PATCH',
        //   body: JSON.stringify(data),
        // });
        // if (res.ok) {
        //   await res.json();
        //   // display success message
        // }
        if (userToEdit) {
          const newUserData: IUser = {
            id: userToEdit.id,
            name: data.name,
            role: userToEdit.role,
            address: data.address,
            city: data.city,
            phone: userToEdit.phone,
            email: data.email,
            username: data.username,
          };
          dispatch(updateUser(newUserData));
          dispatch(closeModal());
          dispatch(
            showToast({
              toastMsg: 'User updated',
              toastType: ToastTypes.Success,
            })
          );
        } else {
          // display toast if userToEdit is null
          dispatch(
            showToast({
              toastMsg: 'No User to update',
              toastType: ToastTypes.Error,
            })
          );
        }
      } catch (error) {
        // display toast if error
        dispatch(
          showToast({
            toastMsg: 'An error occured',
            toastType: ToastTypes.Error,
          })
        );
      }
      setIsLoading(false);
    } else {
      // Nothing to update: close modal and show toast
      dispatch(closeModal());
      dispatch(
        showToast({
          toastMsg: 'Nothing to update',
          toastType: ToastTypes.Notification,
        })
      );
    }
  };

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-20 text-white'
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
          <div className='fixed inset-0 bg-black bg-opacity-70 transition-opacity' />
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
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                <form
                  onSubmit={handleSubmit(handleUpdateUser)}
                  className=' bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-start'>
                    <div className='mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left'>
                      <Dialog.Title
                        as='h3'
                        className='text-base font-semibold leading-6 text-white'>
                        Update user: {userToEdit?.username}
                      </Dialog.Title>

                      {/* Input fields */}
                      <div className='mt-8 py-4'>
                        <div className='text-red-500'> * Required fields</div>
                        {/* Input to update email */}
                        <div className='py-5 relative'>
                          <div className='flex items-center gap-5'>
                            <label className='w-24'>
                              Email <span className='text-red-500'>*</span>
                            </label>

                            <input
                              {...register('email')}
                              className='px-2 rounded-lg bg-gray-200 text-black'
                            />
                          </div>
                          <div className='absolute'>
                            {errors?.email?.message ? (
                              <p className='text-red-500 text-sm mt-1'>
                                {errors?.email?.message}
                              </p>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        {/* Input to update username */}
                        <div className='py-5 relative'>
                          <div className='flex items-center gap-5'>
                            <label htmlFor='' className=' w-24'>
                              Username <span className='text-red-500'>*</span>
                            </label>

                            <input
                              {...register('username')}
                              className='px-2 rounded-lg bg-gray-200 text-black'
                            />
                          </div>
                          <div className='absolute'>
                            {errors?.username?.message ? (
                              <p className='text-red-500 text-sm mt-1'>
                                {errors?.username?.message}
                              </p>
                            ) : (
                              <p className='text-sm mt-1 text-gray-300'>
                                Must be at least 5 characters
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Input to update name */}
                        <div className='py-5 relative'>
                          <div className='flex items-center gap-5'>
                            <label htmlFor='' className=' w-24'>
                              Name <span className='text-red-500'>*</span>
                            </label>

                            <input
                              {...register('name')}
                              className='px-2 rounded-lg bg-gray-200 text-black'
                            />
                          </div>
                          <div className='absolute'>
                            {errors?.name?.message && (
                              <p className='text-red-500 text-sm mt-1'>
                                {errors?.name?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Input to update city */}
                        <div className='py-5 relative'>
                          <div className='flex items-center gap-5'>
                            <label htmlFor='' className=' w-24'>
                              City
                            </label>

                            <input
                              {...register('city')}
                              className='px-2 rounded-lg bg-gray-200 text-black'
                            />
                          </div>
                          <div className='absolute'>
                            {errors?.city?.message && (
                              <p className='text-red-500 text-sm mt-1'>
                                {errors?.city?.message}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Input to update address */}
                        <div className='py-5 relative'>
                          <div className='flex items-center gap-5'>
                            <label htmlFor='' className=' w-24'>
                              Address
                            </label>

                            <input
                              {...register('address')}
                              className='px-2 rounded-lg bg-gray-200 text-black'
                            />
                          </div>
                          <div className='absolute'>
                            {errors?.address?.message && (
                              <p className='text-red-500 text-sm mt-1'>
                                {errors?.address?.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Buttons to update or cancel */}
                  <div className='bg-gray px-4 py-3 flex flex-row-reverse gap-4 items-center sm:px-6'>
                    <button
                      type='submit'
                      disabled={isLoading}
                      className={`${
                        isLoading
                          ? 'bg-gray-800'
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
