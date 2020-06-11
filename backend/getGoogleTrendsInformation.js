const googleTrends = require('google-trends-api');
const queryString = require('querystring');
const CandidateInterestEvolution = require('./models/MunicipalCandidateInterestEvolution');

function getGoogleTrendsInformation(toQuery, since, to, callback) { // https://support.kraken.com/hc/en-us/articles/201893658-Currency-pairs-available-for-trading-on-Kraken

    let apiParams = queryString.stringify({
        keyword: toQuery,
        startTime: since,
        endTime: to,
        geo: 'FR'
    });

    googleTrends.interestOverTime({
        keyword: toQuery,
        startTime: since,
        endTime: to,
        geo: 'FR'
    }).then(function(response){
            let unstringifiedResponse = JSON.parse(response);
            callback(unstringifiedResponse.default.timelineData);
        })
}


exports.getCandidatesInterestEvolution = function (callback) {
    let currentElectionStartingDate = new Date('2020-01-01');
    let currentDate = new Date();
    let previousElectionStartingDate = new Date('2014-01-01');
    let previousElectionEndDate = new Date('2014-03-29');
    getGoogleTrendsInformation("Anne Hidalgo", currentElectionStartingDate, currentDate, (resp) => {
        let result = [];
        for(const elt in resp){
            result.push(new CandidateInterestEvolution({
                candidateName: "Anne Hidalgo",
                date: resp[elt].formattedTime,
                interestRateAtDate: resp[elt].value[0]
            }));
        }
        getGoogleTrendsInformation("Agnès Buzyn", currentElectionStartingDate, currentDate, (resp) => {
            for(const elt in resp) {
                result.push(new CandidateInterestEvolution({
                    candidateName: "Agnès Buzyn",
                    date: resp[elt].formattedTime,
                    interestRateAtDate: resp[elt].value[0]
                }));
            }
            getGoogleTrendsInformation("Rachida Dati", currentElectionStartingDate, currentDate, (resp) => {
                for(const elt in resp) {
                    result.push(new CandidateInterestEvolution({
                        candidateName: "Rachida Dati",
                        date: resp[elt].formattedTime,
                        interestRateAtDate: resp[elt].value[0]
                    }));
                }
                getGoogleTrendsInformation("Anne Hidalgo", previousElectionStartingDate, previousElectionEndDate, (resp) => {
                    for(const elt in resp) {
                        result.push(new CandidateInterestEvolution({
                            candidateName: "Anne Hidalgo",
                            date: resp[elt].formattedTime,
                            interestRateAtDate: resp[elt].value[0]
                        }));
                    }
                    callback(result);
                })
            })
        })
    })

}