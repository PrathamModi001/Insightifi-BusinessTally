import React, { useEffect, useState, forwardRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CloseIcon from '@mui/icons-material/Close'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

const CustomInput = forwardRef(({ value, onClick, onClear, placeholder }, ref) => (
  <div className='custom-date-picker-input' style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
    <input
      ref={ref}
      value={value}
      onClick={onClick}
      readOnly
      placeholder={placeholder}
      style={{ padding: '8px', fontSize: '16px', width: 'auto' }}
    />
    {value && (
      <CloseIcon
        onClick={onClear}
        style={{ cursor: 'pointer', position: 'absolute', left: '180px', top: '50%', transform: 'translateY(-50%)' }}
      />
    )}
  </div>
))

const DatePickerComponent = ({ formikData, name }) => {
  const [selectedDate, setSelectedDate] = useState(null)

  const inputRef = React.createRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style = 'padding: 8px; font-size: 16px;'
    }
  }, [])

  const handleClear = () => {
    setSelectedDate(null)
    formikData.setFieldValue(name, '')
  }

  const handleChange = date => {
    setSelectedDate(date)
    formikData.setFieldValue(name, date)
  }

  return (
    <DatePickerWrapper>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat='MMMM d, yyyy'
        placeholderText='Choose Date'
        calendarClassName='custom-calendar'
        popperPlacement='bottom-start'
        customInput={<CustomInput ref={inputRef} onClear={handleClear} placeholder='Choose Date' />}
      />
    </DatePickerWrapper>
  )
}

export default DatePickerComponent
