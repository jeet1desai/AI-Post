export interface IPostFetchData {
  hits: Array<IPostFetchHitsData>
  page: number
  nbPages: number
}

export interface IPostFetchHitsData {
  created_at?: string
  title?: string
  url?: string
  author?: string
  objectID: string
}
