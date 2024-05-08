# How to build a worker

First, you need to create a new worker project:


## Prerequisites

- git
- nodejs >= 19.x
- pnpm
- [deworker-cli](https://www.npmjs.com/package/@deworker/deworker-cli)

```bash
git clone git@github.com:deworkerai/deworker-worker.git my_first_worker
cd my_first_worker
```

Then, you need to install the dependencies:

```bash
pnpm install
```

Now, you can start to build your worker. You can find the worker code in `src/index.ts`.

Before you start to build your worker, you need to know the following concepts:

- What is `deworker.yaml`
- What is `peerKey.json`

## What is `deworker.yaml`

`deworker.yaml` is the configuration file of your worker. You can define the following fields in `deworker.yaml`:

- `type`: The type of your worker. It ONLY can be `worker` now.
- `version`: The version of your worker. The current version is `1.0.0`.
- `schema.id`: The id of your worker. Before you register your worker, you need to contact the Deworker team to get an id. You can send email to contact@deworker.ai.
- `schema.name.human`: The human readable name of your worker.
- `schema.name.model`: The model readable name of your worker. Deworker protocol will use this name to find the best worker for the task.
- `schema.description.human`: The human readable description of your worker.
- `schema.description.model`: The model readable description of your worker. Deworker protocol will use this description to find the best worker for the task.
- `schema.avatar`: The avatar of your worker.
- `schema.skills`: The skills of your worker. Deworker protocol will match the skills of your worker to find the best worker for the task. Skill is the minimum unit of the worker's ability. For example, if your worker is a hello worker, maybe it has a skill named `say_hello`.
- `schema.skills.name.human`: The human readable name of the skill.
- `schema.skills.name.model`: The model readable name of the skill.
- `schema.skills.description.human`: The human readable description of the skill.
- `schema.skills.description.model`: The model readable description of the skill.
- `schema.skills.handler`: The handler of the skill. The handler is the function that will be called when the worker receives a task.
- `schema.skills.requestSchema`: The handler request parameters schema. The schema is JSON schema format.
- `schema.skills.responseSchema`: The handler response schema. The schema is JSON schema format. Caller will get the data that matches the schema.
- `schema.entry`: The entry file of your worker. The entry file is the file that will be executed when the worker starts.

## What is `peerKey.json`

`peerKey.json` is the key file of your worker. You can find the following fields in `peerKey.json`:

- `id`: The id(peer key) of your peer.
- `privKey`: The private key of your peer.
- `pubKey`: The public key of your peer.

If you don't have a key file, you can generate a new key file by running the following command:

```bash
deworker peer generate --file
```

After you generate the key file, you need to register your peer key to worker. You can run the following command:

```bash
deworker peer register --key=your_peer_id --workerId=your_worker_id
```

## Let's build your first worker

Now, you can start to build your worker. You can find the worker code in `src/index.ts`.

As you can see, the worker code is very simple. It only has one skill named `say_hello`. The `say_hello` skill have a handler `sayHello` that will return `hello world, ${name}!`.

You can add a new skill by adding a new object to the `skills` array in `deworker.yaml`. You can add a new handler to the worker by adding a new function to the `handlers` object in `src/index.ts`.

The handler will receive the request parameters and return the response data. The request parameters and response data should match the schema that you defined in `deworker.yaml`.

The interface of request parameters is:

```typescript
{
  skill: string; // skill model name.
  workerName: string; // worker name.
  workerId?: string; // worker id.
  params: Record<string, any>; // request parameters, it should match the request schema.
  stream?: boolean; // whether the response is a stream, if it is true, the handler should return a stream, otherwise, the handler should return a json data.
}
```

Let's look at the `sayHello` handler:

```typescript
async function sayHello(params: { name: string }): Promise<string> {
  return { result: `hello world, ${params.name}!` };
}
```

You can see that the `sayHello` handler receives a `name` parameter and returns a string. The `name` parameter should match the request schema that you defined in `deworker.yaml`. The return value should match the response schema that you defined in `deworker.yaml`.

If you want to return a stream, you can set the `stream` field to `true` in the request parameters. The handler should handle and return a stream.

So, you need change your code:

```typescript
async function sayHello(args: {
  params: { name: string };
  stream?: boolean;
}): Promise<string | Readable> {
  if (args.stream) {
    return fs.createReadStream('hello.txt');
  } else {
    return { result: `hello world, ${args.params.name}!` };
  }
}
```

Now, you can change the code you want and build your worker. After you build your worker, you can learn [how to test your worker](./how-to-test.md).
