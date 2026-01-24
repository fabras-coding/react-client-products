import React, { createContext, useContext, useState } from 'react';
import Modal from '../components/Modal';

const ModalContext = createContext();

export function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState({});


    function closeModal() {
        setIsOpen(false);
    }

    function confirm({ title, message, onConfirm }) {
        setModalConfig({
            type: 'confirm',
            title,
            message,
            confirmText: 'Confirm',
            cancelText: 'Cancel',
            onConfirm: () => {
                closeModal();
                onConfirm();
            },
            onCancel: closeModal
        });

        setIsOpen(true);
    }

    function success(message, onClose = null) {
        setModalConfig({
            type: 'success',
            title: 'Success',
            message,
            confirmText: 'OK',
            onConfirm: () => {
                closeModal();
                if (onClose) onClose();
            }
        });

        setIsOpen(true);
    }

    function mError(message) {
        setModalConfig({
            type: 'error',
            title: 'Error',
            message,
            confirmText: 'Close',
            onConfirm: closeModal
        });

        setIsOpen(true);
    }


    

    return (

        <ModalContext.Provider value={{ confirm, success, mError }}>
            {children}
            <Modal
                isOpen={isOpen}
                {...modalConfig}
            />
        </ModalContext.Provider>
    );

}

export function useModal() {
    return useContext(ModalContext);
}

