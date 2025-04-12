"use client"

function SettingsPart_2() {
  // Sample login activity data based on the image
  const loginActivities = [
    {
      date: "2023-05-05",
      time: "14:30",
      location: "Monastir",
      deviceType: "Windows",
      deviceIcon: "💻",
      status: "Successful",
    },
    {
      date: "2023-05-05",
      time: "14:30",
      location: "Sousse",
      deviceType: "Android",
      deviceIcon: "📱",
      status: "Failed",
    },
    {
      date: "2023-05-05",
      time: "14:30",
      location: "Bembla",
      deviceType: "MacOS",
      deviceIcon: "💻",
      status: "Failed",
    },
    {
      date: "2023-05-05",
      time: "14:30",
      location: "Khnis",
      deviceType: "iOS",
      deviceIcon: "📱",
      status: "Successful",
    },
    // Ajoutez plus de lignes pour tester la barre de défilement
    {
      date: "2023-05-05",
      time: "14:30",
      location: "Test1",
      deviceType: "Test",
      deviceIcon: "💻",
      status: "Successful",
    },
    {
      date: "2023-05-05",
      time: "14:30",
      location: "Test2",
      deviceType: "Test",
      deviceIcon: "📱",
      status: "Failed",
    },
    {
      date: "2023-05-05",
      time: "14:30",
      location: "Test3",
      deviceType: "Test",
      deviceIcon: "💻",
      status: "Successful",
    },
    {
        date: "2023-05-05",
        time: "14:30",
        location: "Test3",
        deviceType: "Test",
        deviceIcon: "💻",
        status: "Successful",
      },
      {
        date: "2023-05-05",
        time: "14:30",
        location: "Test3",
        deviceType: "Test",
        deviceIcon: "💻",
        status: "Successful",
      },
  ]

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-md">Security Options</h2>
        <button className="px-8 py-2 text-sm text-white bg-indigo-500 rounded-md">
          Change Password
        </button>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPart_2