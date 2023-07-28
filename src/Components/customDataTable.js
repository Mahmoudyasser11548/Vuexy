import React from 'react'
import { DataTable } from 'primereact/datatable'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.css'

const CustomDataTable = (prop) => {
  const {columns, data, ...rest} = prop

  return (
    <DataTable value={data} {...rest}>
      {columns.map((col) => (
        <Column 
          key={col.field} 
          field={col.field} 
          filter={col.filter} 
          filterPlaceholder={`Search by ${col.field}`} 
          body={col.bodyTemplate} 
          header={col.header}
          style={{ minWidth: col.style }}
          filterElement={col.filterElement}
        />
      ))}
    </DataTable>
  )
}

export default CustomDataTable