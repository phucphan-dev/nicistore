import React from 'react';
import Modal from 'react-modal';

import Button from 'components/atoms/Button';
import mapModifiers from 'utils/functions';

export type VariantModal = 'default' | 'notification' | 'maxWith428';

interface ModalProps {
  isOpen: boolean;
  handleClose?: () => void;
  variant?: VariantModal;
  children?: React.ReactNode;
  showIconClose?: boolean;
  modifiers?: string[];
}

const CustomModal: React.FC<ModalProps> = ({
  isOpen,
  handleClose,
  variant,
  children,
  showIconClose,
  modifiers,
}) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    closeTimeoutMS={250}
    className={mapModifiers('o-modal', variant)}
    ariaHideApp={false}
    portalClassName={mapModifiers('o-modal_portal', isOpen && 'open')}
    overlayClassName={mapModifiers('o-modal_overlay', variant)}
  >
    <div className="o-modal_main">
      <div className={mapModifiers('o-modal_wrapper', modifiers)}>
        {handleClose && showIconClose
          && (
            <div className="o-modal_close">
              <Button iconName="close" variant="whiteBorder" iconSize="16" handleClick={handleClose} />
            </div>
          )}
        <div className="o-modal_body">{children}</div>
      </div>
    </div>
  </Modal>
);

CustomModal.defaultProps = {
  children: undefined,
};

export default CustomModal;
