import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore,
} from 'react-redux';

export const useAppDispatch = () => {
  const store = useStore();
  type AppDispatch = typeof store.dispatch;
  return useDispatch<AppDispatch>();
};
export const useAppSelector: TypedUseSelectorHook<any> = useSelector;
