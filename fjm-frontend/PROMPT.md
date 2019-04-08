# Interview Task

As part of the effort to make our supercomputer more user friendly for everyone, we have been tasked to create a simple
monitoring of jobs submitted to it. Normally this information is available via a command line interface, but a
read-only, RESTful backend service has been created so that nicer user interfaces can be made.

Your task, as a frontend developer, is to develop a prototype interface using the endpoints outlined by the specs.

The specs of this backend service, called FJM (Fancy Job Monitoring), is detailed in the `specs.yaml`. There is also a
mock backend service you can use to aid your development in the `api` directory, complete with the set up instructions
in `api/README.md`.

The interface you develop must:
- Display a general information about the FJM API
- Allow users to list the jobs that has been submitted, with some date filtering.
- Display a more detailed information of a single job.

You may:
- Use a frontend web development framework of your choosing. Angular is strongly preferred, but not strictly required.
- Add tests for the components you have created. This is highly encouraged.
- Update the API with new endpoints or parameters, if you feel the need. You have to make sure that the specs stays
  within the OpenAPI 3.0 specifications, however.

And finally, you must use a VCS (preferrably git).

Start your development by creating an empty git repository and committing the attached specs plus a README. Commit your
changes along the way as you would normally do. When you feel it is ready for us to review, create a tar or zip archive
of your entire directory (including the .git directory). and send it to us.

Good luck!
