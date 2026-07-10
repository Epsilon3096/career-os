import { Card } from '@/components/ui/card'
import { DsLabel, DsSection } from '@/components/design-system/ds-section'
import {
  AskHavenButton,
  ChatBubble,
  SuggestionChip,
  TypingIndicator,
} from '@/components/career/haven'

const suggestions = [
  'Why this path?',
  'What should I learn next?',
  'Am I underpaid?',
  'How do I improve readiness?',
]

export function HavenPreview() {
  return (
    <DsSection
      index="09"
      title="AI / Haven Components"
      description="Haven is the calm, grounded guide. It speaks in observations and next actions, never guarantees."
    >
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="gap-4">
          <DsLabel>Conversation</DsLabel>
          <div className="flex flex-col gap-3">
            <ChatBubble role="user">
              Why does backend engineering show as a strong fit?
            </ChatBubble>
            <ChatBubble role="haven">
              Observed from similar profiles: your projects overlap with 4 of 6
              core backend signals, and demand near you is rising. Confidence is
              medium — adding portfolio proof would strengthen it.
            </ChatBubble>
            <TypingIndicator />
          </div>
        </Card>

        <Card className="justify-between gap-4">
          <div className="flex flex-col gap-4">
            <DsLabel>Entry point &amp; prompts</DsLabel>
            <AskHavenButton className="w-fit" />
            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground">
                Suggested questions
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((q) => (
                  <SuggestionChip key={q}>{q}</SuggestionChip>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DsSection>
  )
}
