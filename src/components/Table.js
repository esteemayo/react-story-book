import { TableBody, TableHeader } from 'components';

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

export default Table;
