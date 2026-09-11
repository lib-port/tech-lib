# *Introduction to Containers w/ Docker, Kubernetes & OpenShift* Final Project

A Go + HTML/CSS/JavaScript project adapted from the IBM guestbook project. You can add messages, see them from any app replica, build a v2 image, roll back, and watch Kubernetes add or remove app pods.

The app uses one shared Redis instance, plain browser JavaScript, and ordinary Kubernetes YAML files. The Go server has two source files. Everything runs locally.

## What you need

- Podman 5 or newer, already working (`podman info`).
- kind **0.33.0**, which runs a Kubernetes node in a Podman container.
- kubectl **1.35.x**, matching the included Kubernetes 1.35.8 node image.
- Internet access for the initial images and Go packages.

Install using the official [Podman instructions](https://podman.io/docs/installation), [kind instructions](https://kind.sigs.k8s.io/docs/user/quick-start/), and [kubectl instructions](https://kubernetes.io/docs/tasks/tools/). The included kind configuration pins the node image published for kind 0.33.0. Go is installed inside the build image; it is optional on your computer.

On macOS or Windows, Podman needs a Linux VM. If one is not already configured:

```sh
podman machine init --cpus 4 --memory 6144
podman machine start
```

If you already have a VM, start that one instead of initializing another. Four CPUs and 6 GB of VM memory give the cluster and image build room to run. On Linux, Podman can run directly without a VM. Rootless kind needs **cgroup v2 and CPU controller delegation**; see the [kind rootless guide](https://kind.sigs.k8s.io/docs/user/rootless/). Host configuration differs across operating systems. No project script changes it automatically.

## 1. Create the local cluster

Open a terminal in this project directory. Select Podman as kind's provider.

**Linux/macOS shell:**

```sh
export KIND_EXPERIMENTAL_PROVIDER=podman
```

**Windows PowerShell:**

```powershell
$env:KIND_EXPERIMENTAL_PROVIDER = "podman"
```

Set this variable again in any new terminal where you use `kind`. Then:

```sh
kind create cluster --name lib-port --config k8s/kind.yaml --wait 180s
kubectl --context kind-lib-port get nodes
```

The node should become `Ready`. Every kubectl command below names `kind-lib-port` explicitly so it operates on this local cluster.

## 2. Build and load the app image

```sh
podman build -f Containerfile --build-arg APP_VERSION=v1 -t localhost/lib-port/guestbook:v1 .
podman save --format docker-archive -o guestbook-v1.tar localhost/lib-port/guestbook:v1
kind load image-archive guestbook-v1.tar --name lib-port
```

The build packages the Go server and browser assets into one image. `podman save` plus `kind load` copies the image into Kubernetes; it does not push to IBM or any other registry. Keep the `v1` image for the rollback exercise.

## 3. Install CPU metrics and deploy the app

The included Metrics Server manifest is upstream **v0.9.0**, with one local-kind change: `--kubelet-insecure-tls`. It accepts kind's local kubelet certificates. This setting is only for this development cluster, not a production deployment.

```sh
kubectl --context kind-lib-port apply -f k8s/metrics-server.yaml
kubectl --context kind-lib-port -n kube-system rollout status deployment/metrics-server --timeout=180s
kubectl --context kind-lib-port apply -f k8s/namespace.yaml
kubectl --context kind-lib-port apply -f k8s/redis.yaml
kubectl --context kind-lib-port -n lib-port rollout status deployment/redis --timeout=180s
kubectl --context kind-lib-port apply -f k8s/guestbook.yaml
kubectl --context kind-lib-port apply -f k8s/hpa.yaml
kubectl --context kind-lib-port -n lib-port rollout status deployment/guestbook --timeout=180s
```

Apply the files individually as shown. Do not apply the whole `k8s` directory: it also contains kind configuration and the optional load generator.

Check the cluster:

```sh
kubectl --context kind-lib-port top nodes
kubectl --context kind-lib-port -n lib-port get pods,svc,hpa,pvc
```

Redis uses a 1 GiB PersistentVolumeClaim and append-only persistence. Its data survives app restarts, app scaling, and Redis pod replacement. The volume lives inside the kind node; deleting the cluster or its namespace deletes this lab's stored messages. Redis has no published host port and is intended only for this local lab.

## 4. Open the Guestbook

Keep this command running:

```sh
kubectl --context kind-lib-port -n lib-port port-forward service/guestbook 3000:3000
```

Open [http://localhost:3000](http://localhost:3000). Add a message and refresh. The page title and heading both say **Guestbook - v1**.

Port forwarding attaches to one pod. If that pod is replaced during an update or scaling down, rerun the port-forward command. The load generator below talks directly to the Kubernetes Service and does not depend on port forwarding.

## 5. Watch real Kubernetes autoscaling

In a second terminal:

```sh
kubectl --context kind-lib-port apply -f k8s/load-generator.yaml
kubectl --context kind-lib-port -n lib-port get hpa guestbook --watch
```

Wait a few minutes for CPU samples and new pods. The HPA allows **1 to 4 app replicas**. Each app requests `100m` CPU (one tenth of a CPU core); the target is **50% of that request**, or `50m` per replica. Above this average CPU target, Kubernetes asks for more replicas, up to four. The `500m` CPU limit is a separate ceiling, not the percentage denominator.

The load generator makes four concurrent requests to `/work`. This endpoint performs a fixed amount of CPU work so a tiny guestbook can demonstrate scaling reliably. It is separate from saving messages and is enabled by the local Kubernetes manifest. Exact CPU readings, ages, and replica timing depend on your computer.

In another terminal you can inspect:

```sh
kubectl --context kind-lib-port -n lib-port top pods
kubectl --context kind-lib-port -n lib-port get pods -l app=guestbook
```

Pressing Ctrl+C ends the watch, **not the load generator**. Stop load explicitly:

```sh
kubectl --context kind-lib-port delete -f k8s/load-generator.yaml
kubectl --context kind-lib-port -n lib-port get hpa guestbook --watch
```

The HPA uses a 60-second downscale stabilization window. Allow a few more minutes for it to settle back to one pod. Redis itself is kept at one replica and is not managed by this HPA.

## 6. Build v2, update, and roll back

This exercise changes the title and heading through a build argument. You can also edit the HTML, CSS, or Go code before building. Both image versions use the same Redis data format.

```sh
podman build -f Containerfile --build-arg APP_VERSION=v2 -t localhost/lib-port/guestbook:v2 .
podman save --format docker-archive -o guestbook-v2.tar localhost/lib-port/guestbook:v2
kind load image-archive guestbook-v2.tar --name lib-port
kubectl --context kind-lib-port -n lib-port set image deployment/guestbook guestbook=localhost/lib-port/guestbook:v2
kubectl --context kind-lib-port -n lib-port rollout status deployment/guestbook --timeout=180s
kubectl --context kind-lib-port -n lib-port rollout history deployment/guestbook
```

Restart port forwarding if needed, then refresh to see **Guestbook - v2**. Your messages should still be present. To return to the previous deployment revision:

```sh
kubectl --context kind-lib-port -n lib-port rollout undo deployment/guestbook
kubectl --context kind-lib-port -n lib-port rollout status deployment/guestbook --timeout=180s
kubectl --context kind-lib-port -n lib-port get rs -l app=guestbook
```

After the first v1 -> v2 -> rollback cycle, you should see two Guestbook ReplicaSets: one active and one at zero. More edits can leave more historical ReplicaSets. `rollout undo` returns to the previous revision; consult the history and add `--to-revision=N` if you have made several updates. Keep the old image loaded.

## Optional: run with Podman only

This starts the same app and Redis without Kubernetes. It does **not** run an HPA. Stop the Kubernetes port-forward first, or use a different host port.

```sh
podman network create lib-port-net
podman volume create lib-port-redis-data
podman run -d --name lib-port-redis --network lib-port-net --network-alias redis -v lib-port-redis-data:/data docker.io/library/redis:7.4-alpine redis-server --appendonly yes
podman exec lib-port-redis redis-cli ping
podman run -d --name lib-port-guestbook --network lib-port-net -p 127.0.0.1:3000:3000 -e REDIS_ADDR=redis:6379 localhost/lib-port/guestbook:v1
```

Wait for `PONG` before starting the app. Then open [http://localhost:3000](http://localhost:3000). This setup has its own Redis data, separate from the Kubernetes cluster. Stop/remove these containers while retaining the named volume:

```sh
podman stop lib-port-guestbook lib-port-redis
podman rm lib-port-guestbook lib-port-redis
```

To start fresh containers later, repeat the two `podman run` commands. Reuse the existing network and volume. Both run modes use shared Redis so application copies see the same messages.

## Understand the code

| File | Responsibility |
| --- | --- |
| `main.go` | HTTP routes, validation, templates, health checks, optional CPU task |
| `store.go` | Read and append entries in a shared Redis list |
| `public/index.html` | Page structure and version heading |
| `public/script.js` | Load messages and submit JSON using `fetch` |
| `public/style.css` | Basic responsive styling |
| `Containerfile` | Build Go and package one small non-root app image |
| `k8s/*.yaml` | Cluster, app, Redis, metrics, HPA, and load generator |

The API is `GET /api/entries` and `POST /api/entries` with `{"message":"Hello"}`. Messages are trimmed and limited to 280 Unicode characters. JavaScript uses `textContent` to render them as text. `/healthz` checks the app process; `/readyz` also checks Redis, so pods with no usable store are removed from Service traffic.

Redis commands are not automatically retried, because repeating an append after a lost reply could save the same message twice. If a save cannot be confirmed, refresh the list before submitting again.

The app uses `go-redis`; direct and indirect package versions are locked in `go.mod` and `go.sum`.

## Optional: run the regression tests

With Go and Node.js installed, run these commands from this directory:

```sh
go test ./...
go vet ./...
node --test tests/script.test.cjs
```

The tests cover JSON Content-Type handling, uncertain save responses, and overlapping save/refresh requests. They do not need Redis or Kubernetes; the browser-script tests use Node's built-in test runner with simulated network responses.

## Troubleshooting

- **kind fails with `Delegate=yes` or cgroup errors:** follow the [rootless host requirements](https://kind.sigs.k8s.io/docs/user/rootless/). On applicable Linux systems, the documented retry is `systemd-run --scope --user -p Delegate=yes kind create cluster --name lib-port --config k8s/kind.yaml --wait 180s`, with `KIND_EXPERIMENTAL_PROVIDER=podman` set. Do not mix rootful and rootless Podman commands for the same cluster.
- **HPA shows `<unknown>`:** wait for metrics, run `kubectl --context kind-lib-port top nodes`, and inspect `kubectl --context kind-lib-port -n kube-system logs deployment/metrics-server`. `kubectl --context kind-lib-port -n lib-port describe hpa guestbook` explains HPA errors.
- **`ImagePullBackOff`:** reload the app image archive and check that its tag matches `guestbook.yaml`. Do not change the app image to `latest`.
- **Redis/PVC pending:** run `kubectl --context kind-lib-port get storageclass` and `kubectl --context kind-lib-port -n lib-port describe pod -l app=redis`. This package expects kind's `standard` local-path storage class.
- **Port 3000 busy:** use `port-forward service/guestbook 3001:3000` with the same context and namespace, and open localhost:3001.
- **Container name already exists:** inspect `podman ps -a`; restart the existing container or stop/remove that specific lab container before creating another.

## Cleanup and sources

To remove this Kubernetes lab and its data: `kind delete cluster --name lib-port` (with the Podman provider variable set). For Podman-only data, remove `lib-port-redis-data` with `podman volume rm` only when you want to erase the messages and its container has been removed. No cleanup command uses a global prune.

## Partial clone

To clone only this folder and not the rest of the repository:

```bash
git clone --depth=1 --filter=blob:none --sparse https://github.com/lib-port/tech-lib.git &&
cd tech-lib &&
git sparse-checkout set projects/IBM/DSE/guestbook &&
mkdir -p ../guestbook &&
rsync -a projects/IBM/DSE/guestbook/ ../guestbook/ &&
cd .. &&
rm -rf tech-lib &&
cd guestbook
```
