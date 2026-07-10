'use client'

import { useEffect, useState } from 'react'

export function useAnimatedPresence(open: boolean, duration = 300) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(open)

  useEffect(() => {
    let frame = 0
    let timer = 0

    if (open) {
      setMounted(true)
      frame = window.requestAnimationFrame(() => setVisible(true))
    } else {
      setVisible(false)
      timer = window.setTimeout(() => setMounted(false), duration)
    }

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      if (timer) window.clearTimeout(timer)
    }
  }, [duration, open])

  return { mounted, visible }
}
