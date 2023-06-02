import React, { useEffect, useState } from 'react'
import { Calendar } from 'primereact/calendar'
import styled from 'styled-components/macro'

const CalendarInput = (props) => {
  const { value, dateFormat, disabled } = props

  const [dates, setDates] = useState(new Date(value))

  return (
    <Container>
        <Calendar
          value={dates}
          onChange={(e) => setDates(e.value)}
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