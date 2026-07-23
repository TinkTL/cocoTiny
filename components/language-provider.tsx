'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react'
import { translations, type Locale, type Translation } from '@/lib/translations'

const storageKey = 'cocotiny-language'
const changeEvent = 'cocotiny-language-change'

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback)
  window.addEventListener(changeEvent, callback)
  return () => {
    window.removeEventListener('storage', callback)
    window.removeEventListener(changeEvent, callback)
  }
}

function getSnapshot(): Locale {
  return window.localStorage.getItem(storageKey) === 'zh' ? 'zh' : 'en'
}

function getServerSnapshot(): Locale {
  return 'en'
}

type LanguageContextValue = {
  locale: Locale
  copy: Translation
  toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  useEffect(() => {
    document.documentElement.lang = locale === 'zh' ? 'zh-CN' : 'en'
  }, [locale])

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      copy: translations[locale],
      toggleLanguage: () => {
        const nextLocale = locale === 'en' ? 'zh' : 'en'
        window.localStorage.setItem(storageKey, nextLocale)
        window.dispatchEvent(new Event(changeEvent))
      },
    }),
    [locale],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider')
  return context
}
