import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

const SpinnerLoading = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
    <Spinner animation="border" role="status" style={{ color: '#efb90b' }}>
        <span className="visually-hidden">Loading...</span>
    </Spinner>
</div>
  )
}

export default SpinnerLoading
