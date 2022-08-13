

export const loadFile = (file: any) => {
    const formData = new FormData()
    formData.append('image', file)
    return formData
}