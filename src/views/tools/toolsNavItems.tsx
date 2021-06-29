import { TimeIcon } from '@chakra-ui/icons';
import { ReactElement } from 'react';
import { EuroIcon } from 'src/theme/icons/EuroIcon';
import { PercentIcon } from 'src/theme/icons/PercentIcon';
import { SuitcaseIcon } from 'src/theme/icons/SuitcaseIcon';

interface ToolsNavItem {
  href: string;
  label: string;
  leftIcon: ReactElement;
}

export const TOOLS_NAV_ITEMS: Array<ToolsNavItem> = [
  {
    href: '/tools/zeiterfassung',
    label: 'Zeiterfassung',
    leftIcon: <TimeIcon w="1rem" h="1rem" />,
  },
  {
    href: '/tools/grundsteuerplanung',
    label: 'Grundsteuerplanung',
    leftIcon: <SuitcaseIcon w="1rem" h="1rem" />,
  },
  {
    href: '/tools/honorarplanung',
    label: 'Honorarplanung',
    leftIcon: <EuroIcon w="1rem" h="1rem" />,
  },
  {
    href: '/tools/steuerliche-langzeitplanung',
    label: 'Steuerliche Langzeitplanung',
    leftIcon: <PercentIcon w="1rem" h="1rem" />,
  },
];
