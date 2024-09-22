# Ditching async in Rust: When to stick with threads and channels

First, it's important to note that you're correct - for many cases, using the standard library's threads, channels, and mutexes can be sufficient for concurrent programming in Rust without sacrificing performance or usability. The async ecosystem in Rust does introduce some complexity, especially when mixing async and synchronous code.

Let's explore this with some examples:

1. Using std::thread for basic concurrency:

```rust
use std::thread;
use std::time::Duration;

fn main() {
    let handle = thread::spawn(|| {
        for i in 1..5 {
            println!("Thread: number {}", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("Main: number {}", i);
        thread::sleep(Duration::from_millis(1));
    }

    handle.join().unwrap();
}

```

This example demonstrates simple concurrency using `std::thread`. It's straightforward and doesn't require any additional runtime or async complexity.

2. Using channels for communication between threads:

```rust
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hello from thread");
        tx.send(val).unwrap();
    });

    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}

```

This example shows how to use channels to communicate between threads, which is a powerful way to handle concurrent operations without async/await syntax.

3. Mutex for shared state:

```rust
use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();
            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

This example shows how to use a Mutex to safely share and modify state across multiple threads.

Now, let's consider when async Rust might be beneficial:

1. I/O-bound operations: If your program is primarily waiting on I/O operations (like network requests or file operations), async can be more efficient than spawning a thread for each operation.

2. Large number of concurrent tasks: If you need to handle thousands or millions of concurrent operations, async can be more memory-efficient than creating an equivalent number of OS threads.

3. Fine-grained control over task scheduling: Async runtimes like tokio provide more control over how tasks are scheduled and executed.

However, for CPU-bound tasks or when you have a manageable number of concurrent operations, threads can be simpler and equally performant.
Here's a simple example of how you might implement a basic "runtime" using threads and channels:

```rust
use std::sync::mpsc::{channel, Sender, Receiver};
use std::thread;

type Task = Box<dyn FnOnce() + Send + 'static>;

struct Scheduler {
    sender: Sender<Task>,
}

impl Scheduler {
    fn new(num_threads: usize) -> Self {
        let (sender, receiver) = channel::<Task>();
        let receiver = std::sync::Arc::new(std::sync::Mutex::new(receiver));

        for _ in 0..num_threads {
            let receiver = receiver.clone();
            thread::spawn(move || loop {
                let task = receiver.lock().unwrap().recv().unwrap();
                task();
            });
        }

        Scheduler { sender }
    }

    fn spawn<F>(&self, f: F)
    where
        F: FnOnce() + Send + 'static,
    {
        self.sender.send(Box::new(f)).unwrap();
    }
}

fn main() {
    let scheduler = Scheduler::new(4);

    for i in 0..10 {
        scheduler.spawn(move || {
            println!("Task {} executed", i);
        });
    }

    // Keep the main thread alive
    thread::sleep(std::time::Duration::from_secs(1));
}

```

This example creates a simple task scheduler using threads and channels. It doesn't have all the features of a full async runtime, but it demonstrates how you can achieve concurrent execution without async/await syntax.

In conclusion, while async Rust is powerful and necessary for certain use cases, you're correct that for many scenarios, especially those not involving a large number of I/O-bound operations, using std lib with channels, threads, and mutexes can be simpler and equally effective. The choice between async and thread-based concurrency often depends on the specific requirements of your application, including the nature of the tasks (I/O-bound vs CPU-bound), the number of concurrent operations, and the level of control you need over task scheduling.

Would you like me to elaborate on any specific aspect of this comparison or provide more examples?
