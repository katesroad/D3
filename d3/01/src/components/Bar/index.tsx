import * as React from 'react'
import * as d3 from 'd3'
import { countries } from './data'

export const Bar = () => {
  React.useEffect(() => {
    const container = d3
      .select('svg')
      .classed('d3', true)
      .style('height', 140)
      .style('width', 140)
      .style('border', '1px solid green')
    //   give us back the same value
    const xScale = d3
      // https://observablehq.com/@d3/d3-scaleband
      .scaleBand()
      // x axies, the countries name
      .domain(countries.map((country) => country.name))
      // to give the rounded integer value
      .rangeRound([0, 140])
      .padding(0.4)
    //   translate a value
    const yScale = d3.scaleLinear().domain([0, 14]).rangeRound([0, 140])
    const bars = container
      .selectAll('rect')
      .data(countries)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('width', xScale.bandwidth())
      .attr('fill', 'red')
      .attr('height', (data) => yScale(data.population))
      .attr('width', xScale.bandwidth())
      .attr('y', (data) => 140 - yScale(data.population))
      .attr('x', (data) => {
        return xScale(data.name) as number
      })
      .text((data) => data.name)
  }, [])
  return (
    <div>
      <svg></svg>
    </div>
  )
}
