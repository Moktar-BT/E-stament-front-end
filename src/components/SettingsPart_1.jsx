"use client"

import { useState } from "react"
import { ChevronDown, Plus, Minus } from "lucide-react"

// Composant personnalisé pour le sélecteur avec hints
function CustomSelect({ options, placeholder, onSelect }) {
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [isOpen, setIsOpen] = useState(false)

  // Gérer les changements dans l'input
  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    // Filtrer les options en fonction de la saisie
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
    setIsOpen(true)
  }

  // Gérer la sélection d'une option
  const handleSelect = (option) => {
    setInputValue(option)
    onSelect(option)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex items-center">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)} // Fermer après un léger délai
          placeholder={placeholder}
          className="block w-full h-10 p-2 pl-5 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onMouseDown={() => handleSelect(option)} // Utiliser onMouseDown pour éviter la fermeture prématurée
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SettingsPart_1() {
  // State for notification toggles
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(true)

  // State for minimum balance alerts
  const [accountMinBalance, setAccountMinBalance] = useState(1500)
  const [cardMinBalance, setCardMinBalance] = useState(1500)

  // State for selected account and card
  const [selectedAccount, setSelectedAccount] = useState("")
  const [selectedCard, setSelectedCard] = useState("")

  // Handle increment/decrement for account balance
  const incrementAccountBalance = () => {
    setAccountMinBalance((prev) => prev + 100)
  }

  const decrementAccountBalance = () => {
    if (accountMinBalance > 0) {
      setAccountMinBalance((prev) => prev - 100)
    }
  }

  // Handle increment/decrement for card balance
  const incrementCardBalance = () => {
    setCardMinBalance((prev) => prev + 100)
  }

  const decrementCardBalance = () => {
    if (cardMinBalance > 0) {
      setCardMinBalance((prev) => prev - 100)
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 p-6 bg-white rounded-lg shadow-sm md:grid-cols-3">
      {/* Notification Settings */}
      <div>
        <h2 className="mb-6 font-semibold text-gray-800">Notification Settings</h2>
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">Receive notifications by Email</span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${emailNotifications ? "bg-indigo-500" : "bg-gray-200"}`}
              onClick={() => setEmailNotifications(!emailNotifications)}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifications ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">Receive notifications by SMS</span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${smsNotifications ? "bg-indigo-500" : "bg-gray-200"}`}
              onClick={() => setSmsNotifications(!smsNotifications)}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${smsNotifications ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-600">Receive push notifications</span>
            <button
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${pushNotifications ? "bg-indigo-500" : "bg-gray-200"}`}
              onClick={() => setPushNotifications(!pushNotifications)}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${pushNotifications ? "translate-x-6" : "translate-x-1"}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Account Settings */}
      <div>
        <h2 className="mb-6 font-medium text-gray-800">Choose Your Account</h2>
        <div className="space-y-4">
          <CustomSelect
            options={["Account1", "Account2", "Account3"]}
            placeholder="Select an account"
            onSelect={setSelectedAccount}
          />
          <div>
          <span className="flex justify-center">
            <p className="mb-2 text-sm text-gray-600">Minimum balance alert</p>
            </span>
            <div className="flex items-center justify-center">
              <button
                className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-l-md hover:bg-gray-300"
                onClick={decrementAccountBalance}
              >
                <Minus size={16} />
              </button>
              <input
                type="text"
                value={accountMinBalance}
                onChange={(e) => setAccountMinBalance(Number(e.target.value))}
                className="w-20 h-8 text-sm text-center border-gray-200 border-y"
              />
              <button
                className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-r-md hover:bg-indigo-600"
                onClick={incrementAccountBalance}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="w-2/3 py-2 text-sm text-indigo-500 bg-gray-100 rounded-md hover:bg-gray-300">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Card Settings */}
      <div>
        <h2 className="mb-6 font-medium text-gray-800">Choose Your Card</h2>
        <div className="space-y-4">
          <CustomSelect
            options={["Card1", "Card2", "Card3"]}
            placeholder="Select a card"
            onSelect={setSelectedCard}
          />
          <div>
            <span className="flex justify-center">
            <p className="mb-2 text-sm text-gray-600 ">Minimum balance alert</p>
            </span>
            
            <div className="flex items-center justify-center">
              <button
                className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 rounded-l-md hover:bg-gray-300"
                onClick={decrementCardBalance}
              >
                <Minus size={16} />
              </button>
              <input
                type="text"
                value={cardMinBalance}
                onChange={(e) => setCardMinBalance(Number(e.target.value))}
                className="w-20 h-8 text-sm text-center border-gray-200 border-y"
              />
              <button
                className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 rounded-r-md hover:bg-indigo-600"
                onClick={incrementCardBalance}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="w-2/3 py-2 text-sm text-indigo-500 bg-gray-100 rounded-md hover:bg-gray-300">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPart_1