import { ListBulletIcon } from 'src/theme/icons/ListBulletIcon';
import { UserIcon } from 'src/theme/icons/UserIcon';
import { Users2Icon } from 'src/theme/icons/Users2Icon';

import { NavItemGroup } from '../common/navItemTypes';

export const EINSTELLUNGEN_NAV_ITEMS: Array<NavItemGroup> = [
  {
    label: 'Benutzerverwaltung',
    href: '/einstellungen/users',
    leftIcon: <UserIcon w="1rem" h="1rem" />,
  },
  {
    label: 'Mitarbeiterverwaltung ',
    href: '/einstellungen/mitarbeiterverwaltung',
    leftIcon: <Users2Icon w="1rem" h="1rem" />,
  },
  {
    label: 'Listenverwaltung',
    href: '/einstellungen/familienstand',
    leftIcon: <ListBulletIcon w="1rem" h="1rem" mr={2} />,
    children: [
      {
        label: 'Familienstand',
        href: '/einstellungen/familienstand',
      },
      {
        label: 'Finanzamt',
        href: '/einstellungen/finanzamt',
      },
      {
        label: 'Funktion',
        href: '/einstellungen/funktion',
      },
      {
        label: 'gfKdst Regelung',
        href: '/einstellungen/gfKdst-regelung',
      },
      {
        label: 'Gremien',
        href: '/einstellungen/gremien',
      },
      {
        label: 'Land',
        href: '/einstellungen/land',
      },
      {
        label: 'Mandantentyp',
        href: '/einstellungen/mandantentyp',
      },
      {
        label: 'Rechtsform',
        href: '/einstellungen/rechtsform',
      },
      {
        label: 'Registerart',
        href: '/einstellungen/registerart',
      },
      {
        label: 'Religion',
        href: '/einstellungen/religion',
      },
      {
        label: 'Vertretungsbefugnis',
        href: '/einstellungen/vertretungsbefugnis',
      },
      {
        label: 'Währung',
        href: '/einstellungen/waehrung',
      },
      {
        label: 'Bank',
        href: '/einstellungen/bank',
      },
    ],
  },
];
