import { Paper } from '@mui/material'
import { createTheme, styled } from '@mui/material/styles'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const primaryFontSize = 14

export const PrimaryTheme = createTheme({
  palette: {
    primary: {
      main: '#0166fe',
    },
    secondary: {
      main: '#fff9d1',
    },
  },
  typography: {
    fontFamily: ['PT Sans', 'sans-serif'].join(','),
    fontSize: primaryFontSize,
    fontWeightLight: 100,
    fontWeightRegular: 400,
    fontWeightBold: 700,
    body1: {
      fontSize: primaryFontSize,
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontSize: primaryFontSize,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: (themeParam) => ({
          boxShadow: themeParam.theme.shadows[3],
          fontSize: primaryFontSize,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: primaryFontSize,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        paragraph: {
          fontSize: primaryFontSize,
        },
      },
    },
  },
})

export const StyledTableCell = styled(TableCell)(() => ({
  '&.MuiTableCell-head': {
    backgroundColor: '#f4f4f4',
    fontWeight: 600,
    padding: '10px',
  },
  '&.MuiTableCell-body': {
    fontSize: 14,
    padding: '6px',
  },
}))

export const StyledTableBoldCell = styled(TableCell)(() => ({
  backgroundColor: '#f4f4f4',
  fontSize: 14,
  fontWeight: 600,
  padding: '10px',
}))

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 40,
  height: 40,
  ...theme.typography.body2,
  textAlign: 'center',
  borderRadius: 50,
}))

export const DemoPaper2 = styled(Paper)(({ theme }) => ({
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ...theme.typography.body2,
  textAlign: 'center',
  borderRadius: 50,
}))
