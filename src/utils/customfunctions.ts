// the below list of custom functions are copied from
// https://github.com/adobe/aem-core-forms-components/blob/master/ui.frontend/src/customFunctions.js

/**
 * Validates if the given URL is correct.
 * @param {string} url - The URL to validate.
 * @returns {boolean} - True if the URL is valid, false otherwise.
 */
function validateURL(url: string | URL) {
    try {
        const validatedUrl = new URL(url, window.location.href);
        return (validatedUrl.protocol === 'http:' || validatedUrl.protocol === 'https:');
    }
    catch (err) {
        return false;
    }
}


/**
 * Navigates to the specified URL.
 * @param {string} destinationURL - The URL to navigate to. If not specified, a new blank window will be opened.
 * @param {string} destinationType - The type of destination. Supports the following values: "_newwindow", "_blank", "_parent", "_self", "_top", or the name of the window.
 * @returns {Window} - The newly opened window.
 */
function navigateTo(destinationURL: any, destinationType: any) {
    let param = null,
        windowParam = window,
        arg = null;
    switch (destinationType){
        case "_newwindow":
            param = "_blank";
            arg = "width=1000,height=800";
            break;
    }
    if (!param) {
        if (destinationType) {
            param = destinationType;
        } else {
            param = "_blank";
        }
    }
    if (validateURL(destinationURL)){
        windowParam.open(destinationURL, param, arg);
    }
}

export {
    validateURL,
    navigateTo
};