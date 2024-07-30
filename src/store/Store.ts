import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { State } from './Types';

import { createDesignDetailsSlice, createNotionDetailsSlice, createUserDetailsSlice } from './Slice';

export const useNotionBuddyStore = create<State>()(
    devtools(
        (set, ...rest) => ({
            designDetails: createDesignDetailsSlice(set, ...rest),
            notionDetails: createNotionDetailsSlice(set, ...rest),
            userDetails: createUserDetailsSlice(set, ...rest),
        })
    ),
  )