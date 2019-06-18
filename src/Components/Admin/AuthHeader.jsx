import React from 'react'

const AuthHeader = (props) => {
  return(
    <>
    <header className='AuthHeader'>
      Auth Header
    </header>
      {props.children}
    </>
  )
}

export default AuthHeader