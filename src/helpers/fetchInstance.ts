export const getFetchRequest = async (uri: string) => (
    fetch(uri)
    .then(res => res.json())
    .then(res => res)
    .catch(err => err)
)
