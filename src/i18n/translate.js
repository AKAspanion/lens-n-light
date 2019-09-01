import {
    setCORS
} from "google-translate-api-browser";

const translate = setCORS("http://cors-anywhere.herokuapp.com/");

export const translateTo = (text, lang) => {
    return translate(text, {
        to: lang
    })
}