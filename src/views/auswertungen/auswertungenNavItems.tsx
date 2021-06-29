import { GPSFixedIcon } from 'src/theme/icons/GPSFixedIcon';
import { GPSIcon } from 'src/theme/icons/GPSIcon';
import { SubstractIcon } from 'src/theme/icons/SubstractIcon';

import { NavItem } from '../common/navItemTypes';

export const AUSWERTUNGEN_NAV_ITEMS: Array<NavItem> = [
  {
    href: '/auswertungen/functions-and-committees',
    label: 'Funktionen und Gremien',
    leftIcon: <SubstractIcon w="1rem" h="1rem" />,
  },
  {
    href: '/auswertungen/direct-holdings',
    label: 'Unmittelbare Beteiligungen',
    leftIcon: <GPSFixedIcon w="1rem" h="1rem" />,
  },
  {
    href: '/auswertungen/indirect-holdings',
    label: 'Mittelbare Beteiligungen',
    leftIcon: <GPSIcon w="1rem" h="1rem" />,
  },
];
