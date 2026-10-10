import React, { useEffect } from 'react'
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"


const Protected_auth = ({ children }) => {

  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !user) {
      navigate("/", { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (<main><h1 style={{ color: "aliceblue" }}>Loading......</h1></main>)
  }
  if (!user) {
    return null
  }
  return children;
}

export default Protected_auth
