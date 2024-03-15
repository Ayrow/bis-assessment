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
  const itemsPerPage = 10; // Assuming 10 items per page

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

  // Calculate starting and ending index based on page number
  const startUserIndex = (pageNumber - 1) * itemsPerPage;
  const endUserIndex = startUserIndex + itemsPerPage;

  // Paginate filtered users based on indexes
  const paginatedData = filteredUsers.slice(startUserIndex, endUserIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div>
      {paginatedData
        .sort((a, b) => a.id > b.id)
        ?.map((user) => {
          return <UserRow key={user.id} {...user} />;
        })}
      {/* Pagination controls */}
      <div className='flex gap-5 m-5 w-1/3'>
        {pageNumber > 1 && (
          <button
            type='button'
            className='bg-orange-500 hover:bg-orange-300 px-2 rounded-lg text-white'
            onClick={goPreviousPage}>
            Previous
          </button>
        )}
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
        {pageNumber < totalPages && (
          <button
            type='button'
            className='bg-orange-500 hover:bg-orange-300 px-2 rounded-lg text-white'
            onClick={goNextPage}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default UsersList;
