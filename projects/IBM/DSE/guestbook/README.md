# Guestbook: Containers Final Project

A local Go and JavaScript guestbook adapted from IBM’s containers project. Messages live in shared Redis storage, so every app replica sees the same entries. Use this lab to build images, deploy Kubernetes workloads, observe autoscaling, and practice updates and rollbacks.

## Requirements

Install working [Podman 5+](https://podman.io/docs/installation), [kind 0.33.0](https://kind.sigs.k8s.io/docs/user/quick-start/), and [kubectl 1.35.x](https://kubernetes.io/docs/tasks/tools/). Initial builds need internet access; Go runs inside the build image.

On macOS or Windows, start your Podman VM. If none exists, create one first:

```sh
podman machine init --cpus 4 --memory 6144
podman machine start
```

Linux can run Podman directly. Rootless kind requires cgroup v2 and CPU controller delegation; follow the [rootless guide](https://kind.sigs.k8s.io/docs/user/rootless/) if cluster creation fails.

## Create and deploy

Run commands from this directory. Select Podman in each terminal that uses kind:

```sh
export KIND_EXPERIMENTAL_PROVIDER=podman
```

In PowerShell, use `$env:KIND_EXPERIMENTAL_PROVIDER = "podman"` instead.

```sh
kind create cluster --name lib-port --config k8s/kind.yaml --wait 180s
podman build -f Containerfile --build-arg APP_VERSION=v1 -t localhost/lib-port/guestbook:v1 .
podman save --format docker-archive -o guestbook-v1.tar localhost/lib-port/guestbook:v1
kind load image-archive guestbook-v1.tar --name lib-port
kubectl --context kind-lib-port apply -f k8s/metrics-server.yaml
kubectl --context kind-lib-port -n kube-system rollout status deployment/metrics-server --timeout=180s
kubectl --context kind-lib-port apply -f k8s/namespace.yaml
kubectl --context kind-lib-port apply -f k8s/redis.yaml -f k8s/guestbook.yaml -f k8s/hpa.yaml
kubectl --context kind-lib-port -n lib-port rollout status deployment/guestbook --timeout=180s
```

Images load locally without a registry. Keep v1 available for rollback. Apply only the listed manifests: the directory also contains cluster configuration and an optional load generator. Metrics Server’s `--kubelet-insecure-tls` flag is for this local development cluster only.

## Open and scale

Keep this running, then visit [localhost:3000](http://localhost:3000) and add a message:

```sh
kubectl --context kind-lib-port -n lib-port port-forward service/guestbook 3000:3000
```

Restart forwarding if its pod is replaced. In another terminal, start CPU load and watch the Horizontal Pod Autoscaler (HPA):

```sh
kubectl --context kind-lib-port apply -f k8s/load-generator.yaml
kubectl --context kind-lib-port -n lib-port get hpa guestbook --watch
```

The HPA scales between one and four app replicas, targeting 50% of each replica’s `100m` CPU request. The generator calls `/work`, a separate CPU exercise. Allow several minutes for scaling. If metrics show `<unknown>`, check `kubectl --context kind-lib-port top nodes` and Metrics Server logs.

Ctrl+C stops the watch. Stop the load explicitly:

```sh
kubectl --context kind-lib-port delete -f k8s/load-generator.yaml
```

Allow several minutes to return to one replica.

## Update and roll back

Build and load v2, then update the deployment:

```sh
podman build -f Containerfile --build-arg APP_VERSION=v2 -t localhost/lib-port/guestbook:v2 .
podman save --format docker-archive -o guestbook-v2.tar localhost/lib-port/guestbook:v2
kind load image-archive guestbook-v2.tar --name lib-port
kubectl --context kind-lib-port -n lib-port set image deployment/guestbook guestbook=localhost/lib-port/guestbook:v2
kubectl --context kind-lib-port -n lib-port rollout status deployment/guestbook --timeout=180s
```

Refresh to see **Guestbook - v2** with existing messages. Return to the previous revision:

```sh
kubectl --context kind-lib-port -n lib-port rollout undo deployment/guestbook
kubectl --context kind-lib-port -n lib-port rollout status deployment/guestbook --timeout=180s
```

## Code, tests, and cleanup

`main.go` handles HTTP requests; `store.go` accesses Redis; `public/` contains browser assets. Messages are limited to 280 Unicode characters.

With Go and Node.js installed, run:

```sh
go test ./...
go vet ./...
node --test tests/script.test.cjs
```

Redis storage survives pod replacement. Deleting the namespace or cluster erases stored messages. Remove the lab with `kind delete cluster --name lib-port`.
