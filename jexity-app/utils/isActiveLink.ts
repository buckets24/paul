import { NextRouter } from 'next/router';

type IsActiveLink = (router: NextRouter, href: string, exact: boolean) => boolean;
const isActiveLink: IsActiveLink = (router, href, exact) => {
  if (router.pathname === href) {
    return true;
  }

  if (!exact) {
    if (router.pathname.includes(href)) {
      return true;
    }
  }

  return false;
};

export default isActiveLink;
