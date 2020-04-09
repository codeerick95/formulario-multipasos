const rules = {
    require: 'Este campo es requerido',
    requireRule: [
        v => !!v || rules.require
    ],
    requireText: [
        v => !!v || rules.require,
        v => /\D/.test(v) ? true : false || 'El campo solo debe contener texto'
    ],
    email: [
        v => !!v || rules.require,
        v => /.+@.+/.test(v) || 'El email debe ser válido',
    ],
    typeDocumentFieldDni: [
        v => !!v || rules.require,
        v =>  /[0-9]/.test(v) || 'Ingrese un número válido',
        v => /\d+(?!\.)/.test(v) || 'El número no es válido para este campo',
        v =>  v > .9 || 'El número no es válido para este campo',
        v => v.length <= 8 || 'Debe ingresar 8 números válidos',
    ],
    typeDocumentFieldPasaport: [
        v => !!v || rules.require,
        v =>  /[0-9]/.test(v) || 'Ingrese un número válido',
        v =>  v > .9 || 'El número no es válido para este campo',
        v => v.length <= 10 || 'Debe ingresar 10 números válidos'
    ],
    typeDocumentFieldCe: [
        v => !!v || rules.require,
        v =>  /[0-9]/.test(v) || 'Ingrese un número válido',
        v =>  v > .9 || 'El número no es válido para este campo',
        v => v.length <= 8 || 'Debe ingresar 8 números válidos'
    ],
    phone: [
        v => !!v || rules.require,
        v =>  /[0-9]/.test(v) || 'Ingrese un número válido',
        v => /\d+(?!\.)/.test(v) || 'El número no es válido para este campo',
        v =>  v > .9 || 'El número no es válido para este campo'
    ],
    amount: [
        v => !!v || rules.require,
        v =>  /[0-9]/.test(v) || 'Ingrese un número válido',
        v => /\d+(?!\.)/.test(v) || 'El número no es válido para este campo',
        v =>  v > .9 || 'El número no es válido para este campo',
    ]
}

export {rules}