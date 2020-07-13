export default async (blob, filename) => {
    const elink = document.createElement('a')
    elink.download = filename || blob.name
    elink.style.display = 'none'
    if (blob.type === 'text/csv') {
        await new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = function () {
                elink.href = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURI(reader.result)
                resolve()
            }
            reader.readAsText(blob)
        })
    } else {
        elink.href = URL.createObjectURL(blob)
    }
    elink.target = '_blank'
    document.body.appendChild(elink)
    elink.click()
    document.body.removeChild(elink)
}
