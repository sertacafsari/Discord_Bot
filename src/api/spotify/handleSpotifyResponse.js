/**
 * A function to handle each possible API response calls error codes for Spotify.
 * @param {Integer} status The status to handle.
 * @returns {String} description of the response call.
 */
function handleSpotifyResponseCalls(status) {

    // A map of possible API response calls error codes
    const responseCallsMap = new Map(
        [204, 'No Content'], 
        [304, 'Not Modified'],
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [429, 'Too Many Requests'],
        [500, 'Internal Server Error'],
        [502, 'Bad Gateway'],
        [503, 'Service Unavailable']
    );

    // Returning the response call description
    if (responseCallsMap.has(status)) {
        console.log(responseCallsMap.get(status));
    } else {
        console.log('Unknown Response Call');
    }
}