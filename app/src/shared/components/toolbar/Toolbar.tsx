import { Box, Button, Divider, Icon, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material"
import { Environment } from "../../environment"

interface IToolbarProps {
  textButtonNew?: string
  textSearch?: string

  showSearchInput?:boolean
  showButtonSave?: boolean
  showButtonSaveAndBack?: boolean
  showButtonNew?: boolean
  showButtonDelete?: boolean
  showButtonAddItem?: boolean
  showButtonViewOrder?: boolean
  showButtonManageAccount?: boolean
  showButtonBack?: boolean
  showButtonExit?: boolean

  onChangeTextSearch?: (newText: string) => void
  onClickButtonSave?: () => void
  onClickButtonSaveAndBack?: () => void
  onClickButtonNew?: () => void
  onClickButtonDelete?: () => void
  onClickButtonAddItem?: () => void
  onClickButtonViewOrder?: () => void
  onClickButtonManageAccount?: () => void
  onClickButtonBack?: () => void
  onClickButtonExit?: () => void
}

export const Toolbar: React.FC<IToolbarProps> = ({
  textButtonNew = 'novo',
  textSearch,

  showSearchInput = false,
  showButtonSave = false,
  showButtonSaveAndBack = false,
  showButtonNew = false,
  showButtonDelete = false,
  showButtonAddItem = false,
  showButtonViewOrder = false,
  showButtonManageAccount = false,
  showButtonExit = false,
  showButtonBack = false,

  onChangeTextSearch,
  onClickButtonSave,
  onClickButtonSaveAndBack,
  onClickButtonNew,
  onClickButtonAddItem,
  onClickButtonViewOrder,
  onClickButtonManageAccount,
  onClickButtonBack,
  onClickButtonExit,

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
      justifyContent='space-between'
      component={Paper}
    >

      <Box
        display='flex'
        gap={1}
        alignItems='center'
      >
        {showSearchInput && <TextField
            size='small'
            label={Environment.SEARCH_INPUT}
            value={textSearch}
            onChange={(ev) => onChangeTextSearch?.(ev.currentTarget.value)}
        />}

        {showButtonSave && <Button
          variant='contained'
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

        {showButtonNew && <Button variant={showButtonSave ? 'outlined' : 'contained'}
          color='primary'
          onClick={onClickButtonNew}
          disableElevation
          startIcon={<Icon>add</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {textButtonNew}
          </Typography>

        </Button>}

        {showButtonDelete && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonAddItem}
          disableElevation
          startIcon={<Icon>delete</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            apagar
          </Typography>

        </Button>}

        {showButtonAddItem && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonAddItem}
          disableElevation
          startIcon={<Icon>add</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            adicionar item
          </Typography>

        </Button>}

        {showButtonViewOrder && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonViewOrder}
          disableElevation
          startIcon={<Icon>view_list</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            visualizar pedido
          </Typography>

        </Button>}

        {showButtonManageAccount && <Button variant='contained'
          color='primary'
          onClick={onClickButtonManageAccount}
          disableElevation
          startIcon={<Icon>manage_accounts</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            editar conta
          </Typography>

        </Button>}
      </Box>
      <Box
        display='flex'
        gap={1}
        alignItems='center'
      >

        {showButtonExit && <Button variant='outlined'
          color='primary'
          onClick={onClickButtonExit}
          disableElevation
          startIcon={<Icon>logout</Icon>}>

          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            sair
          </Typography>

        </Button>}

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



    </Box>
  )
}
