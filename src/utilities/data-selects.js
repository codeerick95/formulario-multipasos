const itemsTypePayment = [
    {
        value: 'deposito',
        text: 'Depósito a cuenta BCP'
    },
    {
        value: 'transferencia',
        text: 'Tranferencia bancaria'
    },
    {
        value: 'presencial',
        text: 'Pago presencial con tarjeta'
    },
    {
        value: 'online',
        text: 'Pago online (Payu, Visanet)',
    },
    {
        value: 'efectivo',
        text: 'Efectivo'
    },
]

const itemsStatus = [
    {value: null, text: 'Estado'},
    {value: 'Pendiente', text: 'Pendiente'},
    {value: 'Revisando', text: 'Revisando'},
    {value: 'Validado', text: 'Validado'},
    {value: 'Rechazado', text: 'Rechazado'}
]

const itemsTypeDocument = [
    {value: null, text: 'Tipo de documento'},
    {value: 'DNI', text: 'DNI'},
    {value: 'PASAPORTE', text: 'PASAPORTE'},
    {value: 'CE', text: 'C.E.'}
]

export {itemsTypePayment, itemsStatus, itemsTypeDocument}