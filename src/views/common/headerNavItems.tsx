import { SettingsIcon } from 'jexity-app/icons/SettingsIcon';
import React, { ReactElement } from 'react';
import { DashboardIcon } from 'src/theme/icons/DashboardIcon';
import { DesktopIcon } from 'src/theme/icons/DesktopIcon';
import { EuroIcon } from 'src/theme/icons/EuroIcon';
import { FileIcon } from 'src/theme/icons/FileIcon';
import { FlagIcon } from 'src/theme/icons/FlagIcon';
import { GPSFixedIcon } from 'src/theme/icons/GPSFixedIcon';
import { GPSIcon } from 'src/theme/icons/GPSIcon';
import { ListBulletIcon } from 'src/theme/icons/ListBulletIcon';
import { PercentIcon } from 'src/theme/icons/PercentIcon';
import { SubstractIcon } from 'src/theme/icons/SubstractIcon';
import { SuitcaseIcon } from 'src/theme/icons/SuitcaseIcon';
import { TimeIcon } from 'src/theme/icons/TimeIcon';
import { UserIcon } from 'src/theme/icons/UserIcon';
import { Users2Icon } from 'src/theme/icons/Users2Icon';
import { UsersIcon } from 'src/theme/icons/UsersIcon';

export interface HeaderNavItem {
  label: string;
  href: string;
  subLabel?: string;
  children?: Array<HeaderNavItem>;
  lastIndex?: boolean;
  leftIcon?: ReactElement;
}

export const HEADER_NAV_ITEMS: Array<HeaderNavItem> = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    leftIcon: <DashboardIcon w="1rem" mr={[0, 0, 0, 0, 1.5]} />,
  },
  {
    label: 'Mandanten',
    href: '/clients',
    leftIcon: <UsersIcon w="1.25rem" mr={[0, 0, 0, 0, 1.5]} />,
  },
  {
    label: 'Dokumente',
    href: '/documents',
    leftIcon: <FileIcon h="1rem" w=".75rem" mr={[0, 0, 0, 0, 1.5]} />,
  },
  {
    label: 'Auswertungen',
    href: '/auswertungen',
    children: [
      {
        href: '/auswertungen/functions-and-committees',
        label: 'Funktionen und Gremien',
        leftIcon: <SubstractIcon w="1rem" h="1rem" mr="6px" />,
      },
      {
        href: '/auswertungen/direct-holdings',
        label: 'Unmittelbare Beteiligungen',
        leftIcon: <GPSFixedIcon w="1rem" h="1rem" mr="6px" />,
      },
      {
        href: '/auswertungen/indirect-holdings',
        label: 'Mittelbare Beteiligungen',
        leftIcon: <GPSIcon w="1rem" h="1rem" mr="6px" />,
      },
    ],
    leftIcon: <FlagIcon w="1rem" h="1rem" mr={[0, 0, 0, 0, 1.5]} />,
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [
      {
        href: '/tools/zeiterfassung',
        label: 'Zeiterfassung',
        leftIcon: <TimeIcon w="1rem" h="1rem" mr="6px" />,
      },
      {
        href: '/tools/grundsteuerplanung',
        label: 'Grundsteuerplanung',
        leftIcon: <SuitcaseIcon w="1rem" h="1rem" mr="6px" />,
      },
      {
        href: '/tools/honorarplanung',
        label: 'Honorarplanung',
        leftIcon: <EuroIcon w="1rem" h="1rem" mr="6px" />,
      },
      {
        href: '/tools/steuerliche-langzeitplanung',
        label: 'Steuerliche Langzeitplanung',
        leftIcon: <PercentIcon w="1rem" h="1rem" mr="6px" />,
      },
    ],
    leftIcon: <DesktopIcon w="1rem" h="1rem" mr={[0, 0, 0, 0, 1.5]} />,
  },
  {
    label: 'Einstellungen',
    href: '/einstellungen',
    children: [
      {
        label: 'Benutzerverwaltung',
        href: '/einstellungen/users',
        leftIcon: <UserIcon w="1rem" h="1rem" mr={'6px'} />,
      },
      {
        label: 'Mitarbeiterverwaltung ',
        href: '/einstellungen/mitarbeiterverwaltung',
        leftIcon: <Users2Icon w="1rem" h="1rem" mr={'6px'} />,
      },
      {
        label: 'Listenverwaltung',
        href: '/einstellungen/familienstand',
        leftIcon: <ListBulletIcon w="1rem" h="1rem" mr={'6px'} />,
      },
    ],
    leftIcon: <SettingsIcon w="1rem" h="1rem" mr={[0, 0, 0, 0, 1.5]} />,
  },
];
