import React from "react"

import {
  Box,
  Table,
  TableBody,
  TableContainer,
  Paper,
} from '@material-ui/core'

import TableRowEdit from '../../Components/TableRowEdit/TableRowEdit'
  
export default function TabPanel(props) {
  // value index demandé / index l'index du panneau ...
  const { value, index, data, idUser, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={ value !== index }
      id={ `vertical-tabpanel-${index}` }
      aria-labelledby={ `vertical-tab-${index}` }
      { ...other }
    >
      {value === index && (
        <Box
          p={ 3 }
        >
          <TableContainer
            component={ Paper }
          >
            <Table
              aria-label="custom pagination table"
              size="medium"
            >
              <TableBody>
                {
                  data.map(
                    columnData =>
                      <TableRowEdit
                        {...columnData}
                        key={ columnData.queryName }
                        idUser={ idUser }
                        //setDefaultValue = { setDefaultValue }
                      />
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
}
