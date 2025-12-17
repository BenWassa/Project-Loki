import React from 'react'
import { motion } from 'framer-motion'
import { tw } from '../design-system/tokens.js'

const GemButton = ({ children, onClick, variant = 'indigo', className = '', disabled = false, ariaLabel }) => {
  const computedLabel = ariaLabel || (typeof children === 'string' ? children : undefined)
  const variantClasses = tw.gemButton.variants[variant] || tw.gemButton.variants.indigo

  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ y: disabled ? 0 : -2 }}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      aria-label={computedLabel}
      className={`${tw.gemButton.base} ${disabled ? tw.gemButton.disabled : tw.gemButton.enabled} ${variantClasses} ${className}`}
    >
      {children}
    </motion.button>
  )
}

export default GemButton
