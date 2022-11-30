import { Box, Button, Divider, Icon, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Environment } from "../../environment"

interface IToolbarListingProps {
  textButtonNew?: string
  textSearch?: string

  showButtonNew?: boolean
  showButtonClose?: boolean
  showButtonDelete?: boolean
  showButtonSave?: boolean
  showSearchInput?:boolean

  onClickButtonNew?: () => void
  onClickButtonDelete?: () => void
  onClickButtonSave?: () => void
  onClickButtonClose?: () => void
  onChangeTextSearch?: (newText: string) => void
}

export const ToolbarListing: React.FC<IToolbarListingProps> = ({
  textButtonNew = 'novo',
  textSearch,

  showButtonNew = true,
  showButtonClose = true,
  showButtonDelete = true,
  showButtonSave = true,
  showSearchInput = true,

  onClickButtonNew,
  onClickButtonClose,
  onClickButtonDelete,
  onClickButtonSave,
  onChangeTextSearch

}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  return(
    <Box
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display='flex'
      gap={1}
      alignItems='center'
      component={Paper}
    >

    {!smDown && showSearchInput && <TextField
        size='small'
        label={Environment.SEARCH_INPUT}
        value={textSearch}
        onChange={(ev) => onChangeTextSearch?.(ev.currentTarget.value)}
      />}

      {showButtonSave && <Button variant='contained'
        color='primary'
        onClick={onClickButtonSave}
        disableElevation
        startIcon={<Icon>save</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          salvar
        </Typography>

      </Button>}

      {showButtonDelete && <Button variant='outlined'
        color='primary'
        onClick={onClickButtonDelete}
        disableElevation
        startIcon={<Icon>delete</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          apagar
        </Typography>

      </Button>}

      {showButtonNew && <Button variant='outlined'
        color='primary'
        onClick={onClickButtonNew}
        disableElevation
        startIcon={<Icon>add</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          {textButtonNew}
        </Typography>

      </Button>}

      {(!mdDown && showButtonClose &&
      (showButtonDelete || showButtonNew || showButtonSave))
       && <Divider variant='middle' orientation='vertical'/>}

      {(!mdDown && showButtonClose) && <Button variant='outlined'
        color='primary'
        onClick={onClickButtonClose}
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          voltar
        </Typography>

      </Button>}

    </Box>
  )
}
