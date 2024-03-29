import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaPencilAlt } from 'react-icons/fa';

import DateTime from 'components/DateTime';
import DeleteButton from '../button/DeleteButton';

const TableBody = ({ data, onDelete }) => {
  return (
    <tbody>
      {data?.map((item) => {
        const { _id: id, slug, title, status, createdAt } = item;
        return (
          <tr key={id}>
            <td>
              <Link to={`/stories/details/${slug}`}>{title}</Link>
            </td>
            <td>
              <DateTime date={createdAt} />
            </td>
            <td className='dash-status'>{status}</td>
            <td>
              <Link to={`/stories/update/${slug}`} className='btn left-align'>
                Update <FaPencilAlt />
              </Link>{' '}
              <DeleteButton
                actionId={id}
                onAction={onDelete}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      status: PropTypes.bool.isRequired,
      createdAt: PropTypes.string.isRequired,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
};

export default TableBody;
