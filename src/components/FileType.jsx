import React from 'react'
import { useState } from "react"
import { FileText,  } from "lucide-react"

function FileType() {
    const [fileType, setFileType] = useState("pdf");
  return (
    <>
      {/* File Format */}
                <div className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="mb-4 text-lg font-medium text-gray-800">File Format</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                        fileType === "pdf" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setFileType("pdf")}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          fileType === "pdf" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-medium">PDF</span>
                    </div>
                    <div
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                        fileType === "csv" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setFileType("csv")}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          fileType === "csv" ? "bg-indigo-100 text-indigo-500" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-medium">CSV</span>
                    </div>
                    <div
                      className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-colors ${
                        fileType === "excel" ? "border-indigo-500 bg-indigo-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setFileType("excel")}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                          fileType === "excel" ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        <FileText size={20} />
                      </div>
                      <span className="text-sm font-medium">EXCEL</span>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default FileType