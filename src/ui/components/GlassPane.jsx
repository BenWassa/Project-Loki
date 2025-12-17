import React from 'react'
import { tw } from '../design-system/tokens.js'

const GlassPane = ({ children, className = '', intensity = 1 }) => {
  const intensityClasses = tw.glassPane.intensities[intensity] ?? tw.glassPane.intensities[1]

  return <div className={`${tw.glassPane.base} ${intensityClasses} ${className}`}>{children}</div>
}

export default GlassPane
