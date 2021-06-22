import * as React from 'react'
import { select } from 'd3'

export const Face = () => {
  React.useEffect(() => {
    const svg = select('svg')
    const circle = svg.append('circle')
    //   attr, set up attribute for a svg
    circle.attr('r', 100).attr('cx', 200).attr('cy', 200)
  }, [])
  return <svg></svg>
}
