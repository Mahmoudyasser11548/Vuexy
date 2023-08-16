import React, { useState } from 'react'
import { Button } from 'reactstrap'
import CustomCard from '../../Components/shared/CustomCard'
import { Plus } from 'react-feather'
import { FilterMatchMode } from 'primereact/api'
import CustomDataTable from '../../Components/Datatable/customDataTable'
import { Columns } from './Columns'

const data = [
  {
    id: 1,
    name: 'spin1',
    tenant: 'spin1'
  },
  {
    id: 2,
    name: 'spin2',
    tenant: 'spin2'
  },
  {
    id: 3,
    name: 'spin3',
    tenant: 'spin3'
  }
]

const List = () => {
  const [selectedSpin, setSelectedSpin] = useState()

  // Filter Configration
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.CONTAINS },
    tenant: { value: null, matchMode: FilterMatchMode.STARTS_WITH }
  })

  return (
    <CustomCard 
      title={'Spinning Wheels'}
      cardHeaderToolbar={
        <>
          <Button
            color="primary"
            className="btn-icon"
            outline
          >
            <Plus size={14} />
            <span className="align-middle ml-25 ms-1">
              Add Spinning Wheel
            </span>
          </Button>
        </>
      }
      body={
        <>
          <CustomDataTable 
            dataKey="id"
            headerSearch={true}
            filters={filters} 
            setFilters={setFilters}
            globalFilterFields={['name', 'tenant']}
            columns={Columns()}
            data={data}
            selectionMode='single'
            selection={selectedSpin} 
            onSelectionChange={(e) => setSelectedSpin(e.value)}
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]}
            emptyMessage="No Spinning wheels found"
            tableStyle={{ minWidth: '50rem' }}
          /> 
        </>
      }
    />
  )
}

export default List