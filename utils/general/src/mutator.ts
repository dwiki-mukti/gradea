
export const setDigit = (number: string | number, digitLength: number) => ((Number(number)).toLocaleString('en-US', { minimumIntegerDigits: digitLength }))

export const formatRupiah = (nominal: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
    }).format(nominal);
}

// ################### date ###################
export const epoch10to13 = (epoch: number) => (Math.floor(epoch * 1000))
export const epoch13to10 = (epoch: number) => (Math.floor(epoch / 1000))



export const objectToQueryUrl = (params: Record<string, any>) => {
    let queryPharams: Array<any> = [];
    try {
        Object.keys(params).forEach((res) => {
            if (params[res]) {
                queryPharams.push(encodeURIComponent(res) + "=" + encodeURIComponent(params[res]));
            }
        })
    } catch (error) { }
    return queryPharams.join("&")
}