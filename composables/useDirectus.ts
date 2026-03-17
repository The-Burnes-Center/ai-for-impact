import { createDirectus, rest, readItem } from '@directus/sdk';

export const useDirectus = () => {
  const config = useRuntimeConfig();
  const directus = createDirectus(config.public.directusUrl as string).with(rest());
  return directus;
};

export { readItem };
