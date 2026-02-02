import React, { useEffect, useState } from 'react'

const DecryptedText = ({ text, speed = 30, className = '' }) => {
  const [displayText, setDisplayText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&'

  useEffect(() => {
    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((letter, index) => {
            if (index < iteration) return text[index]
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )
      if (iteration >= text.length) clearInterval(interval)
      iteration += 1 / 3
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return <span className={className}>{displayText}</span>
}

export default DecryptedText
