import React from 'react'
import './status.scss';
import Image from 'next/image';

const Status = ({status}) => {
  return (
    <div className={`status ${status === "Own Property" ? "own" : ""}`}>
            {status === "Listing" ? (
                <div className="status-icon">
                <Image src="/assets/images/exclamation.svg" alt="exclamationImg" width={100} height={100} style={{width: "auto", height: "auto"}}/>
              </div>
            ): null}
            <div className="status-content">{status}</div>
    </div>
  )
}

export default Status