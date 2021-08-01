import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({data, columns, onDelete }) => {
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
