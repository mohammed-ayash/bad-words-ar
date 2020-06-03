var data = require('./data');

    /**
     * Filter constructor.
     * @constructor
      */
    function Filter(locale) {
        if(!locale)
            locale = 'ar';
        this.list = data[locale];
    }
    
    /**
     * Determine if a single word is profane or looks profane.
     * @param {string} word - String to evaluate for profanity.
     */
    Filter.prototype.isProfaneLike = function (word) {
        var isProfane = false;
        
        if (this.list.some(function(v) { return (word == v); })) {
            isProfane = true;
        } else {
            isProfane = false;
        }
        return isProfane;
    }   

    /**
     * Replace a word with placeHolder characters;
     * @param {string} string - String to replace.
     */
    Filter.prototype.replaceWord = function (string) {
        return "*".repeat(string.length);
    };

    /**
     * Evaluate a string for profanity and return an edited version.
     * @param {string} string - Sentence to filter.
     */
    Filter.prototype.clean = function (string) {
        return string.split(' ').map(function(word) {
            return this.isProfaneLike(word) ? this.replaceWord(word) : word;
        }.bind(this)).join(' ');
    };

    /**
     * countion a string for profanity and return the count.
     * @param {string} string - Sentence to filter.
     */
    Filter.prototype.count = function (string) {
        var count = 0;
        string.split(' ').map(function(word) {
        if(this.isProfaneLike(word)) 
            count++;
        }.bind(this));
        return count;
    };

    /**
     * Check a string for profanity and return an Boolean.
     * @param {string} string - Sentence to filter.
     */
    Filter.prototype.check = function (string) {
        var isProfane = false;
        string.split(' ').some(function(word) {
            if(this.isProfaneLike(word)) 
                {isProfane = true;
                return true;}
        }.bind(this));
        return isProfane;
    };

module.exports = Filter;
