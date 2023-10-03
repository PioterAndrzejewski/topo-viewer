export const apiUrl = "http://192.168.50.223:1337";

export const urlConfig = {
  model: {
    info: (id: string) => `${apiUrl}/api/models/${id}?populate=*`
  }
}