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
  height: 260,
  xMargin: 40,
  yMargin: 20,
}

const innerHeight = conf.height - conf.yMargin
const innerWidth = conf.width - conf.xMargin

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
        (d3.max(countries.map((c: ICountry) => c.population)) as number) + 6,
      ])
      .range([0, innerWidth])
  }, [countries])

  /**
   * ticks in d3
   * Doc: https://observablehq.com/@d3/axis-ticks
   * index.tsx:42 (15) [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
   */
  console.log(xScale.ticks())

  const yScale = React.useMemo(() => {
    return d3
      .scaleBand()
      .domain(countries.map((c: ICountry) => c.name))
      .rangeRound([0, innerHeight])
      .paddingInner(0.1)
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
      <svg width={innerWidth} height={innerHeight}>
        <g transform={`translate(${conf.xMargin}, ${conf.yMargin})`}>
          {xScale.ticks().map((v) => (
            <g transform={`translate(${xScale(v)}, ${-4})`} className="tick">
              <text y={0} style={{ textAnchor: 'middle', fontSize: 12 }}>
                {v * 1000}
              </text>
            </g>
          ))}
          {yScale.domain().map((tickValue) => {
            const translateY =
              (yScale(tickValue) as number) + 0.5 * yScale.bandwidth()
            return (
              <g transform={`translate(-4,  ${translateY})`}>
                <text style={{ textAnchor: 'end', fontSize: 12 }}>
                  {tickValue}
                </text>
              </g>
            )
          })}
          <g>
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
          </g>
        </g>
      </svg>
      <button onClick={handeClick}>add germany</button>
    </Wrapper>
  )
}
