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

export default TableHeader;
