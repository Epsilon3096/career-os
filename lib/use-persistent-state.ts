'use client'

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const initialRef = useRef(initialValue)
  const [value, setValue] = useState<T>(initialRef.current)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key)
      if (stored) setValue(JSON.parse(stored) as T)
    } catch {
      // A private browser session can block storage; the demo still works in memory.
    } finally {
      setReady(true)
    }
  }, [key])

  const updateValue = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      setValue((current) => {
        const resolved =
          typeof next === 'function'
            ? (next as (previous: T) => T)(current)
            : next

        try {
          window.localStorage.setItem(key, JSON.stringify(resolved))
        } catch {
          // Keep the interaction functional even when storage is unavailable.
        }

        return resolved
      })
    },
    [key],
  )

  return [value, updateValue, ready]
}
