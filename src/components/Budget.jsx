import React, { useState, useEffect } from 'react';

function Budget() {
  const [budgetData, setBudgetData] = useState({
    total: 0,
    expenses: 0,
    remaining: 0,
    expensesPercentage: 0,
    remainingPercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgetData = async () => {
      try {
        const response = await fetch('http://localhost:8083/Dashboard/getBudgetSummary', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Include JWT token if needed
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch budget data');
        }
        
        const data = await response.json();
        setBudgetData({
          total: data.total,
          expenses: data.expenses,
          remaining: data.remaining,
          expensesPercentage: data.expensesPercentage,
          remainingPercentage: data.remainingPercentage
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, []);

  // Calculate the circumference and stroke-dasharray values for the donut chart
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const expensesOffset = circumference * (1 - budgetData.expensesPercentage / 100);
  const remainingOffset = circumference * (1 - budgetData.remainingPercentage / 100);

  if (loading) {
    return (
      <div className="w-full h-auto min-h-[407px] bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center">
        <div>Loading budget data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-auto min-h-[407px] bg-white border border-gray-100 rounded-lg shadow-sm flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full h-auto min-h-[407px] bg-white border border-gray-100 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <h3 className="text-lg font-medium text-gray-600">Budget Summary</h3>
      </div>

      {/* Donut Chart */}
      <div className="flex justify-center p-4">
        <div className="relative w-[200px] h-[200px] sm:w-[230px] sm:h-[230px]">
          <svg className="w-full h-full" viewBox="0 0 220 220">
            {/* Remaining segment (light blue) */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#e0e7ff"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset="0"
              transform="rotate(-90 110 110)"
            />

            {/* Expenses segment (dark blue) */}
            <circle
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="20"
              strokeDasharray={circumference}
              strokeDashoffset={expensesOffset}
              transform="rotate(-90 110 110)"
            />
          </svg>

          {/* Center text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-sm text-gray-500 sm:text-md">Monthly Budget</span>
            <span className="text-xl font-bold sm:text-2xl">
              ${budgetData.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col justify-center gap-4 p-4 pt-7 sm:flex-row sm:gap-12">
        {/* Expenses */}
        <div className="flex items-start gap-2">
          <div className="w-1 h-8 mt-1 bg-indigo-600 sm:h-10"></div>
          <div>
            <div className="text-sm font-medium">Expenses</div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                ${budgetData.expenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm text-gray-500">
                • {budgetData.expensesPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Remaining */}
        <div className="flex items-start gap-2">
          <div className="w-1 h-8 mt-1 bg-indigo-100 sm:h-10"></div>
          <div>
            <div className="text-sm font-medium">Remaining</div>
            <div className="flex items-center gap-1">
              <span className="font-semibold">
                ${budgetData.remaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className="text-sm text-gray-500">
                • {budgetData.remainingPercentage.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;