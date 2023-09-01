import PropTypes from 'prop-types';

import TableBody from './TableBody';
import TableHeader from './TableHeader';

const Table = ({ data, columns, onDelete }) => {
  return (
    <table className='striped'>
      <TableHeader columns={columns} />
      <TableBody
        data={data}
        onDelete={onDelete}
      />
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
};

export default Table;
