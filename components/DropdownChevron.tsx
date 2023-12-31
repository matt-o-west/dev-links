import React from 'react'

interface DropdownChevronProps {
  style?: React.CSSProperties
}

const DropdownChevron: React.FC<DropdownChevronProps> = ({ style }) => {
  return (
    <div style={style}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='14'
        height='9'
        fill='none'
        className='mx-0.5 my-0.5'
        viewBox='0 0 14 9'
        aria-hidden='true'
      >
        <path stroke='#633CFF' strokeWidth='2' d='m1 1 6 6 6-6' />
      </svg>
    </div>
  )
}

export default DropdownChevron
