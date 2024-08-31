import { PrimaryCard, SecondaryCard } from '@/components/cards-templates/index.ts'
import { CardTemplateMap } from '@/components/cards-templates/types.ts'

export const cardTemplatesMapping: CardTemplateMap = {
  '1': {
    Component: PrimaryCard,
    label: 'Т1',
  },
  '2': {
    Component: SecondaryCard,
    label: 'Бизнес',
  },
}
