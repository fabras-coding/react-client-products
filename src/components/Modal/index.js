import React from 'react';
import './styles.css';

export default function Modal({
isOpen,
title,
message,
onConfirm,
onCancel,
confirmText = 'Confirm',
cancelText = 'Cancel',
type = 'default'

}) {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className={`modal-container ${type}`}>
                <h2>{title}</h2>
                <p>{message}</p>

                <div className="modal-actions">
                    {onCancel && (
                        <button className="cancel" onClick={onCancel}>
                            {cancelText}
                        </button>
                    )}

                    {onConfirm && (
                        <button className="confirm" onClick={onConfirm}>
                            {confirmText}
                        </button>
                    )}

                </div>
            </div> 
        </div>
    );
}