const TEXT_SIZES = new Set([
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-5xl',
  'text-6xl',
  'text-7xl',
  'text-8xl',
  'text-9xl'
])

const TEXT_ALIGN = new Set(['text-left', 'text-center', 'text-right', 'text-justify'])

function splitVariants(token) {
  const parts = token.split(':')
  if (parts.length === 1) return { variants: '', utility: token }
  const utility = parts[parts.length - 1]
  const variants = parts.slice(0, -1).join(':') + ':'
  return { variants, utility }
}

function conflictKeyForUtility(utility) {
  if (utility.startsWith('px-')) return 'px'
  if (utility.startsWith('py-')) return 'py'
  if (utility.startsWith('pt-')) return 'pt'
  if (utility.startsWith('pb-')) return 'pb'
  if (utility.startsWith('pl-')) return 'pl'
  if (utility.startsWith('pr-')) return 'pr'
  if (utility.startsWith('p-')) return 'p'

  if (utility.startsWith('mx-')) return 'mx'
  if (utility.startsWith('my-')) return 'my'
  if (utility.startsWith('mt-')) return 'mt'
  if (utility.startsWith('mb-')) return 'mb'
  if (utility.startsWith('ml-')) return 'ml'
  if (utility.startsWith('mr-')) return 'mr'
  if (utility.startsWith('m-')) return 'm'

  if (utility === 'rounded' || utility.startsWith('rounded-')) return 'rounded'
  if (utility.startsWith('tracking-')) return 'tracking'
  if (utility.startsWith('gap-')) return 'gap'
  if (utility.startsWith('duration-')) return 'duration'
  if (utility.startsWith('ease-')) return 'ease'

  if (TEXT_SIZES.has(utility)) return 'text-size'
  if (TEXT_ALIGN.has(utility)) return 'text-align'
  if (utility.startsWith('text-')) return 'text-color'

  if (utility === 'border') return 'border-width'
  if (/^border-(0|2|4|8)$/.test(utility)) return 'border-width'
  if (/^border-(t|b|l|r|x|y)(-(0|2|4|8))?$/.test(utility)) return utility.split('-').slice(0, 2).join('-')
  if (utility.startsWith('border-') && !/^border-(solid|dashed|dotted|double|none)$/.test(utility)) return 'border-color'

  if (utility === 'shadow') return 'shadow-size'
  if (/^shadow-(none|sm|md|lg|xl|2xl|inner)$/.test(utility)) return 'shadow-size'
  if (utility.startsWith('shadow-[')) return 'shadow-size'
  if (utility.startsWith('shadow-')) return 'shadow-color'

  if (utility === 'ring') return 'ring-width'
  if (/^ring-(0|1|2|4|8)$/.test(utility)) return 'ring-width'
  if (utility === 'ring-inset') return 'ring-inset'
  if (utility.startsWith('ring-')) return 'ring-color'
  if (utility.startsWith('backdrop-blur')) return 'backdrop-blur'

  if (utility.startsWith('bg-gradient')) return 'bg-gradient'
  if (utility.startsWith('bg-')) return 'bg-color'
  if (utility.startsWith('from-')) return 'gradient-from'
  if (utility.startsWith('via-')) return 'gradient-via'
  if (utility.startsWith('to-')) return 'gradient-to'

  return null
}

/**
 * Minimal Tailwind class merge helper.
 * Tailwind itself does not guarantee "last class wins" when multiple conflicting utilities are present.
 * This function removes common conflicts so consumer overrides behave predictably.
 */
export function mergeClasses(...parts) {
  const tokens = parts
    .filter(Boolean)
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  const result = []
  const keyToIndex = new Map()

  for (const token of tokens) {
    const { variants, utility } = splitVariants(token)
    const utilityKey = conflictKeyForUtility(utility)
    const key = utilityKey ? variants + utilityKey : null

    if (!key) {
      result.push(token)
      continue
    }

    const existingIndex = keyToIndex.get(key)
    if (existingIndex === undefined) {
      keyToIndex.set(key, result.length)
      result.push(token)
      continue
    }

    result[existingIndex] = token
  }

  return result.join(' ')
}
