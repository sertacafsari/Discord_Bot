/**
 * A file to create tokens for connectiong to the Spotify Web API
 */

// Importing the required modules
let qs = require('qs');
import axios from 'axios';

// Global variables
let access_token = '';
let refresh_token = '';
let options = {};


// A function to creating the access token
async function createAccessToken(accessCode) {

    /**
     * MIGHT BE ADDING TRY-CATCH BLOCKS HERE
     * 
     */
    let response =  await axios.post(accessCode.url, qs.stringify(accessCode.data), { headers: accessCode.headers,});

    if (response.status === 200) {
        access_token = response.data.access_token;
        refresh_token = response.data.refresh_token;

        options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { Authorization: 'Bearer ' + access_token },
            json: true,
        }

        return options; 
    }

} 

// A function to creating the refreshToken
async function createRefreshToken(refreshCode) {
    /**
     * MIGHT BE ADDING TRY-CATCH BLOCKS HERE
     */

    let response = await axios.post(refreshCode.url, qs.stringify(refreshCode.data), { headers: refreshCode.headers });
        
    if (response.status === 200) {
        access_token = response.data.access_token;
    }

    return access_token;
}

// Exporting the functions
module.exports = {
    createAccessToken,
    createRefreshToken,
}





    
