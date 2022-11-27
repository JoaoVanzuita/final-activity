import { Box, Button, Divider, Icon, Paper, Typography, useMediaQuery, useTheme } from "@mui/material"

interface IToolbarMenuProps {

  onClickButtonManageAccount?: () => void
  onClickButtonDelete?: () => void
  onClickButtonSave?: () => void
  onClickButtonExit?: () => void
}

export const ToolbarMenu: React.FC<IToolbarMenuProps> = ({
  onClickButtonManageAccount,
  onClickButtonExit,
  onClickButtonDelete,
  onClickButtonSave
}) => {
  const theme = useTheme()


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

      <Button variant='contained'
        color='primary'
        onClick={onClickButtonSave}
        disableElevation
        startIcon={<Icon>save</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          editar conta
        </Typography>

      </Button>

      <Divider variant='middle' orientation='vertical'/>

      <Button variant='outlined'
        color='primary'
        onClick={onClickButtonExit}
        disableElevation
        startIcon={<Icon>logout</Icon>}>

        <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
          sair
        </Typography>

      </Button>

    </Box>
  )
}
