import * as d3 from 'd3'
import * as React from 'react'
import { countries as countryList } from './data'
import { Wrapper } from './styles'

interface ICountry {
  name: string
  population: number
}

const conf: Record<string, number> = {
  width: 560,
  height: 560,
}

export const Population = () => {
  const [countries, setCountries] = React.useState<ICountry[]>(countryList)

  /**
   * Setting up chart using d3 APIs
   * xScale and yScale are driven by countries
   */
  const xScale = React.useMemo(() => {
    return d3
      .scaleLinear()
      .domain([
        0,
        d3.max(countries.map((c: ICountry) => c.population)) as number,
      ])
      .range([0, conf.width])
  }, [countries])
  const yScale = React.useMemo(() => {
    return d3
      .scaleBand()
      .domain(countries.map((c: ICountry) => c.name))
      .rangeRound([0, conf.height])
  }, [countries])

  const [germanyIsAdded, setGermanyIsAdded] = React.useState<boolean>(false)
  const handeClick = () => {
    if (germanyIsAdded) return false
    setCountries((countries) => [
      ...countries,
      { name: 'Germany', population: 0.8 },
    ])
    setGermanyIsAdded(true)
    return false
  }

  return (
    <Wrapper>
      <svg width={conf.width} height={conf.height}>
        {countries.map((c: ICountry) => (
          <rect
            key={c.name}
            x={0}
            y={yScale(c.name)}
            width={xScale(c.population)}
            height={yScale.bandwidth()}
            fill="blue"
          />
        ))}
      </svg>
      <button onClick={handeClick}>add germany</button>
    </Wrapper>
  )
}
