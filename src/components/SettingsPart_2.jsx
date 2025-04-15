"use client"

import { useEffect, useState } from "react"

function SettingsPart_2() {
  const [loginActivities, setLoginActivities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:8083/Settings/ConnectionHistory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
  
        if (!response.ok) {
          throw new Error("Failed to fetch connection history")
        }
  
        const data = await response.json()
  
        const formattedData = data.map((activity) => {
          const dateObj = new Date(activity.date_time)
          return {
            date: dateObj.toLocaleDateString(),
            time: dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            location: activity.location,
            deviceType: activity.deviceType,
            deviceIcon: ["Android", "iOS"].includes(activity.deviceType) ? "📱" : "💻",
            status: activity.status ? "Successful" : "Failed",
          }
        })
  
        const last15 = formattedData.slice(-15).reverse() // ✅ keep only the last 15 and reverse to show newest first
        setLoginActivities(last15)
      } catch (error) {
        console.error("Error fetching login activity:", error)
      }
    }
  
    fetchData()
  }, [])
  

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-md">Security Options</h2>
      </div>

      <div>
        <h3 className="mb-3 ml-16 text-sm font-medium">Recent Login Activity</h3>

        <div className="px-16 overflow-x-auto">
          <div className="max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <table className="w-full border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 bg-gray-200 rounded-tl-lg">
                    Date
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 bg-gray-200">
                    Time
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 bg-gray-200">
                    Location
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 bg-gray-200">
                    Device Type
                  </th>
                  <th className="px-4 py-3 text-sm font-medium text-left text-gray-600 bg-gray-200 rounded-tr-lg">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {loginActivities.map((activity, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm text-gray-700 bg-gray-100 rounded-l-lg">
                      {activity.date}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 bg-gray-100">
                      {activity.time}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 bg-gray-100">
                      {activity.location}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 bg-gray-100">
                      <div className="flex items-center">
                        <span className="mr-2">{activity.deviceIcon}</span>
                        {activity.deviceType}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 bg-gray-100 rounded-r-lg">
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          activity.status === "Successful"
                            ? "text-green-500 bg-green-50"
                            : "text-red-500 bg-red-50"
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {loginActivities.length === 0 && (
              <div className="py-4 text-center text-gray-500">No login activity found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPart_2
