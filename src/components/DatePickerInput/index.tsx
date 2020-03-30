import { h, FunctionComponent, JSX } from 'preact';

import * as classes from './index.css';

interface DatePickerInputProps {
    value: string;
    setValue: (value: string) => void;
    placeholder: string;
}

export const DatePickerInput: FunctionComponent<DatePickerInputProps> = ({
    placeholder,
    value,
    setValue,
}) => {
    const keyPressHandler = (e: any): void => {
        if (!/^\d$/.test(e.key) || e.target.value.length === 10) {
            e.preventDefault();
        }
        if (e.target.value.length === 2 || e.target.value.length === 5) {
            e.target.value += '.';
        }
    };

    const inputHandler = (e: JSX.TargetedEvent<HTMLInputElement, Event>): void => {
        setValue(e.currentTarget.value);
    };

    return (
        <div className={classes.container}>
            <input
                className={classes.input}
                placeholder={placeholder}
                type={'text'}
                value={value}
                onInput={(e: JSX.TargetedEvent<HTMLInputElement, Event>): void => inputHandler(e)}
                onKeyPress={(e: KeyboardEvent): void => keyPressHandler(e)}
            />
            <img
                alt={'calendarIcon'}
                className={classes.calendarIcon}
                src={'src/assets/calendar.svg'}
                onClick={() =>
                    alert(
                        'А ведь только представьте: сейчас мог бы открыться нормальный дэйтпикер!'
                    )
                }
            />
        </div>
    );
};
