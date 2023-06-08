"use client";

import { useCallback } from "react";
import Button from "../Button";

interface ActionLabelProps {
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
    onSubmit: () => void;
}

const ActionLabel: React.FC<ActionLabelProps> = ({
    actionLabel,
    secondaryAction,
    disabled,
    secondaryActionLabel,
    onSubmit,
}) => {

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [disabled, secondaryAction]);

    return (
        <div className="flex flex-col gap-2 p-6">
            <div
                className="
                flex
                flex-row
                items-center
                gap-4
                w-full
            "
            >
                {secondaryAction && secondaryActionLabel && (
                    <Button
                        outline
                        disabled={disabled}
                        label={secondaryActionLabel}
                        onClick={handleSecondaryAction}
                    />
                )}
                <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                />
            </div>
        </div>
    );
}

export default ActionLabel;