import * as d3 from 'd3'
import * as React from 'react'

interface IParams {
  url: string
  format: (d: any) => any
}

export const useData = async ({ url, format }: IParams) => {
  const [data, setData] = React.useState<any[]>()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<any>(null)

  React.useEffect(() => {
    setIsLoading(true)
    d3.csv(url)
      .then((data) => data.map((d) => format(d)))
      .then((data) => {
        setData(data)
      })
      .catch((e) => {
        setError(e)
      })
      .then(() => setIsLoading(false))
  }, [format, url])

  return { data, isLoading, error }
}
