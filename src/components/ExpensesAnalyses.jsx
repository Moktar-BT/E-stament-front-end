import React, { useState, useEffect } from 'react';

function ExpensesAnalyses() {
  const [expensesData, setExpensesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const originalCategories = [
    "Housing Costs",
    "Transportation",
    "Food",
    "Healthcare",
    "Education",
    "Debt Payments",
    "Investments"
  ];

  useEffect(() => {
    const fetchExpensesData = async () => {
      try {
        const response = await fetch('http://localhost:8083/Dashboard/getExpensesAnalysis', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch expenses data');
        }
        
        const apiData = await response.json();
        const processedData = processExpensesData(apiData);
        setExpensesData(processedData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExpensesData();
  }, []);

  const processExpensesData = (apiData) => {
    const result = [];
    let othersAmount = 0;

    originalCategories.forEach(category => {
      const foundItem = apiData.find(item => 
        item.category.toLowerCase() === category.toLowerCase()
      );
      result.push({
        category: category,
        amount: foundItem ? foundItem.amount : 0
      });
    });

    apiData.forEach(item => {
      if (!originalCategories.some(cat => 
        cat.toLowerCase() === item.category.toLowerCase()
      )) {
        othersAmount += item.amount;
      }
    });

    if (othersAmount > 0) {
      result.push({
        category: "Others",
        amount: othersAmount
      });
    }

    return result;
  };

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item);
    setTooltipPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  const handleMouseMove = (event) => {
    if (hoveredItem) {
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  // [...] (loading and error states remain the same)

  const amounts = expensesData.filter(item => item.amount > 0).map(item => item.amount);
  const maxAmount = amounts.length > 0 ? Math.max(...amounts) : 0;
  const chartMax = Math.ceil(maxAmount / 500) * 500 || 500;

  return (
    <div className="w-full p-5 bg-white border border-gray-100 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-600">Expenses Analysis</h3>
      </div>

      {/* Chart Container */}
      <div className="relative">
        {/* X-axis scale markers */}
        <div className="flex justify-between mb-2 px-[120px] text-sm text-gray-500">
          {[0, chartMax/2, chartMax].map((value, index) => (
            <div key={index} className="relative">
              ${value.toLocaleString()}
            </div>
          ))}
        </div>

        {/* Grid lines */}
        <div className="absolute top-0 bottom-0 left-[120px] right-0 flex justify-between pointer-events-none">
          {[0, chartMax/2, chartMax].map((value, index) => (
            <div
              key={index}
              className={`w-px h-full ${
                value === 0 ? "bg-gray-600" : "bg-gray-200"
              }`}
              style={{
                left: `${(value / chartMax) * 100}%`,
              }}
            ></div>
          ))}
        </div>

        {/* Bars */}
        <div className="space-y-4">
          {expensesData.map((item, index) => (
            <div 
              key={index} 
              className="flex items-center"
              onMouseEnter={(e) => handleMouseEnter(item, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-[120px] text-right pr-4 text-sm text-gray-600">
                {item.category}
              </div>
              <div className="relative flex-1 h-8">
                <div
                  className={`absolute top-0 left-0 h-full rounded ${
                    item.amount > 0 ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-200'
                  } transition-colors duration-200`}
                  style={{ width: `${(item.amount / chartMax) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredItem && (
          <div 
            className="fixed px-3 py-2 text-sm text-white bg-gray-800 rounded-md shadow-lg pointer-events-none"
            style={{
              left: `${tooltipPosition.x + 15}px`,
              top: `${tooltipPosition.y + 15}px`,
              transform: 'translateX(-50%)',
              zIndex: 1000
            }}
          >
            ${hoveredItem.amount.toLocaleString('en-US', { 
              minimumFractionDigits: 2, 
              maximumFractionDigits: 2 
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExpensesAnalyses;