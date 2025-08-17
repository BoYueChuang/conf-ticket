import React, { useState } from 'react';
import './QuantitySelector.scss';

interface QuantitySelectorProps {
    initialValue?: number;
    min?: number;
    max?: number;
    onChange?: (value: number) => void;
}

interface MinusIconProps {
    disabled: boolean;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
    initialValue = 0,
    min = 0,
    max = 99,
    onChange
}) => {
    const [quantity, setQuantity] = useState(initialValue);

    const handleDecrease = () => {
        if (quantity > min) {
            const newValue = quantity - 1;
            setQuantity(newValue);
            onChange?.(newValue);
        }
    };

    const handleIncrease = () => {
        if (quantity < max) {
            const newValue = quantity + 1;
            setQuantity(newValue);
            onChange?.(newValue);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value) || 0;
        if (value >= min && value <= max) {
            setQuantity(value);
            onChange?.(value);
        }
    };

    const MinusIcon: React.FC<MinusIconProps> = ({ disabled }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`icon ${disabled ? 'disabled' : ''}`}
        >
            <path
                d="M19 12.998H5V10.998H19V12.998Z"
                fill={disabled ? "#3B82F6" : "#A5A9AB"}
            />
        </svg>
    );

    const PlusIcon = () => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="icon"
        >
            <path
                d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z"
                fill="black"
            />
        </svg>
    );

    return (
        <div className="quantity-selector">
            <button
                className="quantity-btn decrease"
                onClick={handleDecrease}
                disabled={quantity <= min}
                type="button"
            >
                <MinusIcon disabled={quantity <= min} />
            </button>

            <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={handleInputChange}
                min={min}
                max={max}
            />

            <button
                className="quantity-btn increase"
                onClick={handleIncrease}
                disabled={quantity >= max}
                type="button"
            >
                <PlusIcon />
            </button>
        </div>
    );
};

// 使用範例
const App = () => {
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    return (
        <div style={{ padding: '20px' }}>
            <h3>數量選擇器</h3>
            <QuantitySelector
                initialValue={0}
                min={0}
                max={10}
                onChange={(value: number) => {
                    console.log('數量變更:', value);
                    setSelectedQuantity(value);
                }}
            />
            <p>選擇的數量: {selectedQuantity}</p>
        </div>
    );
};

export default App;