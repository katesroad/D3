import * as React from 'react'
import * as d3 from 'd3'
import { countries as countryList } from './data'
import { Wrapper } from './styles'

interface ICountry {
  name: string
  population: number
}

export const Bar = () => {
  const [countries, setCountries] = React.useState<ICountry[]>(countryList)
  const [germanyIsAdded, setGermanyIsAdded] = React.useState<boolean>(false)
  const handleClick = () => {
    if (germanyIsAdded) return false
    setCountries((coutnries) => [
      ...coutnries,
      { name: 'Germany', population: 1 },
    ])
    setGermanyIsAdded(true)
    return false
  }
  const xScale = React.useMemo(() => {
    return (
      d3
        // https://observablehq.com/@d3/d3-scaleband
        .scaleBand()
        // x axis, the countries name
        .domain(countries.map((country) => country.name))
        // to give the rounded integer value
        .rangeRound([0, 140])
        .padding(0.4)
    )
  }, [countries])
  const yScale = React.useMemo(
    () => d3.scaleLinear().domain([0, 14]).rangeRound([0, 140]),
    []
  )
  React.useEffect(() => {
    const container = d3
      .select('svg')
      .classed('d3', true)
      .style('height', 140)
      .style('width', 140)
      .style('border', '1px solid green')
    //   give us back the same value
    //   translate a value
    container
      .selectAll('rect')
      .data(countries)
      .enter()
      .append('rect')
      .classed('bar', true)
      .classed('added', germanyIsAdded)
      .attr('width', xScale.bandwidth())
      .attr('fill', 'red')
      .attr('height', (data) => yScale(data.population))
      .attr('width', xScale.bandwidth())
      .attr('y', (data) => 140 - yScale(data.population))
      .attr('x', (data) => xScale(data.name) as number)
      .text((data) => data.name)
  }, [countries, germanyIsAdded, xScale, yScale])

  return (
    <Wrapper>
      <svg></svg>
      <button onClick={handleClick}>add country</button>
    </Wrapper>
  )
}
