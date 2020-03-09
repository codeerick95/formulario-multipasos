const rules = {
    require: 'Este campo es requerido',
    requireRule: [
        v => !!v || rules.require
    ],
    email: [
        v => !!v || rules.require,
        v => /.+@.+/.test(v) || 'El email debe ser válido',
    ],
    typeDocumentFieldDni: [
        v => !!v || rules.require,
        v => v.length <= 8 || 'Máximo 8 caracteres'
    ],
    typeDocumentFieldPasaport: [
        v => !!v || rules.require,
        v => v.length <= 10 || 'Máximo 10 caracteres'
    ],
    typeDocumentFieldCe: [
        v => !!v || rules.require,
        v => v.length <= 8 || 'Máximo 8 caracteres'
    ]
}

export {rules}