import axios from "axios"

const googleHTTP = axios.create({
  baseURL: "https://www.googleapis.com"
})

export { googleHTTP }
