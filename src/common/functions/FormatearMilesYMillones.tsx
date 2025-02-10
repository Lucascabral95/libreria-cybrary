export const formatNumeroPorMilesYMillones = (numero: number | undefined | null) => {
    if (!numero) {
        return '0'
    }
    if (numero >= 1000000) {
        return (numero / 1000000).toFixed(2) + 'M'
    } else if (numero >= 1000) {
        return (numero / 1000).toFixed(2) + 'K'
    } else {
        return numero.toString()
    }
}