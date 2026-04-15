import axiosInstance from "./axiosInstance"

export const getBooksApi = async (params?: {
  page?:     number
  search?:   string
  status?:   string
  sort?:     string
}) => {
  const res = await axiosInstance.get("/books", { params })
  return res.data
}

export const getBooksDropdownApi = async () => {
  const res = await axiosInstance.get("/books", { params: { dropdown: true } })
  return res.data
}
