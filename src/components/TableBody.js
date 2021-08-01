import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import Button from './Button';

const TableBody = ({ data, onDelete }) => {
    return (
        <tbody>
            {data.map(item => {
                const { _id, slug, title, status, createdAt } = item;
                return (
                    <tr key={_id}>
                        <td>
                            <Link to={`/stories/details/${slug}`}>{title}</Link>
                        </td>
                        <td><Moment format='MMMM Do YYYY'>{createdAt}</Moment></td>
                        <td className='dash-status'>{status}</td>
                        <td>
                            <Link
                                to={`/stories/update/${slug}`}
                                className='btn left-align'
                            >
                                Update {' '}
                                <FaPencilAlt />
                            </Link>
                            {' '}
                            <Button
                                text='Delete'
                                className='btn red'
                                icon={<FaTrash />}
                                onClick={() => onDelete(_id)}
                            />
                        </td>
                    </tr>
                )
            })}
        </tbody>
    );
};

export default TableBody;
