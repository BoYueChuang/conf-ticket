import React from 'react';
import './Dialog.scss';

interface DialogProps {
  isShowButton?: boolean; // 是否顯示確認和取消按鈕
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  showCloseButton?: boolean;
  className?: string;
  requireScrollToBottom?: boolean; // 新增：是否需要滾動到底部才能確認
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  confirmText = '確認',
  cancelText = '取消',
  onConfirm,
  onCancel,
  showCloseButton = true,
  className = '',
  requireScrollToBottom = false,
  isShowButton = true, // 是否顯示確認和取消按鈕
}) => {
  const [canConfirm, setCanConfirm] = React.useState(!requireScrollToBottom);
  const contentRef = React.useRef<HTMLDivElement>(null);

  // 重置狀態當對話框開啟時
  React.useEffect(() => {
    if (isOpen) {
      setCanConfirm(!requireScrollToBottom);
    }
  }, [isOpen, requireScrollToBottom]);

  // 檢查是否滾動到底部
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!requireScrollToBottom) return;

    const element = e.currentTarget;
    const isAtBottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 5; // 5px 的容差值

    setCanConfirm(isAtBottom);
  };
  if (!isOpen) return null;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onClose();
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="dialog-overlay" onClick={handleOverlayClick}>
      <div className={`dialog-container ${className}`}>
        {/* 標題區域 */}
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          {showCloseButton && (
            <button className="dialog-close-btn" onClick={onClose}>
              ✕
            </button>
          )}
        </div>

        {/* 內容區域 */}
        <div
          className="dialog-content"
          ref={contentRef}
          onScroll={handleScroll}
          style={{ marginBottom: isShowButton ? '0' : '40px' }}
        >
          {children}
        </div>

        {/* 按鈕區域 */}
        {isShowButton && (
          <div className="dialog-actions">
            <button
              className="btn send-btn"
              onClick={handleConfirm}
              disabled={!canConfirm}
            >
              {confirmText}
            </button>
            <button className="btn cancel-btn" onClick={handleCancel}>
              {cancelText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
