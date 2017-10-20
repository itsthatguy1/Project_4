/**
 *   @author Sean Stock (sstock6829@gmail.com)
 *   @version 0.0.1
 *   @summary Project 4 Arrays || created: 10.9.17
 *   @todo Allow a user to view previous entries about movies or create their own.
 */

"use strict";
const PROMPT = require('readline-sync');

let averageRating, rating, numberRatings, i, maxI, numberMovies;
// variable "i" is short for integer. It is the variable used to determine the identities of blocks in the "movieInfo" array.
let newMovie, existingMovie;
let existingOrNew, viewOrNew, reRun, checkExisting, checkNew;
let movieInfo = [];
const MIN_MOVIES = 0;

/**
 * @method
 * @desc Main dispatch Method
 */
function main(){
    numberMovies = 0;
    maxI = 0;
    reRun = 0;
    while (reRun === 0){
        while (numberMovies === MIN_MOVIES || existingOrNew === 0) {
            i = 0;
            populateNewMovieInfo();
            numberMovies++;
            promptExistingOrNew();
            while (existingOrNew === 1){
                displayMovies();
                promptMovieTitle();
                if (reRun !== 1){
                    promptViewOrNew();
                    if (viewOrNew === 0){
                        populateExistingMovieInfo();
                    }
                    else if (viewOrNew === 1){
                        displayAverage();
                    }
                }
                promptExistingOrNew();
            }
        }
    }
}

main();

/**
 * @method
 * @desc Populates the movieInfo array for a movie that is not currently on the list
 */
function populateNewMovieInfo(){
    i = maxI;
    movieInfo[i] = [];
    movieInfo[i][0] = setMovieTitle();
    checkNew = Number(1);
    checkExisting = Number(0);
    movieInfo[i][1] = setRating();
    movieInfo[i][2] = setAverageRating();
    movieInfo[i][3] = setNumberRatings();
    maxI++;
}

/**
 * @method
 * @desc Populates the movieInfo array for an existing movie
 */
function populateExistingMovieInfo(){
    checkExisting = Number(1);
    checkNew = Number(0);
    setRating();
}

/**
 * @method
 * @desc Allows user to select a movie from the list
 * @returns {title}
 */
function promptMovieTitle(){
    existingMovie = PROMPT.question(`Please enter the title of the movie you are selecting: `);
    i = 0;
    let realTitle = movieInfo[i][0];
    while (existingMovie !== realTitle && i < maxI){
        realTitle = movieInfo[i][0];
        i++;
    }
    if (existingMovie === realTitle){
        reRun = Number(0);
    }
    else{
        console.log(`I'm sorry, that is an incorrect movie title. Please try again.`);
        reRun = Number(1);
    }
}

/**
 * @method
 * @desc Allows user to select whether they want to switch to view the average rating of a movie, or if they want to enter a review of a movie
 */
function promptViewOrNew(){
    viewOrNew = Number(PROMPT.question(`\nIf you would like to view the average rating of this movie, please enter "1". \nIf you would like to enter a new review of this movie, please enter "0": `));
    while (viewOrNew !== 1 &&  viewOrNew !== 0) {
        console.log(`I'm sorry, but you have entered an incorrect value. Please try again.`);
        viewOrNew = Number(PROMPT.question(`\nIf you would like to view the average rating of this movie, please enter "1". \nIf you would like to enter a new review of this movie, please enter "0": `));
    }
}

/**
 * @method
 * @desc Displays the average rating for a movie
 */
function displayAverage(){
    process.stdout.write('\x1Bc');
    i = 0;
    let realTitle = movieInfo[i][0];
    let realAverage = movieInfo[i][2];
    while (existingMovie !== realTitle && i < maxI){
        realTitle = movieInfo[i][0];
        realAverage = movieInfo[i][2];
        i++;
    }
    console.log(`The average rating for "${realTitle}" is ${realAverage}`);
}

/**
 * @method
 * @desc Displays list of all movies that users have entered reviews of
 */
function displayMovies(){
    process.stdout.write('\x1Bc');
    i = Number(0);
    let n = 1;
    while (i < maxI){
        console.log(`\n${n}. ${movieInfo[i][0]}`);
        i++;
        n++;
    }
}

/**
 * @method
 * @desc Mutates the movieTitle variable
 * @returns {newMovie}
 */
function setMovieTitle(){
    process.stdout.write('\x1Bc');
    newMovie = PROMPT.question(`\nPlease enter the movie title: `);
    return newMovie;
}

/**
 * @method
 * @desc Mutates the rating variable
 * @returns {rating}
 */
function setRating(){
    const MIN_RATING = 0, MAX_RATING = 5;
    process.stdout.write('\x1Bc');
    console.log(`Please enter ratings of 0-5 stars.`);
    if (checkExisting === 1 && checkNew === 0){
        rating = PROMPT.question(`\nHow many stars do you give "${existingMovie}"? `);
        while (rating < MIN_RATING || rating > MAX_RATING || /^[a-zA-Z]/.test(rating)) {
            console.log(`"${rating}" is an incorrect value. Please try again.`);
            rating = PROMPT.question(`\nHow many stars do you give "${existingMovie}"? `);
        }
    }
    else if (checkNew === 1 && checkExisting === 0){
        rating = PROMPT.question(`\nHow many stars do you give "${newMovie}"? `);
        while (rating < MIN_RATING || rating > MAX_RATING || /^[a-zA-Z]/.test(rating)){
            console.log(`"${rating}" is an incorrect value. Please try again.`);
            rating = PROMPT.question(`\nHow many stars do you give "${newMovie}"? `);
        }
    }
    return rating;
}

/**
   * @method
   * @desc Mutates the numberRatings variable
   * @returns {numberRatings}
 */
function setNumberRatings(){
    if (numberRatings == null){
        numberRatings = 0;
    }
    numberRatings++;
    return numberRatings;
}

/**
 * @method
 * @desc Creates a random average rating for the movie
 * @returns {averageRating}
 */
function setAverageRating(){
    averageRating = Math.floor(Math.random() * 5);
    return averageRating;
}

/**
 * @method
 * @desc Prompts user to either select a movie from the list or enter a new movie
 */
function promptExistingOrNew(){
    existingOrNew = Number(PROMPT.question(`\nIf you wish to select a movie from the list, please enter "1". \nIf you wish to enter a new movie, please enter "0" `));
    while (existingOrNew !== 1 && existingOrNew !== 0){
        console.log(`I'm sorry, but you have entered an incorrect value. Please try again.`);
        existingOrNew = Number(PROMPT.question(`\nIf you wish to select a movie from the list, please enter "1". \nIf you wish to enter a new movie, please enter "0" `));
    }
}
