const fetch = require('node-fetch');

exports.getFriends = async function request(screenname) {
	const url = process.env.th_twitter_api_url+screenname;
  
  const options = {
    method: 'GET',
    headers: {
      'api_key': process.env.th_twitter_api_key,
    }
  };
  try {
    const response = await fetch(url, options);
    const output = await response.json();
    if (response.status !== 200) {
      if (output.errors[0].message) throw new Error(`Unexpected response code ${response.status}: ${output.errors[0].message}`);
      throw new Error(`Unexpected response code ${response.status}`);
    }
    if (typeof output.friendlist !== 'object' || typeof output.friendlist.users !== 'object') throw new Error('Unexpected structure of graphQL response');
    //return output.friendlist.users.map((userEntry) => {return {userEntry.screen_name}});
    return output.friendlist.users.map(userEntry => userEntry['screen_name']);
  } catch (error) {
    logger.error({ event: 'UNABLE_TO_RETRIEVE_FROM_API', error: error.message });
    throw error;
  }
}