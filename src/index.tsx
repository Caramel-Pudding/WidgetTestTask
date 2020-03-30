import * as ElementQueries from 'css-element-queries/src/ElementQueries';
import { h, render } from 'preact';
import { App } from './components/App';
import { Language } from './types/language';
import { ColorTheme } from './types/colorTheme';

const idToAttach = document.currentScript && document.currentScript.getAttribute('idToAttach');
const nodeToAttach = idToAttach && document.getElementById(idToAttach);

const getCorrectLanguageFromScriptTag = (language: string | null): Language => {
    if (language && Object.keys(Language).includes(language)) {
        return Language[language as keyof typeof Language];
    }
    return Language.en;
};

const getCorrectColorThemeFromScriptTag = (colorTheme: string | null): ColorTheme => {
    if (colorTheme && Object.keys(ColorTheme).includes(colorTheme)) {
        return ColorTheme[colorTheme as keyof typeof ColorTheme];
    }
    return ColorTheme.BlueAndOrange;
};

try {
    if (nodeToAttach) {
        render(
            <App
                colorTheme={getCorrectColorThemeFromScriptTag(
                    document.currentScript && document.currentScript.getAttribute('colorTheme')
                )}
                language={getCorrectLanguageFromScriptTag(
                    document.currentScript && document.currentScript.getAttribute('lang')
                )}
            />,
            nodeToAttach
        );
        ElementQueries.listen();
    } else {
        throw new Error('Please, give me a correct mount id');
    }
} catch (e) {
    console.error(e);
}
