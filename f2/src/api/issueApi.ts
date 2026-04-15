import axiosInstance from "./axiosInstance"

export const getIssuesApi = async (params?: {
  page?:   number
  search?: string
  filter?: string
  sort?:   string
  status?: string
}) => {
  const res = await axiosInstance.get("/return", { params })
  return res.data
}

export const getIssueByIdApi = async (id: number) => {
  const res = await axiosInstance.get(`/return/${id}`)
  return res.data
}

export const returnBookApi = async (id: number) => {
  const res = await axiosInstance.put(`/return/${id}/returns`)
  return res.data
}

export const lendBookApi = async (data: { book_id: number; user_id: number }) => {
  const res = await axiosInstance.post("/return/lend", data)
  return res.data
}

export const deleteIssueApi = async (id: number) => {
  const res = await axiosInstance.delete(`/return/${id}`)
  return res.data
}

export const getMembersApi = async () => {
  const res = await axiosInstance.get("/users/members")
  return res.data
}
