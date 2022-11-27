import { Box, Button, Divider, Icon, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"

interface IToolbarTransactionProps {
  textButtonNew?: string

  showButtonNew?: boolean
  showButtonClose?: boolean
  showButtonDelete?: boolean
  showButtonSave?: boolean

  onClickButtonNew?: () => void
  onClickButtonDelete?: () => void
  onClickButtonSave?: () => void
  onClickButtonClose?: () => void
}

export const ToolbarTransaction: React.FC<IToolbarTransactionProps> = ({
  textButtonNew = 'novo',

  showButtonNew = true,
  showButtonClose = true,
  showButtonDelete = true,
  showButtonSave = true,

  onClickButtonNew,
  onClickButtonClose,
  onClickButtonDelete,
  onClickButtonSave
}) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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

      {(!smDown && showButtonClose &&
      (showButtonDelete || showButtonNew || showButtonSave))
       && <Divider variant='middle' orientation='vertical'/>}

      {(!smDown && showButtonClose) && <Button variant='outlined'
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