import { useEffect, createContext, useContext, useState } from 'react'
import axios from 'axios'

const FinancialContext = createContext()

export const FinancialProvider = ({ children }) => {
  const [financialData, setFinancialData] = useState(null) // Use `null` for object

  const BASE_URL = `https://riseandhackparishackathon.onrender.com`

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/financial/get-financial-data`, // ✅ no query param
          {
            withCredentials: true
          }
        )
        setFinancialData(response.data.data)
      } catch (error) {
        console.error('Error fetching financial data:', error)
      }
    }

    fetchFinancialData()
  }, [])

  return (
    <FinancialContext.Provider value={{ financialData }}>
      {children}
    </FinancialContext.Provider>
  )
}

export const useFinancial = () => {
  return useContext(FinancialContext)
}
