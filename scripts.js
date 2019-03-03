function app() {

    var showtemp = document.getElementById('show').value;
    var showName= showtemp.split(' ').join('-');
    console.log(showName);
    var seasonRequest = new XMLHttpRequest();

    seasonRequest.open('GET', "https://api.trakt.tv/shows/" + showName + "/seasons");
    seasonRequest.setRequestHeader('Content-Type', 'application/json');
    seasonRequest.setRequestHeader('trakt-api-version', '2');
    seasonRequest.setRequestHeader('trakt-api-key', 'ac4d93cb1d8c7ae909503c684cc2ab9ad7c666ce48fbdd9df3ac7cef48f7d841');

    seasonRequest.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log("Season request Status: " + this.readyState);
            var seasonJson = JSON.parse(this.response);
            var noOfSeasons = seasonJson.length - 1;
            console.log("Number of seasons: " + noOfSeasons);

            var finalTime = 0;
            for (i = 1; i <= noOfSeasons; i++) {
                var season = i;
                var episode;

                for (episode = 1; episode <= 30; episode++) {
                    epUrl = "https://api.trakt.tv/shows/" + showName + "/seasons/" + season + "/episodes/" + episode + "?extended=full";

                    var timeRequest = new XMLHttpRequest();
                    timeRequest.open('GET', epUrl);
                    timeRequest.setRequestHeader('Content-Type', 'application/json');
                    timeRequest.setRequestHeader('trakt-api-version', '2');
                    timeRequest.setRequestHeader('trakt-api-key', 'ac4d93cb1d8c7ae909503c684cc2ab9ad7c666ce48fbdd9df3ac7cef48f7d841');

                    timeRequest.onload = function () {
                        var timeJson = JSON.parse(this.response);
                        console.log(timeJson);
                        finalTime += Number(timeJson.runtime);
                        console.log(finalTime);
                        document.getElementById('timeMessage').innerHTML = "You will waste " + finalTime + " minutes";
                        return finalTime;
                    }
                    timeRequest.send();
                }
            }

        }
    }
    seasonRequest.send();
}