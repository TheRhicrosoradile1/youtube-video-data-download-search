const http = require('http');

const poll =(time=10)=> {

        http.get('https://youtube.googleapis.com/youtube/v3/search?part=snippet&order=date&publishedAfter=2017-01-15T01%3A30%3A15.01Z&q=cricket&type=video&key='+, (res) => {
            const { statusCode } = res;

            let error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\n` +
                    `Status Code: ${statusCode}`);
            }

            if (error) {
                console.error(error.message);
                res.resume();
            } else {
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    try {
                        const parsedData = JSON.parse(rawData);

                        // The important logic comes here
                        if (parsedData.status === 'BUSY') {
                            setTimeout(poll.pollB, 10000); // request again in 10 secs
                        } else {
                            // Call the background process you need to
                        }
                    } catch (e) {
                        console.error(e.message);
                    }
                });
            }
        }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });
    }


poll.pollB();
