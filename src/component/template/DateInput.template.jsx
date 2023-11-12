import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar'
import styled from 'styled-components/macro'

const CalendarInput = (props) => {
  const { value, dateFormat, disabled, onInput, name } = props

  const [dates, setDates] = useState(new Date(value))

  useEffect(() => {
    console.log("date Value", value)
    setDates(new Date(value))
  }, [value])

  const handleChangeValue = (e) => {
    setDates(e.target.value)

    const customName = "birthday"

    onInput && onInput(e, customName)
  }

  return (
    <Container>
        <Calendar
          value={dates}
          name={name}
          aria-describedby={name}
          onChange={(e) => handleChangeValue(e)}
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