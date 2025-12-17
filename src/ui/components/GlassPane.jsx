import React from 'react'
import { tw } from '../design-system/tokens.js'
import { mergeClasses } from '../design-system/merge-classes.js'

const GlassPane = ({ children, className = '', intensity = 1 }) => {
  const intensityClasses = tw.glassPane.intensities[intensity] ?? tw.glassPane.intensities[1]

  return <div className={mergeClasses(tw.glassPane.base, intensityClasses, className)}>{children}</div>
}

export default GlassPane
