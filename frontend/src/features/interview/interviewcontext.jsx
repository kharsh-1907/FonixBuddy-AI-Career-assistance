import { createContext, useState, useEffect } from 'react';

export const InterviewContext = createContext()

export const InterviewProvider = ({ children }) => {
    const [report, Setreport] = useState(null)
    const [reports, SetReports] = useState([])
    const [loading, Setloading] = useState(false)

    return (
        <InterviewContext.Provider value={{ report, Setreport, reports, SetReports, loading, Setloading }}>{children}</InterviewContext.Provider>
    )
} 