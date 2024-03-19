import { useEffect, useState } from 'react';
import { IUser, setUsers } from '../features/users/usersSlice';
import EditUserModal from '../components/EditUserModal';
import { useAppDispatch, useAppSelector } from '../../hooks';
import UsersList from '../components/UsersList';
import UserRowSkeleton from '../components/UserRowSkeleton';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { ToastTypes, showToast } from '../features/toast/toastSlice';

const Home = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const { isModalOpen } = useAppSelector((store) => store.modal);
  const { users } = useAppSelector((store) => store.users);
  const dispatch = useAppDispatch();

  const getAllUsers = async () => {
    setIsFetching(true);
    try {
      // fetch all users
      const res = await fetch(
        'https://pre.bistrainer.com/v1/index.cfm?action=testapi.users'
      );
      if (res.ok) {
        // users are returned
        const { users }: { users: IUser[] } = await res.json();
        dispatch(setUsers(users));
      } else {
        // If res not ok, users not found
        dispatch(
          showToast({
            toastMsg: 'Users not found',
            toastType: ToastTypes.Error,
          })
        );
      }
    } catch (error) {
      // error fetching
      dispatch(
        showToast({
          toastMsg: 'An error occurred',
          toastType: ToastTypes.Error,
        })
      );
    }
    setIsFetching(false);
  };

  // Handles search input for a user
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (pageNumber !== 1) {
      setPageNumber(1);
    }
    setSearchInput(e.target.value);
  };

  const goPreviousPage = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const goToPageNumber = (arg: number) => {
    setPageNumber(arg);
  };

  useEffect(() => {
    if (!users) {
      // Fetch users if users state is null
      getAllUsers();
    }
  }, []);

  return (
    <div className=''>
      {isModalOpen && <EditUserModal />}

      <div>
        {/* Title banner */}
        <div className='py-7 pl-10 bg-orange-800 flex items-center justify-between'>
          {/* TItle */}
          <h1 className='text-2xl text-white font-bold'>Manage users</h1>
          {/* input to filter users */}
          <div className=' flex flex-col gap-2 items-start mr-5'>
            <div className='flex gap-2 items-center'>
              <input
                type='text'
                className='py-1 px-2 bg-gray-200 rounded-lg'
                placeholder='Find users'
                value={searchInput}
                onChange={handleSearch}
              />
              {/* Button to clear search */}
              {searchInput ? (
                <button
                  type='button'
                  className='text-white'
                  onClick={() => setSearchInput('')}>
                  <XMarkIcon className='h-8 w-8' />
                </button>
              ) : (
                <MagnifyingGlassIcon className='h-8 w-8 text-white' />
              )}
            </div>
          </div>
        </div>

        {/* Header list */}
        <div className=' grid grid-cols-6 font-bold bg-gray-200 border-b-2 border-gray-500 p-5 text-lg'>
          <p>Id</p>
          <p>Username</p>
          <p>Name</p>
          <p>Email</p>
          <p>Address</p>
          <p></p>
        </div>

        {/* Mapping all users */}
        {isFetching ? (
          <div className='flex flex-col'>
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
            <UserRowSkeleton />
          </div>
        ) : (
          <div className='flex flex-col'>
            {users ? (
              <UsersList
                users={users}
                searchInput={searchInput}
                pageNumber={pageNumber}
                goPreviousPage={goPreviousPage}
                goNextPage={goNextPage}
                goToPageNumber={goToPageNumber}
              />
            ) : (
              <p className='text-gray-900'>
                No user found. Please try a different search
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Home;
