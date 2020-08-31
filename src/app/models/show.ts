export interface Show {
  score: number,
  show: ShowDetails
}

export interface ShowDetails {
  id: number,
  name: string,
  url: string,
  type: string,
  language: string,
  genres: Array<string>,
  status: string,
  runtime: number,
  premiered: string,
  officialSite: string,
  schedule: any,
  rating: any,
  weight: number,
  network: any,
  webChannel: any,
  externals: any,
  image: any,
  summary: string
}