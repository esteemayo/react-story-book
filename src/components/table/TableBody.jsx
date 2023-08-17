import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { FaPencilAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

import DeleteButton from '../button/DeleteButton';

const TableBody = ({ data }) => {
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
              <Moment format='MMMM Do YYYY'>{createdAt}</Moment>
            </td>
            <td className='dash-status'>{status}</td>
            <td>
              <Link to={`/stories/update/${slug}`} className='btn left-align'>
                Update <FaPencilAlt />
              </Link>{' '}
              <DeleteButton id={id} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
