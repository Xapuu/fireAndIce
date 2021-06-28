import { Pagination } from "src/app/services/pagination"

export const generateDefaultPagination = (customPaginationData: Partial<Pagination> = {}): Pagination => {
  return {
    page: 1,
    pageSize: 20,
    ...customPaginationData
  }
}
