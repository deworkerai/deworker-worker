# How to register a worker

When you have built and tested your worker, you can register it to the Deworker Protocol. Registering a worker allows you to advertise your worker to the network and receive work requests from clients.

Before you register your worker, you need to send email to contact@deworker.ai for the registration process. When the registration process is complete, you will receive a worker ID.

## Let's get started

Let me assume that you have received the worker ID. Now, let's register the worker.

First, you need change your worker id to the value you have received. Please open the `deworker.yaml` file and change the `schema.id` value to the worker ID you have received.

Then, run

```bash
deworker worker register
```

If the registration is successful, you will see the following output:

```bash
the worker has been successfuly registered!
```

Congratulations! You have successfully registered your worker to the Deworker Protocol. Now, you can start your worker. Read more info here: [Start a worker ](https://github.com/deworkerai/deworker-cli?tab=readme-ov-file#start-a-worker)
