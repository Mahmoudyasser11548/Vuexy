import React from 'react'
import DataTable from 'react-data-table-component'
import { Spinner } from 'reactstrap'

const CustomDataTable = (prop) => {
  const {columns, data, ...rest} = prop
  return (
    <> 
      <DataTable
        columns={columns}
        data={data}
        progressComponent={
          <div className="py-3">
            <Spinner color="primary" />
          </div>
        }
        style={{ cursor: "pointer" }}
        {...rest}
      />
    </>
  )
}

export default CustomDataTable