const BASE_URL = 'https://app.fakejson.com';


export const getNewsFeed = () => {
    return fetch(
        `${BASE_URL}/q/HHM1TDrX?token=60V8ZZkjFHXXwfUP1EvGTA`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ).then(res => res.json());

}