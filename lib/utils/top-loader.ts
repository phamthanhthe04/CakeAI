type LoadingListener = (pendingCount: number) => void;

let pendingCount = 0;
const listeners = new Set<LoadingListener>();

function notifyListeners() {
  for (const listener of listeners) {
    listener(pendingCount);
  }
}

export function startGlobalLoading() {
  pendingCount += 1;
  notifyListeners();
}

export function stopGlobalLoading() {
  pendingCount = Math.max(0, pendingCount - 1);
  notifyListeners();
}

export function subscribeGlobalLoading(listener: LoadingListener) {
  listeners.add(listener);
  listener(pendingCount);

  return () => {
    listeners.delete(listener);
  };
}
