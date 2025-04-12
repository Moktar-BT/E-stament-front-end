import React, { useState, useEffect } from 'react';

function IncomesVsExpenses() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8083/Dashboard/getIncomesVsExpenses', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const apiData = await response.json();
        const transformedData = apiData.map(item => ({
          period: item.period,
          income: item.income,
          expenses: item.expense
        }));
        setData(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMouseEnter = (type, index, value, event) => {
    setHoveredBar({ type, index, value });
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMouseMove = (event) => {
    if (hoveredBar) {
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredBar(null);
  };

  if (loading) return <div className="w-full p-4 text-center">Loading data...</div>;
  if (error) return <div className="w-full p-4 text-center text-red-500">Error: {error}</div>;
  if (data.length === 0) return <div className="w-full p-4 text-center">No data available</div>;

  const maxValue = Math.max(...data.map((item) => Math.max(item.income, item.expenses)));
  const totalIncome = data.reduce((sum, item) => sum + item.income, 0);
  const totalExpenses = data.reduce((sum, item) => sum + item.expenses, 0);

  return (
    <div className="w-full bg-white border border-gray-100 rounded-lg shadow-sm">
      <div className="flex flex-row items-center justify-between p-4 pb-2">
        <h3 className="mb-5 text-lg font-medium text-gray-600">Incomes vs. Expenses</h3>
      </div>

      <div className="p-4" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <div className="h-[300px]">
          <div className="relative h-[220px] w-full">
            {[0, 1, 2, 3].map((_, i) => (
              <div key={i} className="absolute w-full border-t border-gray-200" style={{ bottom: `${i * 80}px` }} />
            ))}

            <div className="absolute bottom-0 flex justify-around w-full h-full">
              {data.map((item, index) => (
                <div key={index} className="flex justify-center w-1/4 gap-4">
                  {/* Income bar */}
                  <div className="relative flex flex-col items-center w-12">
                    <div
                      className="w-full transition-colors bg-indigo-500 rounded-t cursor-pointer hover:bg-indigo-600"
                      style={{
                        height: `${(item.income / maxValue) * 240}px`,
                        position: 'absolute',
                        bottom: 0,
                      }}
                      onMouseEnter={(e) => handleMouseEnter('income', index, item.income, e)}
                    />
                  </div>

                  {/* Expense bar */}
                  <div className="relative flex flex-col items-center w-12">
                    <div
                      className="w-full transition-colors bg-pink-500 rounded-t cursor-pointer hover:bg-pink-600"
                      style={{
                        height: `${(item.expenses / maxValue) * 240}px`,
                        position: 'absolute',
                        bottom: 0,
                      }}
                      onMouseEnter={(e) => handleMouseEnter('expenses', index, item.expenses, e)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-around w-full mt-2">
            {data.map((item, index) => (
              <div key={index} className="text-sm text-center text-gray-600">
                {item.period}
              </div>
            ))}
          </div>

          {/* Legend and totals */}
          <div className="flex justify-start p-4 pt-2 gap-28">
            <div className="flex items-start gap-2 ml-9">
              <div className="w-1 h-10 mt-1 bg-indigo-600"></div>
              <div>
                <div className="text-sm font-medium">Incomes</div>
                <div className="font-semibold">
                  ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <div className="w-1 h-10 mt-1 bg-pink-500"></div>
              <div>
                <div className="text-sm font-medium">Expenses</div>
                <div className="font-semibold">
                  ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredBar && (
        <div 
          className="fixed px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg pointer-events-none"
          style={{
            left: `${tooltipPosition.x + 15}px`,
            top: `${tooltipPosition.y + 15}px`,
            transform: 'translateX(-50%)',
            zIndex: 1000
          }}
        >
          {hoveredBar.type === 'income' ? 'Income' : 'Expense'}: $
          {hoveredBar.value.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}
        </div>
      )}
    </div>
  );
}

export default IncomesVsExpenses;