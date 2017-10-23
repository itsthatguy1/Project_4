/**
 *   @author Sean Stock (sstock6829@gmail.com)
 *   @version 0.0.2
 *   @summary Project 4 Arrays || created: 10.9.17
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');

let averageRating, rating, listNumber, maxListNumber, numberMovies;
let newMovie, existingMovie;
let existingOrNew, viewOrNew, reRun, checkExisting, checkNew;
let movieInfo = [];
const MIN_MOVIES = 0, TITLE = 0, RATING = 1, AVERAGE_RATING = 2, NUMBER_RATINGS = 3;

/**
 * @method
 * @desc Main dispatch Method
 */
function main(){
    numberMovies = 0;
    maxListNumber = 0;
    reRun = 0;
    while (reRun === 0){
        while (numberMovies === MIN_MOVIES || existingOrNew === 0) {
            listNumber = 0;
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
    listNumber = maxListNumber;
    movieInfo[listNumber] = [];
    movieInfo[listNumber][TITLE] = setMovieTitle();
    checkNew = Number(1);
    checkExisting = Number(0);
    movieInfo[listNumber][RATING] = setRating();
    movieInfo[listNumber][AVERAGE_RATING] = setAverageRating();
    movieInfo[listNumber][NUMBER_RATINGS] = 1;
    maxListNumber++;
}

/**
 * @method
 * @desc Populates the movieInfo array for an existing movie
 */
function populateExistingMovieInfo(){
    checkExisting = Number(1);
    checkNew = Number(0);
    setRating();
    movieInfo[listNumber][NUMBER_RATINGS]++;
    movieInfo[listNumber][AVERAGE_RATING] = setAverageRating();
}

/**
 * @method
 * @desc Allows user to select a movie from the list
 */
function promptMovieTitle(){
    existingMovie = PROMPT.question(`Please enter the title of the movie you are selecting: `);
    listNumber = 0;
    let realTitle = movieInfo[listNumber][TITLE];
    while (existingMovie !== realTitle && listNumber < maxListNumber){
        realTitle = movieInfo[listNumber][TITLE];
        if (existingMovie !== realTitle){
            listNumber++;
        }
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
    listNumber = 0;
    let realTitle = movieInfo[listNumber][TITLE];
    let realAverage = movieInfo[listNumber][AVERAGE_RATING];
    while (existingMovie !== realTitle && listNumber < maxListNumber){
        realTitle = movieInfo[listNumber][TITLE];
        realAverage = movieInfo[listNumber][AVERAGE_RATING];
        listNumber++;
    }
    console.log(`The average rating for "${realTitle}" is ${realAverage}`);
}

/**
 * @method
 * @desc Displays list of all movies that users have entered reviews of
 */
function displayMovies(){
    process.stdout.write('\x1Bc');
    listNumber = Number(0);
    let n = 1;
    while (listNumber < maxListNumber){
        console.log(`\n${n}. ${movieInfo[listNumber][TITLE]}`);
        listNumber++;
        n++;
    }
}

/**
 * @method
 * @desc Mutates the newMovie variable
 * @returns {newMovie}
 */
function setMovieTitle(){
    process.stdout.write('\x1Bc');
    newMovie = PROMPT.question(`\nPlease enter the movie title: `);
    return newMovie;
}

/**
 * @method
 * @desc Mutates the rating variable. Allows user to input a rating for a specific movie.
 * @returns {rating}
 */
function setRating(){
    const MIN_RATING = 0, MAX_RATING = 5;
    process.stdout.write('\x1Bc');
    console.log(`Please enter ratings of 0-5 stars.`);
    if (checkExisting === 1 && checkNew === 0){
        rating = Number(PROMPT.question(`\nHow many stars do you give "${existingMovie}"? `));
        while (rating < MIN_RATING || rating > MAX_RATING || /^[a-zA-Z]/.test(rating)) {
            console.log(`"${rating}" is an incorrect value. Please try again.`);
            rating = Number(PROMPT.question(`\nHow many stars do you give "${existingMovie}"? `));
        }
    }
    else if (checkNew === 1 && checkExisting === 0){
        rating = Number(PROMPT.question(`\nHow many stars do you give "${newMovie}"? `));
        while (rating < MIN_RATING || rating > MAX_RATING || /^[a-zA-Z]/.test(rating)){
            console.log(`"${rating}" is an incorrect value. Please try again.`);
            rating = Number(PROMPT.question(`\nHow many stars do you give "${newMovie}"? `));
        }
    }
    return rating;
}

/**
 * @method
 * @desc Calculates average rating for a movie
 * @returns {averageRating}
 */
function setAverageRating(){
    if (checkNew === 1){
        averageRating = rating;
    }
    else if (checkExisting === 1){
        let numberRatings = movieInfo[listNumber][NUMBER_RATINGS];
        let currentAverage = movieInfo[listNumber][AVERAGE_RATING];
        let currentNumberRatings = numberRatings - 1;
        let currentTotal = currentAverage * currentNumberRatings;
        let newTotal = currentTotal + rating;
        averageRating = newTotal / numberRatings;
    }
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
