"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { ChevronDown, Plus, Minus } from "lucide-react"

function CustomSelect({ options, placeholder, onSelect }) {
  const [inputValue, setInputValue] = useState("")
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setFilteredOptions(options)
  }, [options])

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)

    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(value.toLowerCase())
    )
    setFilteredOptions(filtered)
    setIsOpen(true)
  }

  const handleSelect = (option) => {
    setInputValue(option.label)
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
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className="block w-full h-10 p-2 pl-5 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500"
        />
        <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-40">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              onMouseDown={() => handleSelect(option)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function SettingsPart_1() {
  const [emailNotifications, setEmailNotifications] = useState(false)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [pushNotifications, setPushNotifications] = useState(false)

  const [accountMinBalance, setAccountMinBalance] = useState(0)
  const [cardMinBalance, setCardMinBalance] = useState(0)

  const [selectedAccount, setSelectedAccount] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

  const [accountOptions, setAccountOptions] = useState([])
  const [cardOptions, setCardOptions] = useState([])

  const [saveButtonText1, setSaveButtonText1] = useState("Save")
  const [saveButtonText2, setSaveButtonText2] = useState("Save")

  const token = localStorage.getItem("token")
  if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:8083/Settings/list-of-accounts")
        .then((res) => {
          const accounts = res.data.map((acc) => ({
            label: `${acc.accountType} - ${acc.iban}`,
            value: acc.id,
            data: acc
          }))
          setAccountOptions(accounts)
        })

      axios.get("http://localhost:8083/Settings/list-of-cards")
        .then((res) => {
          const cards = res.data.map((card) => ({
            label: `${card.cardType} - ${card.cardNumber}`,
            value: card.id,
            data: card
          }))
          setCardOptions(cards)
        })

      // 🔄 Fetch current notification settings
      axios.get("http://localhost:8083/Settings/GetNotifications")
        .then((res) => {
          const data = res.data
          setEmailNotifications(data.receiveEmailNotifications || false)
          setSmsNotifications(data.receiveSmsNotifications || false)
          setPushNotifications(data.receivePushNotifications || false)
        })
        .catch((err) => console.error("Failed to fetch notification settings:", err))
    }
  }, [])

  const updateNotifications = (updated) => {
    axios.put("http://localhost:8083/Settings/SetNotifications", updated)
      .then((res) => {
        console.log("Notification settings updated:", res.data)
      })
      .catch((err) => {
        console.error("Error updating notification settings:", err)
      })
  }

  const handleNotificationToggle = (type) => {
    const updated = {
      receiveEmailNotifications: emailNotifications,
      receiveSmsNotifications: smsNotifications,
      receivePushNotifications: pushNotifications,
    }

    if (type === "email") {
      const newVal = !emailNotifications
      setEmailNotifications(newVal)
      updated.receiveEmailNotifications = newVal
    } else if (type === "sms") {
      const newVal = !smsNotifications
      setSmsNotifications(newVal)
      updated.receiveSmsNotifications = newVal
    } else if (type === "push") {
      const newVal = !pushNotifications
      setPushNotifications(newVal)
      updated.receivePushNotifications = newVal
    }

    updateNotifications(updated)
  }

  const incrementAccountBalance = () => setAccountMinBalance((prev) => prev + 100)
  const decrementAccountBalance = () => setAccountMinBalance((prev) => Math.max(prev - 100, 0))
  const incrementCardBalance = () => setCardMinBalance((prev) => prev + 100)
  const decrementCardBalance = () => setCardMinBalance((prev) => Math.max(prev - 100, 0))

  const saveAccountSettings = () => {
    if (selectedAccount) {
      axios.put(`http://localhost:8083/Settings/Account-balance-limit?accountId=${selectedAccount.value}&limitBalance=${accountMinBalance}`)
        .then((res) => {
          console.log("Account settings saved:", res.data)
          setSaveButtonText1("Saved")
          setTimeout(() => setSaveButtonText1("Save"), 2000)
        })
        .catch((err) => {
          console.error("Error saving account settings:", err)
        })
    }
  }

  const saveCardSettings = () => {
    if (selectedCard) {
      axios.put(`http://localhost:8083/Settings/Card-balance-limit?cardId=${selectedCard.value}&limitBalance=${cardMinBalance}`)
        .then((res) => {
          console.log("Card settings saved:", res.data)
          setSaveButtonText2("Saved")
          setTimeout(() => setSaveButtonText2("Save"), 2000)
        })
        .catch((err) => {
          console.error("Error saving card settings:", err)
        })
    }
  }

  return (
    <div className="grid grid-cols-1 gap-8 p-6 bg-white rounded-lg shadow-sm md:grid-cols-3">
      {/* Notifications */}
      <div>
        <h2 className="mb-6 font-semibold text-gray-800">Notification Settings</h2>
        <div className="space-y-6">
          {[
            { label: "Receive notifications by Email", value: emailNotifications, toggle: () => handleNotificationToggle("email") },
            { label: "Receive notifications by SMS", value: smsNotifications, toggle: () => handleNotificationToggle("sms") },
            { label: "Receive push notifications", value: pushNotifications, toggle: () => handleNotificationToggle("push") }
          ].map((notif, i) => (
            <div key={i} className="flex items-center justify-between gap-4">
              <span className="text-sm text-gray-600">{notif.label}</span>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notif.value ? "bg-indigo-500" : "bg-gray-200"}`}
                onClick={notif.toggle}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notif.value ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Account */}
      <div>
        <h2 className="mb-6 font-medium text-gray-800">Choose Your Account</h2>
        <div className="space-y-4">
          <CustomSelect
            options={accountOptions}
            placeholder="Select an account"
            onSelect={setSelectedAccount}
          />
          <div>
            <span className="flex justify-center mb-2 text-sm text-gray-600">Minimum balance alert</span>
            <div className="flex items-center justify-center">
              <button onClick={decrementAccountBalance} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 hover:bg-gray-300 rounded-l-md">
                <Minus size={16} />
              </button>
              <input
                type="text"
                value={accountMinBalance}
                onChange={(e) => setAccountMinBalance(Number(e.target.value))}
                className="w-20 h-8 text-sm text-center border-gray-200 border-y"
              />
              <button onClick={incrementAccountBalance} className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 hover:bg-indigo-600 rounded-r-md">
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={saveAccountSettings} className="w-2/3 py-2 text-sm text-indigo-500 bg-gray-100 rounded-md hover:bg-gray-300">{saveButtonText1}</button>
          </div>
        </div>
      </div>

      {/* Card */}
      <div>
        <h2 className="mb-6 font-medium text-gray-800">Choose Your Card</h2>
        <div className="space-y-4">
          <CustomSelect
            options={cardOptions}
            placeholder="Select a card"
            onSelect={setSelectedCard}
          />
          <div>
            <span className="flex justify-center mb-2 text-sm text-gray-600">Minimum balance alert</span>
            <div className="flex items-center justify-center">
              <button onClick={decrementCardBalance} className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-100 hover:bg-gray-300 rounded-l-md">
                <Minus size={16} />
              </button>
              <input
                type="text"
                value={cardMinBalance}
                onChange={(e) => setCardMinBalance(Number(e.target.value))}
                className="w-20 h-8 text-sm text-center border-gray-200 border-y"
              />
              <button onClick={incrementCardBalance} className="flex items-center justify-center w-8 h-8 text-white bg-indigo-500 hover:bg-indigo-600 rounded-r-md">
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button onClick={saveCardSettings} className="w-2/3 py-2 text-sm text-indigo-500 bg-gray-100 rounded-md hover:bg-gray-300">{saveButtonText2}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPart_1
