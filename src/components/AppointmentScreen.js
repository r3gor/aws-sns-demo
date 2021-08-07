import React from 'react'
import { useForm } from '../hooks/useForm';

export const AppointmentScreen = () => {

    const [formValues, handleInputChange, reset] = useForm({
        codigo: '',
        modalidad: '',
        enfermedad: '',
        email: '',
    });

    const { codigo, modalidad, enfermedad, email } = formValues;

    const handleSend = (e) => {
        e.preventDefault();
        console.log(formValues);
        reset();
    }

    return (
        <>
            <div className="container">
                <h1>Appointments</h1>
                <hr />

                <form onSubmit={handleSend}>
                    <div className="mb-3">
                        <label htmlFor="code" className="form-label">Código</label>
                        <input
                            onChange={handleInputChange}
                            value={codigo}
                            className="form-control"
                            name="codigo"
                            id="code"
                            placeholder="ABCD1234"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Dirección e-mail</label>
                        <input
                            onChange={handleInputChange}
                            value={email}
                            type="email"
                            className="form-control"
                            name='email'
                            id="email"
                            placeholder="name@gmail.com"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="modality" className="form-label">Modalidad</label>
                        <select
                            onChange={handleInputChange}
                            value={modalidad}
                            id='modality'
                            name='modalidad'
                            className="form-select"
                            aria-label="Default select example">
                            <option defaultValue>Open this select menu</option>
                            <option value="1">Virtual</option>
                            <option value="2">Presencial</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="disease" className="form-label">Enfermedad</label>
                        <select
                            onChange={handleInputChange}
                            value={enfermedad}
                            id='disease'
                            name='enfermedad'
                            className="form-select"
                            aria-label="Default select example">
                            <option defaultValue>Open this select menu</option>
                            <option value="1">Enfermedad 1</option>
                            <option value="2">Enfermedad 2</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary mb-3">Enviar</button>
                    </div>
                </form>

            </div>
        </>
    )
}
