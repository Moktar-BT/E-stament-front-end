import { Info } from "lucide-react"

function AboutOurESS() {
  return (
    <div className="p-4 mx-auto bg-white rounded-lg shadow-sm md:p-6">
      {/* Illustration Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          {/* Computer monitor illustration */}
          <div className="relative w-48 h-32 bg-indigo-100 border-2 border-indigo-400 rounded-lg mt-14 md:w-64 md:h-44">
            {/* Monitor content */}
            <div className="absolute top-2 left-2 right-2 bottom-2 md:top-3 md:left-3 md:right-3 md:bottom-3">
              <div className="w-full h-3 mb-1 bg-indigo-50 md:h-4 md:mb-2"></div>
              <div className="flex">
                <div className="w-3/4 h-12 bg-indigo-50 md:h-20"></div>
                <div className="w-1/4 h-6 ml-1 bg-indigo-50 md:h-10 md:ml-2"></div>
              </div>
              <div className="absolute flex space-x-1 right-1 top-1 md:right-2 md:top-2">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>

            {/* Monitor stand */}
            <div className="absolute w-12 h-6 transform -translate-x-1/2 bg-indigo-200 rounded -bottom-6 left-1/2 md:w-16 md:h-8 md:-bottom-8"></div>
            <div className="absolute w-24 h-2 transform -translate-x-1/2 bg-gray-200 rounded -bottom-8 left-1/2 md:w-32 md:-bottom-10"></div>

            {/* Checkmark icon */}
            <div className="absolute p-1 bg-green-100 border-2 border-green-500 rounded-full -top-3 -right-3 md:p-2 md:-top-4 md:-right-4">
              <svg
                className="w-4 h-4 text-green-500 md:w-6 md:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* User icon */}
            <div className="absolute p-1 bg-indigo-100 border-2 border-indigo-500 rounded-full -top-3 -left-3 md:p-2 md:-top-4 md:-left-4">
              <svg
                className="w-4 h-4 text-indigo-500 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>

            {/* Security badge */}
            <div className="absolute p-1 bg-white border border-red-200 rounded-full -bottom-3 -left-3 md:-bottom-4 md:-left-4">
              <div className="flex items-center px-2 py-1 bg-white border border-red-200 rounded-full md:px-3">
                <svg
                  className="w-3 h-3 mr-1 text-red-500 md:w-4 md:h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-medium text-gray-700">Secure authentication</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="my-10 text-center md:my-20">
        <p className="mb-6 text-sm leading-relaxed text-gray-700 md:text-base">
          Welcome to our E-Statement platform, designed to provide you with a secure, fast, and eco-friendly way to
          access your banking statements. Our digital solution eliminates the need for paper statements, allowing you to
          conveniently view, download, and manage your financial records anytime, anywhere. With advanced security
          measures, you can trust that your sensitive information is protected. Stay organized, reduce paper waste, and
          enjoy seamless access to your transaction history—all in just a few clicks. Experience the future of digital
          banking with our e-Statement service.
        </p>
      </div>

      {/* Info Box */}
      <div className="p-3 border-l-4 border-blue-300 rounded bg-blue-50 md:p-4 ">
        <div className="flex">
          <Info className="flex-shrink-0 w-4 h-4 mr-2 text-blue-500 md:w-5 md:h-5" />
          <p className="text-xs text-gray-700 md:text-sm">
            We promise to prioritize the privacy and security of your personal information. We implement
            industry-standard security measures to protect your data from unauthorized access, loss, or misuse.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutOurESS