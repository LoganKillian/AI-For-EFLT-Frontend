import React from 'react';

interface DataTableProps {
  data: any[];
  columns: string[];
  currentPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, currentPage, totalRows, onPageChange }) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full bg-white table-auto">
          <thead className="sticky top-0 bg-white">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className={`px-2 py-2 border-b-2 border-gray-300 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider ${
                    index < 6 ? 'font-bold' : ''
                  }`}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex} 
                    className={`px-2 py-2 whitespace-nowrap border-b border-gray-200 text-sm text-gray-900 ${
                      colIndex < 6 ? 'font-semibold' : ''
                    }`}
                  >
                    {row[column]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 px-2 py-2 bg-white">
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="py-2 px-4 text-gray-900">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;