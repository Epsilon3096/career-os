'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight,
  BadgeDollarSign,
  Check,
  CircleCheck,
  CirclePlus,
  Compass,
  FolderOpen,
  Info,
  Lightbulb,
  MessageCircleQuestion,
  Scale,
  Send,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SignalBadge } from '@/components/career/signal-badge'
import { ProgressBar } from '@/components/career/progress'
import { ChatBubble, TypingIndicator } from '@/components/career/haven'
import {
  chatReplies,
  fallbackReply,
  havenResponses,
  matchQuestion,
  memoryCards,
  planWeeks,
  previewScript,
  principles,
} from '@/components/haven/haven-data'
import { SectionHeader } from '@/components/sections/section-header'
import { cn } from '@/lib/utils'
import { usePersistentState } from '@/lib/use-persistent-state'
import type { SectionId } from '@/components/shell/nav-config'

/* ------------------------------------------------------------------ */
/* Animated chat preview                                               */
/* ------------------------------------------------------------------ */

function ChatPreview() {
  // visibleCount = number of fully shown messages; typing = Haven is "typing"
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    if (visibleCount >= previewScript.length) return

    const next = previewScript[visibleCount]
    let typingTimer: ReturnType<typeof setTimeout> | undefined
    let showTimer: ReturnType<typeof setTimeout> | undefined

    if (next.role === 'haven') {
      // show typing indicator first, then the reply
      typingTimer = setTimeout(() => setTyping(true), 500)
      showTimer = setTimeout(() => {
        setTyping(false)
        setVisibleCount((c) => c + 1)
      }, 2000)
    } else {
      showTimer = setTimeout(
        () => setVisibleCount((c) => c + 1),
        visibleCount === 0 ? 700 : 1300,
      )
    }

    return () => {
      if (typingTimer) clearTimeout(typingTimer)
      if (showTimer) clearTimeout(showTimer)
    }
  }, [visibleCount])

  return (
    <Card className="gap-4 p-5 sm:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Sparkles className="size-3.5" />
          </span>
          <span className="text-sm font-semibold">Haven</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" />
          Live preview
        </span>
      </div>

      <div
        className="flex min-h-64 flex-col justify-end gap-3"
        aria-live="polite"
      >
        {previewScript.slice(0, visibleCount).map((m, i) => (
          <div
            key={i}
            className={cn(
              'duration-400 animate-in',
              m.role === 'user'
                ? 'fade-in slide-in-from-right-4'
                : 'fade-in slide-in-from-bottom-2',
            )}
          >
            <ChatBubble role={m.role}>{m.text}</ChatBubble>
          </div>
        ))}
        {typing ? (
          <div className="animate-in fade-in duration-300">
            <TypingIndicator />
          </div>
        ) : null}
      </div>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Ask Haven console                                                   */
/* ------------------------------------------------------------------ */

function ResponsePanel({
  responseId,
  onNavigate,
}: {
  responseId: string
  onNavigate?: (id: SectionId) => void
}) {
  const response = useMemo(
    () => havenResponses.find((r) => r.id === responseId) ?? havenResponses[0],
    [responseId],
  )
  // brief "thinking" state when switching questions
  const [thinking, setThinking] = useState(false)

  useEffect(() => {
    setThinking(true)
    const t = setTimeout(() => setThinking(false), 600)
    return () => clearTimeout(t)
  }, [responseId])

  if (thinking) {
    return (
      <Card className="min-h-96 justify-center gap-4 p-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <TypingIndicator />
          <p className="text-xs text-muted-foreground">
            Haven is reading your Compass paths, portfolio proof, and market
            signals…
          </p>
        </div>
      </Card>
    )
  }

  const confidenceTone =
    response.confidence === 'High'
      ? 'success'
      : response.confidence === 'Medium'
        ? 'warning'
        : 'risk'

  return (
    <Card
      key={response.id}
      className="animate-in fade-in slide-in-from-bottom-2 gap-5 p-5 duration-300 sm:p-6"
    >
      {/* Question echo */}
      <div className="flex items-start gap-2">
        <MessageCircleQuestion className="mt-0.5 size-4 shrink-0 text-primary" />
        <p className="text-sm font-semibold text-balance">
          {response.question}
        </p>
      </div>

      {/* Summary */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
        <p className="text-sm leading-relaxed">{response.summary}</p>
      </div>

      {/* You already have / Worth adding */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-success uppercase">
            <CircleCheck className="size-3.5" />
            You already have
          </p>
          <ul className="flex flex-col gap-1.5">
            {response.alreadyHave.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-warning-foreground uppercase dark:text-warning">
            <CirclePlus className="size-3.5" />
            Worth adding
          </p>
          <ul className="flex flex-col gap-1.5">
            {response.worthAdding.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CirclePlus className="mt-0.5 size-3.5 shrink-0 text-warning-foreground dark:text-warning" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Uncertainty */}
      <div className="flex items-start gap-2.5 rounded-xl border border-border bg-surface p-4">
        <Info className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        <div className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Uncertainty
            </p>
            <SignalBadge tone={confidenceTone}>
              Confidence: {response.confidence}
            </SignalBadge>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {response.uncertainty}
          </p>
        </div>
      </div>

      {/* Next action */}
      <div className="flex items-start gap-2.5 rounded-xl border border-success/25 bg-success-muted/40 p-4">
        <Lightbulb className="mt-0.5 size-4 shrink-0 text-success" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold tracking-wide text-success uppercase">
            Next action
          </p>
          <p className="text-sm leading-relaxed">{response.nextAction}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2 border-t border-border pt-4">
        {response.actions.map((action, i) => (
          <Button
            key={action.label}
            variant={i === 0 ? 'default' : 'outline'}
            size="sm"
            onClick={() => onNavigate?.(action.target)}
          >
            {action.label}
            <ArrowRight data-icon="inline-end" />
          </Button>
        ))}
      </div>
    </Card>
  )
}

interface ChatMessage {
  role: 'haven' | 'user'
  text: string
}

const CHAT_GREETING: ChatMessage = {
  role: 'haven',
  text: 'Hi Aisyah. Ask me anything about your paths, portfolio, or matched roles — I answer from your Career OS context, not from thin air.',
}

function AskHavenConsole({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  const [activeId, setActiveId] = useState(havenResponses[0].id)
  const [messages, setMessages] = useState<ChatMessage[]>([CHAT_GREETING])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Auto-scroll to the latest message / typing indicator
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, typing])

  // Clear pending timers on unmount
  useEffect(() => {
    return () => timersRef.current.forEach(clearTimeout)
  }, [])

  const ask = (question: string, responseId: string | null) => {
    if (typing) return
    setMessages((prev) => [...prev, { role: 'user', text: question }])
    setTyping(true)

    const reply = responseId
      ? (chatReplies[responseId] ?? fallbackReply)
      : fallbackReply

    timersRef.current.push(
      setTimeout(() => {
        setTyping(false)
        setMessages((prev) => [...prev, { role: 'haven', text: reply }])
        if (responseId) setActiveId(responseId)
      }, 850),
    )
  }

  const handleSubmit = () => {
    const question = input.trim()
    if (!question || typing) return
    setInput('')
    ask(question, matchQuestion(question))
  }

  return (
    <section aria-labelledby="ask-haven-heading" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id="ask-haven-heading" className="text-lg font-semibold">
          Ask Haven
        </h2>
        <p className="text-sm text-muted-foreground">
          Pick a question or type your own. Every answer is grounded in your
          current Career OS context — and honest about what is uncertain. Responses are
          simulated for this demo.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        {/* Suggested questions */}
        <div
          aria-label="Suggested questions"
          className="flex flex-col gap-2"
        >
          <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            Suggested questions
          </p>
          {havenResponses.map((r) => {
            const active = r.id === activeId
            return (
              <button
                key={r.id}
                aria-pressed={active}
                disabled={typing}
                onClick={() => ask(r.question, r.id)}
                className={cn(
                  'rounded-xl border px-3.5 py-2.5 text-left text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-60',
                  active
                    ? 'border-primary/40 bg-primary/10 font-medium text-foreground'
                    : 'border-border bg-surface text-muted-foreground hover:border-primary/30 hover:text-foreground',
                )}
              >
                {r.question}
              </button>
            )
          })}
        </div>

        {/* Chat console + structured response */}
        <div className="flex flex-col gap-4">
          <Card className="gap-0 overflow-hidden p-0">
            {/* Console header */}
            <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Sparkles className="size-3.5" />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold leading-tight">
                    Haven
                  </span>
                  <span className="text-[0.7rem] text-muted-foreground">
                    Career companion · simulated
                  </span>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success" />
                Context loaded
              </span>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              aria-live="polite"
              className="flex h-80 flex-col gap-3 overflow-y-auto scroll-smooth bg-background/60 p-4 sm:p-5"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn(
                    'duration-300 animate-in',
                    m.role === 'user'
                      ? 'fade-in slide-in-from-right-4'
                      : 'fade-in slide-in-from-bottom-2',
                  )}
                >
                  <ChatBubble role={m.role}>{m.text}</ChatBubble>
                </div>
              ))}
              {typing ? (
                <div className="animate-in fade-in duration-200">
                  <TypingIndicator />
                </div>
              ) : null}
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 border-t border-border bg-surface p-3 sm:px-4">
              <label htmlFor="haven-input" className="sr-only">
                Ask Haven a question
              </label>
              <input
                id="haven-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === 'Enter' &&
                    !e.nativeEvent.isComposing &&
                    e.keyCode !== 229
                  )
                    handleSubmit()
                }}
                placeholder="Ask Haven about your paths, portfolio, or roles…"
                className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              />
              <Button
                size="sm"
                className="h-10 shrink-0"
                onClick={handleSubmit}
                disabled={!input.trim() || typing}
                aria-label="Send question"
              >
                <Send className="size-4" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
          </Card>

          {/* Structured response panel */}
          <ResponsePanel responseId={activeId} onNavigate={onNavigate} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Memory map                                                          */
/* ------------------------------------------------------------------ */

const memoryIcons = [Compass, FolderOpen, Sparkles, TrendingUp]

function MemoryMap({ onNavigate }: { onNavigate?: (id: SectionId) => void }) {
  return (
    <section aria-labelledby="memory-heading" className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <h2 id="memory-heading" className="text-lg font-semibold">
          What Haven is using
        </h2>
        <p className="text-sm text-muted-foreground">
          Haven is not a standalone chatbot. It reads your whole Career OS
          context before answering.
        </p>
      </div>

      <div className="relative">
        {/* connecting line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 right-8 left-8 hidden h-px bg-border lg:block"
        />
        <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {memoryCards.map((card, i) => {
            const Icon = memoryIcons[i] ?? Sparkles
            return (
              <button
                key={card.title}
                onClick={() => onNavigate?.(card.target)}
                className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-left transition-colors hover:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </span>
                <p className="text-sm font-semibold">{card.title}</p>
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground tabular-nums">
                    {card.stat}
                  </span>{' '}
                  {card.detail}
                </p>
                <span className="mt-auto flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  Open
                  <ArrowRight className="size-3" />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Action plan builder                                                 */
/* ------------------------------------------------------------------ */

function ActionPlan() {
  const [doneIds, setDoneIds] = usePersistentState<string[]>(
    'career-os.haven-plan.v1',
    [],
  )
  const completed = doneIds.length

  return (
    <section aria-labelledby="plan-heading" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 id="plan-heading" className="text-lg font-semibold">
            Next 30 days
          </h2>
          <p className="text-sm text-muted-foreground">
            Haven&apos;s recommended plan based on your goals, current proof, and
            active paths.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Plan progress:{' '}
            <span className="font-semibold text-foreground tabular-nums">
              {completed}/{planWeeks.length}
            </span>
          </span>
          <ProgressBar
            value={(completed / planWeeks.length) * 100}
            tone={completed === planWeeks.length ? 'success' : 'primary'}
            className="w-28"
          />
        </div>
      </div>

      <Card className="gap-0 divide-y divide-border p-0">
        {planWeeks.map((w) => {
          const checked = doneIds.includes(w.week)
          return (
            <label
              key={w.week}
              className="flex cursor-pointer items-start gap-3.5 p-4 transition-colors hover:bg-surface sm:px-6"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  setDoneIds((current) =>
                    checked
                      ? current.filter((id) => id !== w.week)
                      : [...current, w.week],
                  )
                }
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className={cn(
                  'mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50',
                  checked
                    ? 'border-success bg-success text-success-foreground'
                    : 'border-border bg-surface',
                )}
              >
                {checked ? <Check className="size-3.5" /> : null}
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold tracking-wide text-primary uppercase">
                  {w.week}
                </span>
                <span
                  className={cn(
                    'text-sm leading-relaxed',
                    checked && 'text-muted-foreground line-through',
                  )}
                >
                  {w.task}
                </span>
              </span>
            </label>
          )
        })}
      </Card>

      {completed === planWeeks.length ? (
        <div className="animate-in fade-in slide-in-from-bottom-1 flex items-center gap-2 rounded-xl border border-success/25 bg-success-muted/40 p-3.5 text-sm duration-300">
          <CircleCheck className="size-4 shrink-0 text-success" />
          Plan complete. Haven will suggest the next 30-day cycle based on your
          updated portfolio.
        </div>
      ) : null}
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Fair pay insight                                                    */
/* ------------------------------------------------------------------ */

function FairPayCard({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  return (
    <Card className="gap-4 p-5 sm:p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-lg bg-warning-muted/70 text-warning-foreground dark:text-warning">
          <BadgeDollarSign className="size-4" />
        </span>
        <h3 className="text-base font-semibold">Am I underpaid?</h3>
      </div>

      <p className="text-sm leading-relaxed text-muted-foreground">
        Based on similar junior backend-leaning profiles in KL, your current
        target range should be compared against RM 5.5k–8k entry-to-junior
        bands. Haven would recommend negotiation only after you strengthen
        deployment proof.
      </p>

      <div className="flex flex-wrap gap-2">
        <SignalBadge tone="warning">Market confidence: Medium</SignalBadge>
        <SignalBadge tone="neutral">
          Salary signal: Needs role context
        </SignalBadge>
        <SignalBadge tone="primary">
          Action: Compare roles in Discover
        </SignalBadge>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => onNavigate?.('discover')}
      >
        View salary-linked roles
        <ArrowRight data-icon="inline-end" />
      </Button>
    </Card>
  )
}

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export function HavenSection({
  onNavigate,
}: {
  onNavigate?: (id: SectionId) => void
}) {
  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-6">
        <SectionHeader
          title="Haven"
          subtitle="An AI career guide that explains your map, trade-offs, and next actions."
        />
        <div className="flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <Scale className="mt-0.5 size-4 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-muted-foreground">
            Haven uses your Compass paths, portfolio proof, saved roles, and
            market signals to explain trade-offs and suggest next actions.
          </p>
        </div>
      </div>

      {/* Overview header */}
      <section
        aria-label="Haven overview"
        className="grid items-center gap-8 lg:grid-cols-2"
      >
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-semibold text-balance sm:text-3xl">
            Career guidance grounded in your whole story.
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Haven explains why a path appears, what is uncertain, what proof is
            missing, and what action would improve your options.
          </p>
          <div className="flex flex-wrap gap-2">
            <SignalBadge tone="primary">Compass-aware</SignalBadge>
            <SignalBadge tone="primary">Portfolio-aware</SignalBadge>
            <SignalBadge tone="primary">Marketplace-aware</SignalBadge>
            <SignalBadge tone="warning">Uncertainty-aware</SignalBadge>
          </div>
        </div>
        <ChatPreview />
      </section>

      {/* Ask Haven console */}
      <AskHavenConsole onNavigate={onNavigate} />

      {/* Memory map */}
      <MemoryMap onNavigate={onNavigate} />

      {/* Plan + fair pay */}
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <ActionPlan />
        <FairPayCard onNavigate={onNavigate} />
      </div>

      {/* Principles */}
      <section
        aria-labelledby="principles-heading"
        className="flex flex-col gap-5 border-t border-border pt-8"
      >
        <h2 id="principles-heading" className="text-lg font-semibold">
          How Haven explains
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {principles.map((p) => (
            <Card key={p.title} className="gap-2 p-5">
              <p className="text-sm font-semibold">{p.title}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
