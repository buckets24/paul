import { BoxProps, Breadcrumb, BreadcrumbItem, BreadcrumbLink, useMultiStyleConfig } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

export const JexityBreadcrumb: FC<BoxProps> = ({ ...other }) => {
  const router = useRouter();
  const styles = useMultiStyleConfig('Breadcrumb', {});
  const urlArr = router.asPath.split('/').slice(2, router.asPath.split('/').length);

  return (
    <Breadcrumb {...other}>
      {urlArr.map((url, i) => (
        <BreadcrumbItem key={i}>
          <NextLink href={`${router.asPath.slice(0, router.asPath.indexOf(`${url}`))}${url}`} passHref>
            <BreadcrumbLink
              sx={{ ...styles.breadcrumbLink, color: urlArr[urlArr.length - 1] === url ? 'gray.600' : 'initial' }}
            >
              {url}
            </BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};
