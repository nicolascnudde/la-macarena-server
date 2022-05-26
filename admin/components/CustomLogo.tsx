/** @jsxRuntime classic */
/** @jsx jsx */
import Link from 'next/link';
import { jsx, H3 } from '@keystone-ui/core';

export const CustomLogo = () => {
  return (
    <H3>
      <Link href="/" passHref>
        <a
          css={{
            backgroundImage: `url('https://i.imgur.com/oU7CVcy.png')`,
            backgroundSize: '3.5rem 3.5rem',
            backgroundRepeat: 'no-repeat',
            display: 'inline-block',
            height: '3.5rem',
            width: '3.5rem',
          }}
        ></a>
      </Link>
    </H3>
  );
};
