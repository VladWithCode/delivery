import { useContext } from 'react';
import ToastContext from '../context/Toast/ToastContext';

export const useToast = () => useContext(ToastContext);
