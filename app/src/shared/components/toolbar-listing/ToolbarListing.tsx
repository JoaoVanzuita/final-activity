import { Box, Button, Divider, Icon, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Environment } from "../../environment"

interface IToolbarListingProps {
  textButtonNew?: string
  textSearch?: string

  showButtonNew?: boolean
  showButtonSaveAndBack?: boolean
  showButtonBack?: boolean
  showButtonDelete?: boolean
  showButtonSave?: boolean
  showSearchInput?:boolean

  onClickButtonNew?: () => void
  onClickButtonSaveAndBack?: () => void
  onClickButtonDelete?: () => void
  onClickButtonSave?: () => void
  onClickButtonBack?: () => void
  onChangeTextSearch?: (newText: string) => void
}

export const ToolbarListing: React.FC<IToolbarListingProps> = ({
  textButtonNew = 'novo',
  textSearch,

  showButtonNew = false,
  showButtonSaveAndBack = false,
  showButtonBack = false,
  showButtonDelete = false,
  showButtonSave = false,
  showSearchInput = false,

  onClickButtonNew,
  onClickButtonSaveAndBack,
  onClickButtonBack,
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

    {showSearchInput && <TextField
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

      {(showButtonSaveAndBack && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickButtonSaveAndBack}
          startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Salvar e voltar
          </Typography>
        </Button>
      )}

      {showButtonDelete && <Button variant='outlined'
        color='primary'
        onClick={onClickButtonDelete}
        disableElevation
        startIcon={<Icon>delete</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          apagar
        </Typography>

      </Button>}

      {showButtonNew && <Button variant={showButtonSave ? 'outlined' : 'contained'}
        color='primary'
        onClick={onClickButtonNew}
        disableElevation
        startIcon={<Icon>add</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          {textButtonNew}
        </Typography>

      </Button>}

      {(!smDown && showButtonBack &&
      (showButtonDelete || showButtonNew || showButtonSave))
       && <Divider variant='middle' orientation='vertical'/>}

      {(!smDown && showButtonBack) && <Button variant='outlined'
        color='primary'
        onClick={onClickButtonBack}
        disableElevation
        startIcon={<Icon>arrow_back</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          voltar
        </Typography>

      </Button>}

    </Box>
  )
}
