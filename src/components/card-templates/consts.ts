import { PrimaryCard, SecondaryCard } from '@/components/card-templates/index.ts'
import { CardTemplateMap } from '@/components/card-templates/types.ts'

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
