'use client';

import store from './store';
import { Provider } from 'react-redux';

export const StateProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};

