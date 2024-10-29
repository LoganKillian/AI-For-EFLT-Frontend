import React from 'react';

interface TunedDataTableProps {
  tunedData: any[];
  currentPage: number;
  totalRows: number;
  onPageChange: (page: number) => void;
}

const TunedDataTable: React.FC<TunedDataTableProps> = ({ 
  tunedData, 
  currentPage, 
  totalRows, 
  onPageChange 
}) => {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  
  const columns = [
    'District',
    'Grade',
    'Year',
    'Original Score',
    'Adjusted Score'
  ];

  const transformedData = tunedData
    ?.slice(startIndex, endIndex)
    ?.map(row => ({
      'District': row.leanm || 'N/A',
      'Grade': row.grade || 'N/A',
      'Year': row.year || 'N/A',
      'Original Score': typeof row.original_achvz === 'number' ? row.original_achvz.toFixed(2) : 'N/A',
      'Adjusted Score': typeof row.predicted_achvz === 'number' ? row.predicted_achvz.toFixed(2) : 'N/A'
    })) || [];

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full bg-white table-auto">
          <thead className="sticky top-0 bg-white">
            <tr>
              {columns.map((column, index) => (
                <th 
                  key={index} 
                  className="px-2 py-2 border-b-2 border-gray-300 text-left text-xs leading-4 text-gray-700 uppercase tracking-wider font-bold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transformedData.length > 0 ? (
              transformedData.map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  {columns.map((column, colIndex) => (
                    <td 
                      key={colIndex} 
                      className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-sm text-gray-900 font-semibold"
                    >
                      {row[column]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-2 py-4 text-center text-gray-600"
                >
                  No data available
                </td>
              </tr>
            )}
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

export default TunedDataTable;