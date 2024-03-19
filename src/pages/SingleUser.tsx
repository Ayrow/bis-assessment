import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CourseRow from '../components/CourseRow';
import CourseRowSkeleton from '../components/CourseRowSkeleton';
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import { IUser, updateUser } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { UpdateUserSchema, UserUpdate } from '../zodSchema/userInput';
import { useForm } from 'react-hook-form';
import { areObjectsDifferent } from '../utils/areObjectsDifferent';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastTypes, showToast } from '../features/toast/toastSlice';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export interface ICourse {
  certificate: string;
  passmarks: number;
  classid: string;
  classcode: string;
  classname: string;
  marks: number;
}

const SingleUser = () => {
  const { id } = useParams();
  const { users } = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [userCourses, setUserCourses] = useState<ICourse[] | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserUpdate>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      id: currentUser?.id || 1,
      email: currentUser?.email || '',
      username: currentUser?.username || '',
      name: currentUser?.name || '',
      city: currentUser?.city || '',
      address: currentUser?.address || '',
      phone: currentUser?.phone || '',
      role: currentUser?.role || '',
    },
  });

  const getUserCourses = async () => {
    setIsFetching(true);
    try {
      // fetch course based on user id
      const res = await fetch(
        `https://pre.bistrainer.com/v1/index.cfm?action=testapi.courses&id=${id}`
      );

      const user = users?.find((person) => person.id === parseInt(id ?? '1'));
      if (user) {
        setCurrentUser(user);
      }
      if (res.ok) {
        const { classes } = await res.json();
        setUserCourses(classes);
      }
    } catch (error) {
      console.log('error', error);
    }
    setIsFetching(false);
  };

  // Handles search input for a course
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // Filtering courses based on the search input
  const filteredCourses = userCourses?.filter((item) => {
    return item.classcode.toLowerCase().includes(searchInput.toLowerCase());
  });

  const handleUpdateUser = async (data: UserUpdate) => {
    if (currentUser && areObjectsDifferent(data, currentUser)) {
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
        if (currentUser) {
          const newUserData: IUser = {
            id: currentUser.id,
            name: data.name,
            role: currentUser.role,
            address: data.address,
            city: data.city,
            phone: data.phone,
            email: data.email,
            username: data.username,
          };
          dispatch(updateUser(newUserData));
          dispatch(
            showToast({
              toastMsg: 'User updated',
              toastType: ToastTypes.Success,
            })
          );
        } else {
          // display toast if currentUser is null
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
      // Nothing to update: show toast
      dispatch(
        showToast({
          toastMsg: 'Nothing to update',
          toastType: ToastTypes.Notification,
        })
      );
    }
  };

  useEffect(() => {
    // Fetch courses on mount
    getUserCourses();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setValue('address', currentUser.address);
      setValue('name', currentUser.name);
      setValue('username', currentUser.username);
      setValue('city', currentUser.city);
      setValue('phone', currentUser.phone);
      setValue('email', currentUser.email);
      setValue('role', currentUser.role);
    }
  }, [currentUser]);

  // Scroll to hash section
  useEffect(() => {
    const hash = window.location.hash.slice(1); // Remove the '#' character from the hash
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <>
      {/* Title banner */}
      <div className='py-6 pl-10 bg-orange-800 flex items-center justify-between'>
        {/* TItle */}
        <h1 className='text-2xl text-white font-bold'>
          {currentUser?.username} Profile
        </h1>
        {/* input to filter users */}
        <div>
          <Link
            to={'/'}
            className='mr-5 flex items-center gap-2 text-white bg-gray-900 hover:bg-gray-600 px-3 py-2 rounded-lg shadow shadow-black'>
            <ArrowLeftIcon className='h-4 w-4' />
            Back
          </Link>
        </div>
      </div>

      {/* User profile */}
      <form onSubmit={handleSubmit(handleUpdateUser)} className='p-5'>
        <div className='flex flex-col md:grid md:grid-cols-2 gap-5'>
          {/* Left column */}
          <div className='flex flex-col items-center'>
            <h2 className='text-lg font-bold uppercase border-b border-b-orange-800'>
              User Information
            </h2>
            <div className='mt-5 py-4'>
              {/* Input to update name */}
              <div className='py-5 relative'>
                <div className='flex items-center gap-5'>
                  <label htmlFor='' className=' w-24'>
                    Name <span className='text-red-500'>*</span>
                  </label>

                  <input
                    {...register('name')}
                    className='px-2 rounded-lg border border-gray-400 bg-transparent text-black py-1'
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
                    className='px-2 rounded-lg border border-gray-400 bg-transparent text-black py-1'
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
                    className='px-2 rounded-lg border border-gray-400 bg-transparent text-black py-1'
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
              {/* Input to update email */}
              <div className='py-5 relative'>
                <div className='flex items-center gap-5'>
                  <label className='w-24'>
                    Email <span className='text-red-500'>*</span>
                  </label>

                  <input
                    {...register('email')}
                    className='px-2 rounded-lg border border-gray-400 bg-transparent text-black py-1'
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
              {/* Input to update phone */}
              <div className='py-5 relative'>
                <div className='flex items-center gap-5'>
                  <label className='w-24'>Phone</label>

                  <input
                    {...register('phone')}
                    className='px-2 rounded-lg border border-gray-400 bg-transparent text-black py-1'
                  />
                </div>
                <div className='absolute'>
                  {errors?.phone?.message ? (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors?.phone?.message}
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Right Column */}
          <div className='flex flex-col items-center'>
            <h2 className='text-lg font-bold uppercase text-center border-b border-b-orange-800'>
              Account
            </h2>
            <div className='mt-5 py-4'>
              <div className='flex gap-5 items-center'>
                <UserCircleIcon className=' h-32 w-32' />
                <p>Profile picture</p>
              </div>
              {/* Input to update username */}
              <div className='py-5 relative'>
                <div className='flex items-center gap-5'>
                  <label htmlFor='' className=' w-24'>
                    Username <span className='text-red-500'>*</span>
                  </label>

                  <input
                    {...register('username')}
                    className='px-2 rounded-lg border border-gray-400 bg-transparent text-black py-1'
                  />
                </div>
                <div className='absolute'>
                  {errors?.username?.message ? (
                    <p className='text-red-500 text-sm mt-1'>
                      {errors?.username?.message}
                    </p>
                  ) : (
                    <p className='text-sm mt-1 text-gray-600'>
                      Must be at least 5 characters
                    </p>
                  )}
                </div>
              </div>

              {/* Disabled input for role */}
              <div className='py-5 relative'>
                <div className='flex items-center gap-5'>
                  <label htmlFor='' className=' w-24'>
                    Role
                  </label>

                  <input
                    disabled
                    defaultValue={currentUser?.role}
                    className='px-2 rounded-lg border border-gray-400 bg-gray-200 py-1'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-gray-900' : 'bg-green-600 hover:bg-green-500'
            }  px-4 py-2 rounded-lg text-white mr-5 my-5`}>
            Save
          </button>
        </div>
      </form>

      {/* Course list */}
      <div>
        {/* Banner completed course */}
        <div className='flex items-center justify-between p-5 bg-gray-300'>
          {/* Title completed course */}
          <h2 className='font-bold text-lg'>Completed courses</h2>
          <div className=' flex flex-col gap-2 items-start'>
            {/* Search course input */}
            <div className='flex gap-2 items-center'>
              <input
                type='text'
                className='py-1 px-2 bg-gray-200 rounded-lg'
                placeholder='Find course...'
                value={searchInput}
                onChange={handleSearch}
              />
              {searchInput ? (
                // Button to clear search
                <button
                  type='button'
                  className='text-red-500'
                  onClick={() => setSearchInput('')}>
                  <XMarkIcon className='h-8 w-8' />
                </button>
              ) : (
                <MagnifyingGlassIcon className='h-8 w-8' />
              )}
            </div>
          </div>
        </div>
        {/* Header for the table */}
        <div className='grid grid-cols-6 bg-gray-200 font-bold gap-5 p-5'>
          <p>Id</p>
          <p>Classcode</p>
          <p>ClassName</p>
          <p>Passmark</p>
          <p>Mark</p>
          <p>Certificate</p>
        </div>

        {/* Course list */}
        {isFetching ? (
          // Skeleton for course row when fetching
          <div className='flex flex-col'>
            <CourseRowSkeleton />
            <CourseRowSkeleton />
            <CourseRowSkeleton />
            <CourseRowSkeleton />
            <CourseRowSkeleton />
          </div>
        ) : (
          // Course list when fetched
          <div className='flex flex-col' id='course-list'>
            {userCourses && filteredCourses && filteredCourses.length > 0 ? (
              filteredCourses?.map((course, index) => {
                return <CourseRow key={index} {...course} />;
              })
            ) : (
              // No course found
              <div className='flex justify-center py-10 h-72'>
                <p className='text-lg font-bold'>
                  No course found with this search
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
export default SingleUser;
