import http from 'k6/http';
import { check, sleep } from 'k6';
const apiUrl = 'https://raffle-bot.turgutmemis.com/api/raffles';

export const options = {
	insecureSkipTLSVerify: true,
	noConnectionReuse: false,
	stages: [
	  { duration: '10s', target: 500 },
	  { duration: '5m', target: 500 },
	],
  };
  const params = {
    headers: {
      'Content-Type': 'application/json',
	  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQzNjUyY2IyNmNmYjAwNmM1Y2U3MDgiLCJlbWFpbCI6ImluZm9AdHVyZ3V0bWVtaXMuY29tIiwiY3JlYXRlZEF0IjoiMjAyMy0wOC0wOVQxMDowNjozNi4xNzNaIiwidXBkYXRlZEF0IjoiMjAyMy0wOC0wOVQxMDowNjozNi4xNzNaIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjkxNTc3NTY4fQ.-pQCXER3Akqp8Eb_ew5HZpF6rmXE0OaErKf8lqeyCns",
    },
  };
  
  export default function () {
	const res = http.get(apiUrl, params);
	check(res, { 'status was 200': (r) => r.status == 200 });
	sleep(1);
  }