import React from 'react'
import { useParams } from 'react-router-dom'
const UserProf = () => {
    const params = useParams()
    console.log(params)
  return (
    <div>UserProf</div>
  )
}

export default UserProf