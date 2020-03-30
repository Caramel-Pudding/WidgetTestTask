import { h, FunctionComponent } from 'preact';
import { useState } from 'preact/hooks';
import { Language } from '../types/language';
import * as classes from './App.css';
import { DatePickerInput } from './DatePickerInput/index';

interface AppProps {
    language: Language;
    colorTheme: string;
}

interface SearchParams {
    departDate: string;
    returnDate: string;
}

export const App: FunctionComponent<AppProps> = ({ language, colorTheme }) => {
    const local: Record<string, (localLanguage: Language) => string> = {
        headerText: (localLanguage: Language): string => {
            switch (localLanguage) {
                case Language.ru:
                    return 'От куда это? Почему мы это используем?';
                case Language.en:
                default:
                    return 'Where does it come from? Why do we use it?';
            }
        },
        subText: (localLanguage: Language): string => {
            switch (localLanguage) {
                case Language.ru:
                    return 'Это давно установленный факт, что читатель будет отвлечен удобочитаемое содержимое страницы при просмотре ее макета.';
                case Language.en:
                default:
                    return 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.';
            }
        },
        departDatePlaceholder: (localLanguage: Language): string => {
            switch (localLanguage) {
                case Language.ru:
                    return 'Дата отправления';
                case Language.en:
                default:
                    return 'Departure date';
            }
        },
        returnDatePlaceholder: (localLanguage: Language): string => {
            switch (localLanguage) {
                case Language.ru:
                    return 'Дата возврата';
                case Language.en:
                default:
                    return 'Return date';
            }
        },
        buttonText: (localLanguage: Language): string => {
            switch (localLanguage) {
                case Language.ru:
                    return 'ПОИСК';
                case Language.en:
                default:
                    return 'SEARCH';
            }
        },
    };
    const [searchParams, setSerchParams] = useState<SearchParams>({
        departDate: '',
        returnDate: '',
    });
    const searchStartHanlder = (appliedSearchParams: SearchParams): void => {
        if (
            appliedSearchParams.departDate.length < 10 ||
            appliedSearchParams.returnDate.length < 10
        ) {
            alert('Ой, у вас дата коротковата');
            return;
        }
        alert(
            `Search started from ${appliedSearchParams.departDate} to ${appliedSearchParams.returnDate}`
        );
    };

    return (
        <section className={`${classes.container} ${classes[colorTheme]}`}>
            <h2 className={classes.headerText}> {local.headerText(language)}</h2>
            <div className={classes.content}>
                <span className={classes.subText}>{local.subText(language)}</span>
                <form className={classes.searchMenu}>
                    <div className={classes.datePickerBlock}>
                        <DatePickerInput
                            placeholder={local.departDatePlaceholder(language)}
                            setValue={(e): void =>
                                setSerchParams({ ...searchParams, departDate: e })
                            }
                            value={searchParams.departDate}
                        />
                        <DatePickerInput
                            placeholder={local.returnDatePlaceholder(language)}
                            setValue={(e): void =>
                                setSerchParams({ ...searchParams, returnDate: e })
                            }
                            value={searchParams.returnDate}
                        />
                    </div>
                    <button
                        className={classes.searchButton}
                        disabled={Object.values(searchParams).some((param) => !param)}
                        type={'button'}
                        onClick={(): void => searchStartHanlder(searchParams)}
                    >
                        {local.buttonText(language)}
                    </button>
                </form>
            </div>
        </section>
    );
};
