import * as React from 'react'

export const Bar = () => {
  React.useEffect(() => {
    document.title = 'Bar Chat'
    return () => {
      document.title = 'D3'
    }
  }, [])
  return <div></div>
}
