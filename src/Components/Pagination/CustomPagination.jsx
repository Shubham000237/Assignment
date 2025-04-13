import React from 'react'
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({
count,
page,
onChange,
color,
size,
children
}) => {
  return (
    <Pagination
    count={count}
    page={page}
    onChange={onChange}
    color={color}
    size={size}
    >{children}</Pagination>
  )
}
export {CustomPagination}