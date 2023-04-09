# Segment Trees

## Overview

A segment tree is a data structure that allows answering range queries over an array effectively, while still being flexible enough to allow modifying the array. This includes finding the sum of a range of array elements, finding the minimum, maximum, or GCD of a range of array elements, and many more.

In fact, segment trees support any operation that can be performed on a single element of the array, as long as it is associative. Associative means that the order in which the operation is performed does not matter, and results from smaller subproblems can be combined to get the result for the larger problem. 

## How does it work?

A segment tree is a binary tree that is used to store information about intervals or segments. Each node of the segment tree represents an interval. The leaf nodes of the segment tree represent the input array elements. The internal nodes of the segment tree represent the union of the intervals of the leaf nodes under it. The root of the segment tree represents the entire input array.

## Implementation

```cpp
struct SegTree {
	vector<int> st;
	int size=1;

	void init(int n) {
		while (size < n) size *= 2;
		st.resize(2 * size);
	}

	void update(int i, int v) {
		i += size;
		st[i] = v;
		while (i > 1) {
			i /= 2;
			st[i] = st[2 * i] + st[2 * i + 1];
		}
	}

	int query(int l, int r) {
		l += size;
		r += size;
		int res = 0;
		while (l <= r) {
			if (l % 2 == 1) res += st[l++];
			if (r % 2 == 0) res += st[r--];
			l /= 2;
			r /= 2;
		}
		return res;
	}
}
```

This implementation gets the sum of a range of array elements. To get the minimum, maximum, or GCD, change the `+` to `min`, `max`, or `gcd`, respectively.