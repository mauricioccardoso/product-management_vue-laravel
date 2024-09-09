import { defineStore } from 'pinia'

export const useFormatFunctionsStore = defineStore('formatFunctionsStore', () => {
  const formatCNPJ = (cnpj) => {
    cnpj.value = cnpj.value.replace(/\D/g, '')

    cnpj.value = cnpj.value.substring(0, 14)

    cnpj.value = cnpj.value.replace(/^(\d{2})(\d)/, '$1.$2')
    cnpj.value = cnpj.value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    cnpj.value = cnpj.value.replace(/\.(\d{3})(\d)/, '.$1/$2')
    cnpj.value = cnpj.value.replace(/(\d{4})(\d)/, '$1-$2')
  }

  const formatWhatsapp = (whatsNumber) => {
    whatsNumber.value = whatsNumber.value.replace(/\D/g, '')

    whatsNumber.value = whatsNumber.value.substring(0, 11)

    if (whatsNumber.value.length === 11) {
      whatsNumber.value = whatsNumber.value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    } else if (whatsNumber.value.length === 10) {
      whatsNumber.value = whatsNumber.value.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
    } else if (whatsNumber.value.length === 9) {
      whatsNumber.value = whatsNumber.value.replace(/^(\d{5})(\d{4})$/, '$1-$2')
    }
  }

  const formatCoordenate = (coordinate) => {
    coordinate.value = coordinate.value.replace(/[^-.\d]/g, '')

    if (coordinate.value.length > 12) {
      coordinate.value = coordinate.value.substring(0, 12)
    }

    const valor = parseFloat(coordinate.value)
    if (!isNaN(valor) && valor < -90) {
      coordinate.value = '-90'
    } else if (!isNaN(valor) && valor > 90) {
      coordinate.value = '90'
    }

    const partes = coordinate.value.split('.')
    if (partes.length > 1 && partes[1].length > 8) {
      partes[1] = partes[1].substring(0, 8)
      coordinate.value = partes.join('.')
    }
  }

  const getCNPJNumbers = (value) => {
    return value.replace(/[^\d]/g, '')
  }

  const getWhatsNumbers = (value) => {
    if (value === '') {
      return
    }
    return value.match(/\d+/g).join('')
  }

  return { formatCNPJ, formatWhatsapp, formatCoordenate, getCNPJNumbers, getWhatsNumbers }
})
