import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar'
import styled from 'styled-components/macro'

const CalendarInput = (props) => {
  const { value, dateFormat, disabled, onInput, name } = props

  const [dates, setDates] = useState(new Date(value))

  const handleChangeValue = (e) => {
    setDates(e.value)
    onInput && onInput(e)
  }

  return (
    <Container>
        <Calendar
          value={dates}
          name={name}
          onChange={handleChangeValue}
          dateFormat={dateFormat}
          disabled={disabled}
        />
    </Container>
  )
}

export default CalendarInput

const Container = styled.div`

.p-inputtext {
    font-size: 1.25rem!important;
}
`