import { Launch } from '../../src/app/models/launch';

export const NEW_LAUNCH: Launch = {
  id: 'IdTest',
  slug: 'Slug test',
  name: 'Launch name test',
  net: new Date(),
  status: {
    name: 'Status name',
  },
  pad: {
    name: 'Pad name',
    location: {
      name: 'Pad Location',
    },
  },
};
