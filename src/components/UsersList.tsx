import { IUser } from '../features/users/usersSlice';
import UserRow from './UserRow';

interface IProps {
  users: IUser[];
  searchInput: string;
  pageNumber: number;
  goPreviousPage: () => void;
  goNextPage: () => void;
  goToPageNumber: (arg: number) => void;
}

const UsersList = ({
  users,
  searchInput,
  pageNumber,
  goPreviousPage,
  goNextPage,
  goToPageNumber,
}: IProps) => {
  const itemsPerPage = 10; // Definin 10 items per page

  // Filter data based on search input
  const filteredUsers = users.filter((item) => {
    const nameMatch = item.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const emailMatch = item.email
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const usernameMatch = item.username
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    return nameMatch || emailMatch || usernameMatch;
  });

  // Calculate starting index based on page number
  const startUserIndex = (pageNumber - 1) * itemsPerPage;

  // Calculate starting index based on page number
  const endUserIndex = startUserIndex + itemsPerPage;

  // Paginate filtered users based on indexes
  const paginatedUsers = filteredUsers.slice(startUserIndex, endUserIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div>
      {/* List of users sorted and filtered */}
      {paginatedUsers
        .sort((a, b) => a.id > b.id)
        ?.map((user) => {
          return <UserRow key={user.id} {...user} />;
        })}

      {/* Pagination */}
      {paginatedUsers.length > 1 ? (
        <div className=' flex justify-center gap-5 m-5'>
          {/* Pagination previous */}
          {pageNumber > 1 ? (
            <button
              type='button'
              className='bg-orange-500 hover:bg-orange-300 px-2 rounded-lg text-white'
              onClick={goPreviousPage}>
              Previous
            </button>
          ) : (
            // empty space to not move buttons around when disappearing
            <div className='w-20 '></div>
          )}
          {/* Buttons to select specific page */}
          {totalPages > 1 && (
            <div className='flex gap-2'>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToPageNumber(index + 1)}
                  className={`border border-gray-400 px-2 rounded-lg  ${
                    pageNumber === index + 1
                      ? 'bg-gray-700 text-white'
                      : 'hover:bg-gray-200'
                  }`}>
                  {index + 1}
                </button>
              ))}
            </div>
          )}
          {/* Pagination next */}
          {pageNumber < totalPages ? (
            <button
              type='button'
              className='bg-orange-500 hover:bg-orange-300 px-2 rounded-lg text-white'
              onClick={goNextPage}>
              Next
            </button>
          ) : (
            // empty space to not move buttons around when disappearing
            <div className='w-12 '></div>
          )}
        </div>
      ) : (
        <div className='flex justify-center py-10 h-72'>
          <p className='text-lg font-bold'>No user found with this search</p>
        </div>
      )}
    </div>
  );
};

export default UsersList;
