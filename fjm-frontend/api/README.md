# fjm-api

FJM public HTTP API.


## Set up

1. Install the following dependencies, if you do not have them already:
  * Docker >= 17.10
  * docker-compose >= 1.16.1

2. Build the backend container and run it as a background process from this directory:

    `$ docker-compose up -d --build`

3. The backend should be accessible via `http://localhost:5000/about`

4. To stop the process, run the following command:

    `$ docker-compose down`
