# Tips

Here are some common tips to make your code faster and more efficient!

## C/C++ Tips

### Syncing `cin` and `cout`

If you use `cin` and `cout` in your code, you should add a line at the top of your code to make it faster:

```cpp
cin.tie(0)->sync_with_stdio(0);
```

This will make it such that `cin` and `cout` are not synchronized with `stdio` (which is what `scanf` and `printf` use). This will make your code faster. However, if you use `printf` or `scanf` in your code, you should not use this line as it will mess up the order of input and output. Another side effect is that output will not be done in real time, so you will see chunked output instead of real time output. This is not a problem for most problems, but it is something to keep in mind.

However, it is much better to use `scanf` and `printf` instead of `cin` and `cout` because they are much faster. You can read more about it [here](https://codeforces.com/blog/entry/16457).

### Using `'\n'` instead of `endl`

When you print a newline character, you should use `'\n'` instead of `endl`. `endl` is slower because it flushes the output buffer, which is not necessary in most cases. Remember - our judge considers the final output of your program, so even if you print everything out at the end of program execution, it will still be considered correct.

### Large arrays

When you have potentially large variables such as arrays, you should declare them globally instead of locally. This is because local variables are allocated on the stack, which is limited in size. Global variables are allocated on the heap, which is much larger. This will prevent Runtime Errors due to stack overflow.

For example, 

```cpp
int main() {
	cin >> n;
	int a[n];
}
```

will cause a Runtime Error if `n` is too large. However, 

```cpp
int a[1000000];
int main() {
	cin >> n;
}
```

will not cause a Runtime Error. Remember to change the size of the array to the maximum value of `n` for the problem.

### Large Integers

On this judge, `int` is guaranteed to be at least 32 bits, and `long long` is guaranteed to be at least 64 bits. The value of `long` however is not guaranteed, so you should not use it.

Generally, if the problem requires you to work with numbers above $10^9$, you should use `long long` instead of `int`. If the problem requires you to work with numbers above $10^{18}$, you are probably doing something wrong.

## Python Tips

### Using `sys.stdin` and `sys.stdout`

If you use `input()` and `print()` in your code, you should add a line at the top of your code to make it faster:

```python
import sys
input = sys.stdin.readline
print = sys.stdout.write
```

This is about 3x faster than using `input()` and `print()`.

### Not using Python

Python is a very slow language, and is not recommended for competitive programming. If you are using Python, you should try to use it as little as possible. For example, you can use Python to solve trivial problems ($\le 5$ stars), but use C++ for harder problems.