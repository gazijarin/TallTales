import { toast } from 'react-toastify';

export const errorToast = (input) => {
    const message = input ? input : "error!"; 

    toast.error(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
    });
    toast.clearWaitingQueue();
}

export const successToast = (input) => {
    const message = input ? input : "success!"; 

    toast.success(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
    });
    toast.clearWaitingQueue();
}

export const infoToast = (input) => {
    const message = input ? input : "info!"; 

    toast.info(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
    });
    toast.clearWaitingQueue();
}

export const warningToast = (input) => {
    const message = input ? input : "warning!"; 

    toast.dismiss();

    toast.warning(message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        closeOnClick: true,
        draggable: true,
    });
    toast.clearWaitingQueue();
}

export const timerToast = (seconds, input) => {
    const message = input ? input : "Send in your sentence!";

    toast.info(message, {
        position: "bottom-left",
        autoClose: seconds * 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        pauseOnFocusLoss: false,
    });
    toast.clearWaitingQueue();
}

export const closeToasts = () => {
    toast.dismiss();
}

// other options include 'success' and 'warning'