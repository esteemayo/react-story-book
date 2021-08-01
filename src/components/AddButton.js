import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const AddButton = () => {
    return (
        <div className='fixed-action-btn'>
            <Link to='/stories/create' className='btn-floating btn-large red'>
                <FaPlus />
            </Link>
        </div>
    );
};

export default AddButton;
