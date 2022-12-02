import { Select, SelectProps, } from "@mui/material"
import { useField } from "@unform/core"
import { useEffect, useState } from "react"

type VSelectProps = SelectProps & {
  name: string
}

export const VSelect:React.FC<VSelectProps> = ({ name, ...rest}) => {

  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)
  const [ value, setValue ] = useState(defaultValue || '')

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue)
    })
  }, [registerField, fieldName, value])

  return(
    <Select
      {...rest}
      error={!!error}
      value={value}
      defaultValue={defaultValue}
      onKeyDown={() => error ? clearError() : undefined}
      onChange={ev => setValue(ev.target.value)}
    />
  )
}
