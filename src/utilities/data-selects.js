// Este archivo solo exporta objetos estáticos que no vienen en la Api pero son necesarios para el registro

import countries from '@/assets/countries.json'
import coursesPresenciales from '@/assets/courses.json'
import coursesOnline from '@/assets/courses-online.json'


const itemsPayment = [
    { value: null, text: 'Pago' },
    { value: 1, text: 'TOTAL' },
    { value: 2, text: 'CUOTAS' }
]

const itemsTypePayment = [
    {
        value: 1,
        text: 'Depósito a cuenta BCP'
    },
    {
        value: 2,
        text: 'Tranferencia bancaria'
    },
    {
        value: 3,
        text: 'Pago presencial con tarjeta'
    },
    {
        value: 4,
        text: 'Pago online (Payu, Visanet)',
    },
    {
        value: 5,
        text: 'Efectivo'
    },
]

const itemsStatus = [
    { value: null, text: 'Estado' },
    { value: '0', text: 'Registrado' },
    { value: '1', text: 'Aprobado' },
    { value: '2', text: 'Corregir' },
]

// Esta función solo funciona con el usuario ya que la Api no envía datos correctamente
const itemsTypeDocument = [
    { value: null, text: 'Tipo de documento' },
    { value: 1, text: 'DNI' },
    { value: 2, text: 'PASAPORTE' },
    { value: 3, text: 'C.E.' }
]

const itemsTypeCourse = [
    { value: null, text: 'Tipo de curso' },
    { value: 1, text: 'Virtual' },
    { value: 2, text: 'Presencial' }
]

const itemsCoin = [
    { value: null, text: 'Moneda' },
    { value: 'Soles', text: 'Soles' },
    { value: 'Dólares', text: 'Dólares' }
]

const getCountries = () => {
    let newCountries = []

    countries.forEach(country => {
        // Agregamos nuevos valores para que sean reconocidos por el v-select
        country.value = country.nombre
        country.text = country.nombre

        newCountries.push(country)
    })

    return newCountries
}

const getCoursesPresenciales = () => {
    let newCourses = []

    coursesPresenciales.forEach(course => {

        // Agregamos nuevos valores para que sean reconocidos por el v-select
        course.value = course.descripcion
        course.text = course.descripcion

        newCourses.push(course)
    })
    return newCourses
}

const getCoursesOnline = () => {
    let newCourses = []

    coursesOnline.forEach(course => {
        // Agregamos nuevos valores para que sean reconocidos por el v-select
        course.value = course.descripcion
        course.text = course.descripcion

        newCourses.push(course)
    })
    return newCourses
}

export { itemsPayment, itemsTypePayment, itemsStatus, itemsTypeDocument, itemsTypeCourse, itemsCoin, getCountries, getCoursesPresenciales, getCoursesOnline}