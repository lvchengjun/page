
export async function callApi(method, url, path, data) {
    const res = await fetch(`${url}/api${path}`, {
      method,
      headers: {
        // Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return res.json()
}
export async function callMethod(method, url, path, data) {
  const res = await fetch(`${url}/funya${path}`, {
    method,
    headers: {
      // Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return res.json()
}
export const domain = window.location.origin
export const dataToString = (data) => {
  const array = []
  let index = 0
  for (const item in data) {
    if (data[item] !== undefined) {
      array[index++] = [item, data[item]]
    }
  }
  return new URLSearchParams(array).toString()
}
  