export const apiUrl = "http://192.168.50.16:1337";

export const urlConfig = {
  rock: {
    info: (id: string) => `${apiUrl}/api/rocks?filters[uuid][$eq]=${id}&populate=deep`
  }
}