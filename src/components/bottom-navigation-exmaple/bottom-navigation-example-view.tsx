import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { Heart, BackupRestore, MapMarker } from 'mdi-material-ui'
import * as React from 'react'
import { css } from 'styled-components'

const BottomNavigationExampleView: React.FC = () => {
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      css={css`
        width: 100%;
      `}>
      <BottomNavigationAction label="Recents" icon={<BackupRestore />} />
      <BottomNavigationAction label="Favorites" icon={<Heart />} />
      <BottomNavigationAction label="Nearby" icon={<MapMarker />} />
    </BottomNavigation>
  )
}

export default BottomNavigationExampleView
