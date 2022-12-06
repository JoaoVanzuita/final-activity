import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'
import { useEffect, useState } from 'react'

type TVTextFieldProps = TextFieldProps & {
  name: string
}

export const VTextField:React.FC<TVTextFieldProps> = ({ name, ...rest}) => {

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
		<TextField
			{...rest}
			error={!!error}
			helperText={error}
			value={value}
			defaultValue={defaultValue}
			onChange={ev => {setValue(ev.target.value); rest.onChange?.(ev)}}
			onKeyDown={ev => {error && clearError(); rest.onKeyDown?.(ev)}}
		/>
	)
}
