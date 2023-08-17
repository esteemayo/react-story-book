import PropTypes from 'prop-types';

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => {
          return <th key={column.path || column.key}>{column.label}</th>;
        })}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
};

export default TableHeader;
