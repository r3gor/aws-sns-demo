import React from 'react'
import { AppointmentItem } from './AppointmentItem'

export const MyAppointmentsScreen = () => {
    return (
        <>
            <div className="container">
                <h1>My Appointments</h1>
                <hr />

                <AppointmentItem />

            </div>
        </>
    )
}
