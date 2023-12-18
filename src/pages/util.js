import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showErrorToastMessage = (message) => {
   return toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
};

export const showSuccessToastMessage = (message) => {
    return toast.success(message, {
       position: toast.POSITION.TOP_RIGHT,
     });
 };

 export const showToastMessage = (type,message) => {
    return toast[type](message, {
       position: toast.POSITION.TOP_RIGHT,
     });
 };